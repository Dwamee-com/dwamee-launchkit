import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProjectContext } from "@/contexts/ProjectContext";
import { Task, TaskStatus } from "@/types/project";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Plus, Edit2, Trash2, Clock, Star, MessageSquare, Play, Eye, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const statusConfig: Record<TaskStatus, { label: string; color: string }> = {
  pending: { label: "Pending", color: "bg-muted text-muted-foreground" },
  planning: { label: "Planning", color: "bg-secondary text-secondary-foreground" },
  in_progress: { label: "In Progress", color: "bg-primary/15 text-primary" },
  review: { label: "Review", color: "bg-accent/15 text-accent" },
  finished: { label: "Finished", color: "bg-accent text-accent-foreground" },
};

export default function ModuleDetails() {
  const { projectId, moduleId } = useParams<{ projectId: string; moduleId: string }>();
  const navigate = useNavigate();
  const { projects, modules, getTasksForModule, addTask, updateTask, deleteTask, updateTaskStatus, addComment, getUserById } = useProjectContext();

  const project = projects.find(p => p.id === projectId);
  const mod = modules.find(m => m.id === moduleId);
  const tasks = moduleId ? getTasksForModule(moduleId) : [];

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [detailTask, setDetailTask] = useState<Task | null>(null);
  const [comment, setComment] = useState("");
  const [ratingVal, setRatingVal] = useState(0);
  const [ratingFeedback, setRatingFeedback] = useState("");
  const [form, setForm] = useState({ name: "", info: "", start_date: "", finish_date: "", estimated_hours: 0 });

  if (!project || !mod) return <div className="text-center py-20 text-muted-foreground">Not found</div>;

  const openCreate = () => {
    setEditTaskId(null);
    setForm({ name: "", info: "", start_date: "", finish_date: "", estimated_hours: 0 });
    setDialogOpen(true);
  };

  const openEdit = (t: Task) => {
    setEditTaskId(t.id);
    setForm({ name: t.name, info: t.info, start_date: t.start_date, finish_date: t.finish_date, estimated_hours: t.estimated_hours });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (editTaskId) {
      const t = tasks.find(x => x.id === editTaskId)!;
      updateTask({ ...t, ...form });
    } else {
      addTask({
        module_id: mod.id, user_id: "u1", name: form.name, info: form.info,
        files: [], assigned_users: ["u1"], status: "pending", comments: [],
        start_date: form.start_date, finish_date: form.finish_date,
        estimated_hours: form.estimated_hours, actual_hours: 0,
      });
    }
    setDialogOpen(false);
  };

  const handleAddComment = (taskId: string) => {
    if (!comment.trim()) return;
    addComment(taskId, { task_id: taskId, user_id: "u1", message: comment, attachments: [] });
    setComment("");
    // refresh detail view
    const updated = tasks.find(t => t.id === taskId);
    if (updated) setDetailTask({ ...updated });
  };

  const handleRate = (t: Task) => {
    if (ratingVal < 1) return;
    updateTask({ ...t, rating: { rating: ratingVal, feedback: ratingFeedback, reviewer_id: "u1" } });
    setRatingVal(0);
    setRatingFeedback("");
    setDetailTask(null);
  };

  const handleTrackerAction = (t: Task, action: "start" | "review" | "finish") => {
    const now = new Date().toISOString();
    const tracker = t.tracker || { task_id: t.id, user_id: "u1" };
    if (action === "start") {
      updateTask({ ...t, status: "in_progress", tracker: { ...tracker, start_time: now }, actual_hours: t.actual_hours });
      updateTaskStatus(t.id, "in_progress");
    } else if (action === "review") {
      updateTask({ ...t, status: "review", tracker: { ...tracker, review_request_time: now } });
      updateTaskStatus(t.id, "review");
    } else {
      const startMs = tracker.start_time ? new Date(tracker.start_time).getTime() : Date.now();
      const hours = Math.round((Date.now() - startMs) / 3600000 * 10) / 10;
      updateTask({ ...t, status: "finished", tracker: { ...tracker, finish_time: now }, actual_hours: hours });
      updateTaskStatus(t.id, "finished");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate(`/dashboard/projects/${projectId}`)}><ArrowLeft className="w-4 h-4" /></Button>
        <div className="flex-1">
          <p className="text-xs text-muted-foreground">{project.name}</p>
          <h1 className="text-2xl font-bold text-foreground">{mod.name}</h1>
          <p className="text-muted-foreground text-sm">{mod.info}</p>
        </div>
        <Button onClick={openCreate} className="gap-2"><Plus className="w-4 h-4" /> New Task</Button>
      </div>

      <div className="space-y-3">
        {tasks.map((task, i) => {
          const sc = statusConfig[task.status];
          const progress = task.estimated_hours > 0 ? Math.min(100, (task.actual_hours / task.estimated_hours) * 100) : 0;
          return (
            <motion.div key={task.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
              <Card className="border-border hover:shadow-md transition-all cursor-pointer" onClick={() => setDetailTask(task)}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground truncate">{task.name}</h3>
                        <Badge className={`text-[10px] ${sc.color}`}>{sc.label}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">{task.info}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{task.actual_hours}h / {task.estimated_hours}h</span>
                        <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{task.comments.length}</span>
                        {task.rating && <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-amber-400 text-amber-400" />{task.rating.rating}</span>}
                        <span>{task.start_date} → {task.finish_date}</span>
                      </div>
                      <Progress value={progress} className="h-1.5 mt-2" />
                    </div>
                    <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                      <div className="flex -space-x-1.5 mr-2">
                        {task.assigned_users.slice(0, 3).map(uid => {
                          const u = getUserById(uid);
                          return u ? <Avatar key={uid} className="w-6 h-6 border-2 border-background"><AvatarFallback className="text-[8px] bg-primary/10 text-primary">{u.avatar}</AvatarFallback></Avatar> : null;
                        })}
                      </div>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(task)}><Edit2 className="w-3.5 h-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => deleteTask(task.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
        {tasks.length === 0 && <div className="text-center py-16 text-muted-foreground">No tasks yet. Create one to get started!</div>}
      </div>

      {/* Task Detail Dialog */}
      <Dialog open={!!detailTask} onOpenChange={() => setDetailTask(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {detailTask && (() => {
            const sc = statusConfig[detailTask.status];
            const freshTask = tasks.find(t => t.id === detailTask.id) || detailTask;
            return (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">{freshTask.name} <Badge className={sc.color}>{sc.label}</Badge></DialogTitle>
                  <DialogDescription>{freshTask.info}</DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="details" className="mt-2">
                  <TabsList className="w-full"><TabsTrigger value="details" className="flex-1">Details</TabsTrigger><TabsTrigger value="comments" className="flex-1">Comments ({freshTask.comments.length})</TabsTrigger><TabsTrigger value="tracker" className="flex-1">Tracker</TabsTrigger><TabsTrigger value="rating" className="flex-1">Rating</TabsTrigger></TabsList>

                  <TabsContent value="details" className="space-y-3 mt-3">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div><span className="text-muted-foreground">Start:</span> <span className="font-medium text-foreground">{freshTask.start_date}</span></div>
                      <div><span className="text-muted-foreground">Deadline:</span> <span className="font-medium text-foreground">{freshTask.finish_date}</span></div>
                      <div><span className="text-muted-foreground">Estimated:</span> <span className="font-medium text-foreground">{freshTask.estimated_hours}h</span></div>
                      <div><span className="text-muted-foreground">Actual:</span> <span className="font-medium text-foreground">{freshTask.actual_hours}h</span></div>
                    </div>
                    <div><span className="text-sm text-muted-foreground">Assigned:</span>
                      <div className="flex gap-2 mt-1">{freshTask.assigned_users.map(uid => { const u = getUserById(uid); return u ? <Badge key={uid} variant="secondary" className="gap-1"><Avatar className="w-4 h-4"><AvatarFallback className="text-[7px]">{u.avatar}</AvatarFallback></Avatar>{u.name}</Badge> : null; })}</div>
                    </div>
                    <Progress value={freshTask.estimated_hours > 0 ? Math.min(100, (freshTask.actual_hours / freshTask.estimated_hours) * 100) : 0} className="h-2" />
                  </TabsContent>

                  <TabsContent value="comments" className="space-y-3 mt-3">
                    {freshTask.comments.map(c => {
                      const u = getUserById(c.user_id);
                      return (
                        <div key={c.id} className={`flex gap-2 ${c.parent_id ? "ml-8" : ""}`}>
                          <Avatar className="w-7 h-7 shrink-0"><AvatarFallback className="text-[9px] bg-primary/10 text-primary">{u?.avatar}</AvatarFallback></Avatar>
                          <div className="bg-muted rounded-lg p-2.5 flex-1">
                            <div className="flex items-center gap-2 mb-0.5"><span className="text-xs font-medium text-foreground">{u?.name}</span><span className="text-[10px] text-muted-foreground">{new Date(c.created_at).toLocaleDateString()}</span></div>
                            <p className="text-sm text-foreground">{c.message}</p>
                          </div>
                        </div>
                      );
                    })}
                    <div className="flex gap-2">
                      <Input value={comment} onChange={e => setComment(e.target.value)} placeholder="Add a comment..." onKeyDown={e => e.key === "Enter" && handleAddComment(freshTask.id)} />
                      <Button size="sm" onClick={() => handleAddComment(freshTask.id)}>Send</Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="tracker" className="space-y-3 mt-3">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted"><span className="text-muted-foreground">Started</span><span className="font-medium text-foreground">{freshTask.tracker?.start_time ? new Date(freshTask.tracker.start_time).toLocaleString() : "—"}</span></div>
                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted"><span className="text-muted-foreground">Review Requested</span><span className="font-medium text-foreground">{freshTask.tracker?.review_request_time ? new Date(freshTask.tracker.review_request_time).toLocaleString() : "—"}</span></div>
                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted"><span className="text-muted-foreground">Completed</span><span className="font-medium text-foreground">{freshTask.tracker?.finish_time ? new Date(freshTask.tracker.finish_time).toLocaleString() : "—"}</span></div>
                    </div>
                    <div className="flex gap-2">
                      {!freshTask.tracker?.start_time && <Button size="sm" className="gap-1" onClick={() => handleTrackerAction(freshTask, "start")}><Play className="w-3 h-3" /> Start</Button>}
                      {freshTask.tracker?.start_time && !freshTask.tracker?.review_request_time && <Button size="sm" variant="outline" className="gap-1" onClick={() => handleTrackerAction(freshTask, "review")}><Eye className="w-3 h-3" /> Send to Review</Button>}
                      {freshTask.tracker?.review_request_time && !freshTask.tracker?.finish_time && <Button size="sm" className="gap-1 bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => handleTrackerAction(freshTask, "finish")}><CheckCircle2 className="w-3 h-3" /> Complete</Button>}
                    </div>
                  </TabsContent>

                  <TabsContent value="rating" className="space-y-3 mt-3">
                    {freshTask.rating ? (
                      <div className="text-center space-y-2">
                        <div className="flex justify-center gap-1">{[1,2,3,4,5].map(s => <Star key={s} className={`w-6 h-6 ${s <= freshTask.rating!.rating ? "fill-amber-400 text-amber-400" : "text-muted"}`} />)}</div>
                        <p className="text-sm text-muted-foreground">{freshTask.rating.feedback}</p>
                        <p className="text-xs text-muted-foreground">by {getUserById(freshTask.rating.reviewer_id)?.name}</p>
                      </div>
                    ) : freshTask.status === "finished" ? (
                      <div className="space-y-3">
                        <div className="flex justify-center gap-1">{[1,2,3,4,5].map(s => <Star key={s} className={`w-7 h-7 cursor-pointer transition-colors ${s <= ratingVal ? "fill-amber-400 text-amber-400" : "text-muted hover:text-amber-300"}`} onClick={() => setRatingVal(s)} />)}</div>
                        <Input value={ratingFeedback} onChange={e => setRatingFeedback(e.target.value)} placeholder="Feedback message..." />
                        <Button className="w-full" onClick={() => handleRate(freshTask)} disabled={ratingVal < 1}>Submit Rating</Button>
                      </div>
                    ) : (
                      <p className="text-center text-sm text-muted-foreground py-4">Task must be finished before rating.</p>
                    )}
                  </TabsContent>
                </Tabs>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>

      {/* Create/Edit Task Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editTaskId ? "Edit Task" : "Create Task"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><label className="text-sm font-medium text-foreground">Name</label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Task name" /></div>
            <div><label className="text-sm font-medium text-foreground">Description</label><Input value={form.info} onChange={e => setForm(f => ({ ...f, info: e.target.value }))} placeholder="What needs to be done?" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-sm font-medium text-foreground">Start Date</label><Input type="date" value={form.start_date} onChange={e => setForm(f => ({ ...f, start_date: e.target.value }))} /></div>
              <div><label className="text-sm font-medium text-foreground">Deadline</label><Input type="date" value={form.finish_date} onChange={e => setForm(f => ({ ...f, finish_date: e.target.value }))} /></div>
            </div>
            <div><label className="text-sm font-medium text-foreground">Estimated Hours</label><Input type="number" value={form.estimated_hours} onChange={e => setForm(f => ({ ...f, estimated_hours: Number(e.target.value) }))} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editTaskId ? "Save" : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
