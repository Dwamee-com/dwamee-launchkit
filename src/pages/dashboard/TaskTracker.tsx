import { useProjectContext } from "@/contexts/ProjectContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Clock, Play, Eye, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function TaskTracker() {
  const { tasks, modules, projects, getUserById } = useProjectContext();
  const trackedTasks = tasks.filter(t => t.tracker);

  const calcHours = (start?: string, end?: string) => {
    if (!start) return 0;
    const endMs = end ? new Date(end).getTime() : Date.now();
    return Math.round((endMs - new Date(start).getTime()) / 3600000 * 10) / 10;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Task Tracker</h1>
        <p className="text-muted-foreground text-sm">Track user activity and time spent on tasks</p>
      </div>

      <div className="grid gap-4">
        {trackedTasks.map((task, i) => {
          const mod = modules.find(m => m.id === task.module_id);
          const proj = mod ? projects.find(p => p.id === mod.project_id) : null;
          const user = getUserById(task.tracker!.user_id);
          const totalHours = calcHours(task.tracker!.start_time, task.tracker!.finish_time);
          const steps = [
            { label: "Started", time: task.tracker!.start_time, icon: Play, done: !!task.tracker!.start_time },
            { label: "Review", time: task.tracker!.review_request_time, icon: Eye, done: !!task.tracker!.review_request_time },
            { label: "Finished", time: task.tracker!.finish_time, icon: CheckCircle2, done: !!task.tracker!.finish_time },
          ];
          const progress = steps.filter(s => s.done).length / steps.length * 100;

          return (
            <motion.div key={task.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground">{task.name}</h3>
                      <p className="text-xs text-muted-foreground">{proj?.name} → {mod?.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {user && (
                        <div className="flex items-center gap-1.5">
                          <Avatar className="w-6 h-6"><AvatarFallback className="text-[8px] bg-primary/10 text-primary">{user.avatar}</AvatarFallback></Avatar>
                          <span className="text-xs text-foreground">{user.name}</span>
                        </div>
                      )}
                      <Badge variant="secondary" className="gap-1 text-xs"><Clock className="w-3 h-3" />{totalHours}h</Badge>
                    </div>
                  </div>
                  <Progress value={progress} className="h-1.5 mb-3" />
                  <div className="flex gap-6">
                    {steps.map((step, si) => (
                      <div key={si} className="flex items-center gap-2 text-xs">
                        <step.icon className={`w-4 h-4 ${step.done ? "text-accent" : "text-muted-foreground"}`} />
                        <div>
                          <p className={`font-medium ${step.done ? "text-foreground" : "text-muted-foreground"}`}>{step.label}</p>
                          <p className="text-muted-foreground">{step.time ? new Date(step.time).toLocaleString() : "—"}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
        {trackedTasks.length === 0 && <p className="text-center py-16 text-muted-foreground">No tracked tasks yet.</p>}
      </div>
    </div>
  );
}
