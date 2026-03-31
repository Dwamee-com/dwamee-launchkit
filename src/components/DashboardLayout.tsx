import { Outlet, useNavigate } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";
import { GitBranch, MapPin, Users, Layers, CreditCard, Wallet, FileBarChart, LogOut, FolderKanban, LayoutGrid, Activity, CalendarDays, ClipboardList, UserCheck, BarChart3, User, Bell, Settings, Clock, MessageSquare, Cog } from "lucide-react";
import HelpCenter from "@/components/HelpCenter";
import OnboardingTour from "@/components/OnboardingTour";
import { ProjectProvider } from "@/contexts/ProjectContext";

const managementItems = [
  { title: "Branches", url: "/dashboard/branches", icon: GitBranch, tour: "branches" },
  { title: "Places", url: "/dashboard/places", icon: MapPin, tour: "places" },
  { title: "Groups", url: "/dashboard/groups", icon: Users, tour: "groups" },
  { title: "Fields", url: "/dashboard/fields", icon: Layers, tour: "fields" },
  { title: "Assignments", url: "/dashboard/assignments", icon: CreditCard },
  { title: "Salaries", url: "/dashboard/salaries", icon: Wallet },
  { title: "Daily Report", url: "/dashboard/daily-report", icon: FileBarChart },
];

const projectItems = [
  { title: "Projects", url: "/dashboard/projects", icon: FolderKanban, tour: "projects" },
  { title: "Kanban Board", url: "/dashboard/kanban", icon: LayoutGrid, tour: "kanban" },
  { title: "Task Tracker", url: "/dashboard/tracker", icon: Activity },
];

const leaveItems = [
  { title: "Leave Types", url: "/dashboard/leave-types", icon: CalendarDays, tour: "leave-types" },
  { title: "Leave Requests", url: "/dashboard/leave-requests", icon: ClipboardList },
  { title: "Employee Comparison", url: "/dashboard/employee-comparison", icon: UserCheck },
];

const analyticsItems = [
  { title: "Statistics", url: "/dashboard/statistics", icon: BarChart3 },
  { title: "Employee Profile", url: "/dashboard/employee/1", icon: User },
];

const notificationItems = [
  { title: "Notifications", url: "/dashboard/notifications", icon: Bell },
  { title: "Notification Config", url: "/dashboard/notification-config", icon: Settings },
];

const operationsItems = [
  { title: "Shift Management", url: "/dashboard/shifts", icon: Clock },
  { title: "Messages", url: "/dashboard/messages", icon: MessageSquare },
  { title: "System Config", url: "/dashboard/system-config", icon: Cog },
];

export default function DashboardLayout() {
  const navigate = useNavigate();

  const renderMenu = (items: typeof managementItems) => (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <NavLink
              to={item.url}
              className="hover:bg-muted/50"
              activeClassName="bg-muted text-primary font-medium"
              {...("tour" in item && item.tour ? { "data-tour": item.tour } : {})}
            >
              <item.icon className="mr-2 h-4 w-4" />
              <span>{item.title}</span>
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );

  return (
    <ProjectProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <Sidebar>
            <div className="p-4 border-b border-sidebar-border">
              <h1 className="text-xl font-bold text-primary cursor-pointer" onClick={() => navigate("/")}>Dwamee</h1>
            </div>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Management</SidebarGroupLabel>
                <SidebarGroupContent>{renderMenu(managementItems)}</SidebarGroupContent>
              </SidebarGroup>
              <SidebarGroup>
                <SidebarGroupLabel>Project Management</SidebarGroupLabel>
                <SidebarGroupContent>{renderMenu(projectItems)}</SidebarGroupContent>
              </SidebarGroup>
              <SidebarGroup>
                <SidebarGroupLabel>Leave & Attendance</SidebarGroupLabel>
                <SidebarGroupContent>{renderMenu(leaveItems)}</SidebarGroupContent>
              </SidebarGroup>
              <SidebarGroup>
                <SidebarGroupLabel>Analytics</SidebarGroupLabel>
                <SidebarGroupContent>{renderMenu(analyticsItems)}</SidebarGroupContent>
              </SidebarGroup>
              <SidebarGroup>
                <SidebarGroupLabel>Notifications</SidebarGroupLabel>
                <SidebarGroupContent>{renderMenu(notificationItems)}</SidebarGroupContent>
              </SidebarGroup>
              <SidebarGroup>
                <SidebarGroupLabel>Operations</SidebarGroupLabel>
                <SidebarGroupContent>{renderMenu(operationsItems)}</SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <div className="mt-auto p-4 border-t border-sidebar-border">
              <button onClick={() => navigate("/login")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full">
                <LogOut className="w-4 h-4" /> Sign out
              </button>
            </div>
          </Sidebar>

          <main className="flex-1 flex flex-col min-w-0">
            <header className="h-14 border-b border-border flex items-center justify-between px-4 bg-background shrink-0">
              <SidebarTrigger />
              <HelpCenter />
            </header>
            <div className="flex-1 p-6 overflow-auto bg-muted/30">
              <Outlet />
            </div>
          </main>
        </div>
        <OnboardingTour />
      </SidebarProvider>
    </ProjectProvider>
  );
}
