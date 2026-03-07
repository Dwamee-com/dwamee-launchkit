import { useState, useRef } from "react";
import { useProjectContext } from "@/contexts/ProjectContext";
import { Task, TaskStatus } from "@/types/project";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, MessageSquare, GripVertical } from "lucide-react";
import { motion } from "framer-motion";

const columns: { status: TaskStatus; label: string; color: string }[] = [
  { status: "pending", label: "Pending", color: "border-t-muted-foreground" },
  { status: "planning", label: "Planning", color: "border-t-secondary-foreground" },
  { status: "in_progress", label: "In Progress", color: "border-t-primary" },
  { status: "review", label: "Review", color: "border-t-accent" },
  { status: "finished", label: "Finished", color: "border-t-accent" },
];

export default function KanbanBoard() {
  const { projects, modules, tasks, updateTaskStatus, getUserById, getModulesForProject } = useProjectContext();
  const [filterProject, setFilterProject] = useState<string>("all");
  const [filterModule, setFilterModule] = useState<string>("all");
  const dragItem = useRef<string | null>(null);
  const [dragOver, setDragOver] = useState<TaskStatus | null>(null);

  const filteredModules = filterProject !== "all" ? getModulesForProject(filterProject) : modules;
  const filteredTasks = tasks.filter(t => {
    const mod = modules.find(m => m.id === t.module_id);
    if (filterProject !== "all" && mod?.project_id !== filterProject) return false;
    if (filterModule !== "all" && t.module_id !== filterModule) return false;
    return true;
  });

  const getTasksForStatus = (status: TaskStatus) => filteredTasks.filter(t => t.status === status);

  const onDragStart = (taskId: string) => { dragItem.current = taskId; };
  const onDragOver = (e: React.DragEvent, status: TaskStatus) => { e.preventDefault(); setDragOver(status); };
  const onDragLeave = () => setDragOver(null);
  const onDrop = (status: TaskStatus) => {
    if (dragItem.current) {
      updateTaskStatus(dragItem.current, status);
      dragItem.current = null;
    }
    setDragOver(null);
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Kanban Board</h1>
        <p className="text-muted-foreground text-sm">Drag tasks between columns to update status</p>
      </div>

      <div className="flex gap-3 flex-wrap">
        <Select value={filterProject} onValueChange={v => { setFilterProject(v); setFilterModule("all"); }}>
          <SelectTrigger className="w-48"><SelectValue placeholder="All Projects" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Projects</SelectItem>
            {projects.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filterModule} onValueChange={setFilterModule}>
          <SelectTrigger className="w-48"><SelectValue placeholder="All Modules" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Modules</SelectItem>
            {filteredModules.map(m => <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4" style={{ minHeight: "calc(100vh - 280px)" }}>
        {columns.map(col => {
          const colTasks = getTasksForStatus(col.status);
          return (
            <div
              key={col.status}
              className={`flex-shrink-0 w-64 rounded-xl bg-muted/50 border ${col.color} border-t-4 flex flex-col transition-colors ${dragOver === col.status ? "bg-primary/5 border-primary/30" : "border-border"}`}
              onDragOver={e => onDragOver(e, col.status)}
              onDragLeave={onDragLeave}
              onDrop={() => onDrop(col.status)}
            >
              <div className="p-3 flex items-center justify-between">
                <h3 className="font-semibold text-sm text-foreground">{col.label}</h3>
                <Badge variant="secondary" className="text-[10px]">{colTasks.length}</Badge>
              </div>
              <div className="flex-1 p-2 space-y-2 overflow-y-auto">
                {colTasks.map((task, i) => {
                  const mod = modules.find(m => m.id === task.module_id);
                  return (
                    <motion.div key={task.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.02 }}>
                      <Card
                        draggable
                        onDragStart={() => onDragStart(task.id)}
                        className="cursor-grab active:cursor-grabbing border-border hover:shadow-md transition-all"
                      >
                        <CardContent className="p-3 space-y-2">
                          <div className="flex items-start gap-1.5">
                            <GripVertical className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">{task.name}</p>
                              {mod && <p className="text-[10px] text-muted-foreground">{mod.name}</p>}
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex -space-x-1">
                              {task.assigned_users.slice(0, 2).map(uid => {
                                const u = getUserById(uid);
                                return u ? <Avatar key={uid} className="w-5 h-5 border border-background"><AvatarFallback className="text-[7px] bg-primary/10 text-primary">{u.avatar}</AvatarFallback></Avatar> : null;
                              })}
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                              <span className="flex items-center gap-0.5"><Clock className="w-2.5 h-2.5" />{task.actual_hours}h</span>
                              <span className="flex items-center gap-0.5"><MessageSquare className="w-2.5 h-2.5" />{task.comments.length}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
