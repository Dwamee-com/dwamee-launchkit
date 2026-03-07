import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProjectContext } from "@/contexts/ProjectContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ArrowLeft, Plus, Edit2, Trash2, Tag, CheckSquare, User } from "lucide-react";
import { motion } from "framer-motion";

export default function ProjectDetails() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { projects, getModulesForProject, getTasksForModule, addModule, updateModule, deleteModule, getUserById } = useProjectContext();

  const project = projects.find(p => p.id === projectId);
  const modules = projectId ? getModulesForProject(projectId) : [];

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editModuleId, setEditModuleId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", info: "", tags: "", note: "" });

  if (!project) return <div className="text-center py-20 text-muted-foreground">Project not found</div>;

  const openCreate = () => {
    setEditModuleId(null);
    setForm({ name: "", info: "", tags: "", note: "" });
    setDialogOpen(true);
  };

  const openEdit = (id: string) => {
    const m = modules.find(x => x.id === id);
    if (!m) return;
    setEditModuleId(id);
    setForm({ name: m.name, info: m.info, tags: m.tags.join(", "), note: m.note });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) return;
    const tags = form.tags.split(",").map(t => t.trim()).filter(Boolean);
    if (editModuleId) {
      const m = modules.find(x => x.id === editModuleId)!;
      updateModule({ ...m, name: form.name, info: form.info, tags, note: form.note });
    } else {
      addModule({ project_id: project.id, user_id: "u1", name: form.name, info: form.info, tags, note: form.note });
    }
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard/projects")}><ArrowLeft className="w-4 h-4" /></Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">{project.name}</h1>
          <p className="text-muted-foreground text-sm">{project.information}</p>
        </div>
        <Button onClick={openCreate} className="gap-2"><Plus className="w-4 h-4" /> New Module</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {modules.map((mod, i) => {
          const modTasks = getTasksForModule(mod.id);
          const owner = getUserById(mod.user_id);
          return (
            <motion.div key={mod.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border-border group" onClick={() => navigate(`/dashboard/projects/${project.id}/modules/${mod.id}`)}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-base">{mod.name}</CardTitle>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={e => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(mod.id)}><Edit2 className="w-3.5 h-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => deleteModule(mod.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-2">{mod.info}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {mod.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-[10px] gap-1"><Tag className="w-2.5 h-2.5" />{tag}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t border-border">
                    <span className="flex items-center gap-1"><CheckSquare className="w-3.5 h-3.5" /> {modTasks.length} tasks</span>
                    {owner && (
                      <span className="flex items-center gap-1">
                        <Avatar className="w-5 h-5"><AvatarFallback className="text-[8px] bg-primary/10 text-primary">{owner.avatar}</AvatarFallback></Avatar>
                        {owner.name}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editModuleId ? "Edit Module" : "Create Module"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><label className="text-sm font-medium text-foreground">Name</label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Module name" /></div>
            <div><label className="text-sm font-medium text-foreground">Description</label><Input value={form.info} onChange={e => setForm(f => ({ ...f, info: e.target.value }))} placeholder="What does this module do?" /></div>
            <div><label className="text-sm font-medium text-foreground">Tags (comma-separated)</label><Input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="auth, security, api" /></div>
            <div><label className="text-sm font-medium text-foreground">Note</label><Input value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))} placeholder="Optional note" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editModuleId ? "Save" : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
