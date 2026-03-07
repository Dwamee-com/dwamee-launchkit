import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProjectContext } from "@/contexts/ProjectContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Search, Edit2, Trash2, Users, Layers, CheckSquare } from "lucide-react";
import { motion } from "framer-motion";

export default function Projects() {
  const { projects, modules, tasks, addProject, updateProject, deleteProject, getUserById, getModulesForProject, getTasksForProject } = useProjectContext();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editProject, setEditProject] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", information: "", image: "", users: [] as string[] });

  const filtered = projects.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const openCreate = () => {
    setEditProject(null);
    setForm({ name: "", information: "", image: "", users: [] });
    setDialogOpen(true);
  };

  const openEdit = (id: string) => {
    const p = projects.find(x => x.id === id);
    if (!p) return;
    setEditProject(id);
    setForm({ name: p.name, information: p.information, image: p.image, users: [...p.users] });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (editProject) {
      const p = projects.find(x => x.id === editProject)!;
      updateProject({ ...p, ...form });
    } else {
      addProject(form);
    }
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground text-sm">Manage your work projects</p>
        </div>
        <Button onClick={openCreate} className="gap-2"><Plus className="w-4 h-4" /> New Project</Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search projects..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((project, i) => {
          const pModules = getModulesForProject(project.id);
          const pTasks = getTasksForProject(project.id);
          return (
            <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="overflow-hidden cursor-pointer group hover:shadow-lg transition-all duration-300 border-border" onClick={() => navigate(`/dashboard/projects/${project.id}`)}>
                <div className="h-36 overflow-hidden relative">
                  <img src={project.image} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-lg font-bold text-primary-foreground">{project.name}</h3>
                  </div>
                </div>
                <CardContent className="p-4 space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-2">{project.information}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Layers className="w-3.5 h-3.5" /> {pModules.length} modules</span>
                    <span className="flex items-center gap-1"><CheckSquare className="w-3.5 h-3.5" /> {pTasks.length} tasks</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {project.users.slice(0, 4).map(uid => {
                        const u = getUserById(uid);
                        return u ? (
                          <Avatar key={uid} className="w-7 h-7 border-2 border-background">
                            <AvatarFallback className="text-[10px] bg-primary/10 text-primary">{u.avatar}</AvatarFallback>
                          </Avatar>
                        ) : null;
                      })}
                      {project.users.length > 4 && <Badge variant="secondary" className="text-[10px] ml-1">+{project.users.length - 4}</Badge>}
                    </div>
                    <div className="flex gap-1" onClick={e => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(project.id)}><Edit2 className="w-3.5 h-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => deleteProject(project.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editProject ? "Edit Project" : "Create Project"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Name</label>
              <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Project name" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Description</label>
              <Input value={form.information} onChange={e => setForm(f => ({ ...f, information: e.target.value }))} placeholder="Brief description" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Image URL</label>
              <Input value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} placeholder="https://..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editProject ? "Save" : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
