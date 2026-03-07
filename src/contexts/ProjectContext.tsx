import { useState, createContext, useContext, useCallback } from "react";
import { Project, Module, Task, TaskComment, TaskStatus } from "@/types/project";
import { mockProjects, mockModules, mockTasks, mockUsers } from "@/data/mockData";

interface ProjectContextType {
  projects: Project[];
  modules: Module[];
  tasks: Task[];
  addProject: (p: Omit<Project, "id" | "createdAt">) => void;
  updateProject: (p: Project) => void;
  deleteProject: (id: string) => void;
  addModule: (m: Omit<Module, "id">) => void;
  updateModule: (m: Module) => void;
  deleteModule: (id: string) => void;
  addTask: (t: Omit<Task, "id">) => void;
  updateTask: (t: Task) => void;
  deleteTask: (id: string) => void;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  addComment: (taskId: string, comment: Omit<TaskComment, "id" | "created_at">) => void;
  getModulesForProject: (projectId: string) => Module[];
  getTasksForModule: (moduleId: string) => Task[];
  getTasksForProject: (projectId: string) => Task[];
  getUserById: (id: string) => typeof mockUsers[0] | undefined;
}

const ProjectContext = createContext<ProjectContextType | null>(null);

export function useProjectContext() {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error("useProjectContext must be used within ProjectProvider");
  return ctx;
}

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [modules, setModules] = useState<Module[]>(mockModules);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const uid = () => Math.random().toString(36).slice(2, 10);

  const addProject = useCallback((p: Omit<Project, "id" | "createdAt">) => {
    setProjects(prev => [...prev, { ...p, id: `p${uid()}`, createdAt: new Date().toISOString().slice(0, 10) }]);
  }, []);

  const updateProject = useCallback((p: Project) => {
    setProjects(prev => prev.map(x => x.id === p.id ? p : x));
  }, []);

  const deleteProject = useCallback((id: string) => {
    setProjects(prev => prev.filter(x => x.id !== id));
    setModules(prev => {
      const modIds = prev.filter(m => m.project_id === id).map(m => m.id);
      setTasks(t => t.filter(task => !modIds.includes(task.module_id)));
      return prev.filter(m => m.project_id !== id);
    });
  }, []);

  const addModule = useCallback((m: Omit<Module, "id">) => {
    setModules(prev => [...prev, { ...m, id: `m${uid()}` }]);
  }, []);

  const updateModule = useCallback((m: Module) => {
    setModules(prev => prev.map(x => x.id === m.id ? m : x));
  }, []);

  const deleteModule = useCallback((id: string) => {
    setModules(prev => prev.filter(x => x.id !== id));
    setTasks(prev => prev.filter(t => t.module_id !== id));
  }, []);

  const addTask = useCallback((t: Omit<Task, "id">) => {
    setTasks(prev => [...prev, { ...t, id: `t${uid()}` }]);
  }, []);

  const updateTask = useCallback((t: Task) => {
    setTasks(prev => prev.map(x => x.id === t.id ? t : x));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(x => x.id !== id));
  }, []);

  const updateTaskStatus = useCallback((taskId: string, status: TaskStatus) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status } : t));
  }, []);

  const addComment = useCallback((taskId: string, comment: Omit<TaskComment, "id" | "created_at">) => {
    setTasks(prev => prev.map(t => t.id === taskId ? {
      ...t,
      comments: [...t.comments, { ...comment, id: `c${uid()}`, created_at: new Date().toISOString() }]
    } : t));
  }, []);

  const getModulesForProject = useCallback((projectId: string) => modules.filter(m => m.project_id === projectId), [modules]);
  const getTasksForModule = useCallback((moduleId: string) => tasks.filter(t => t.module_id === moduleId), [tasks]);
  const getTasksForProject = useCallback((projectId: string) => {
    const modIds = modules.filter(m => m.project_id === projectId).map(m => m.id);
    return tasks.filter(t => modIds.includes(t.module_id));
  }, [modules, tasks]);
  const getUserById = useCallback((id: string) => mockUsers.find(u => u.id === id), []);

  return (
    <ProjectContext.Provider value={{
      projects, modules, tasks,
      addProject, updateProject, deleteProject,
      addModule, updateModule, deleteModule,
      addTask, updateTask, deleteTask, updateTaskStatus,
      addComment, getModulesForProject, getTasksForModule, getTasksForProject, getUserById,
    }}>
      {children}
    </ProjectContext.Provider>
  );
}
