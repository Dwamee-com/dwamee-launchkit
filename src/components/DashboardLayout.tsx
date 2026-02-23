import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";
import { GitBranch, MapPin, Users, Layers, CreditCard, LogOut } from "lucide-react";

const menuItems = [
  { title: "Branches", url: "/dashboard/branches", icon: GitBranch },
  { title: "Places", url: "/dashboard/places", icon: MapPin },
  { title: "Groups", url: "/dashboard/groups", icon: Users },
  { title: "Fields", url: "/dashboard/fields", icon: Layers },
  { title: "Assignments", url: "/dashboard/assignments", icon: CreditCard },
];

export default function DashboardLayout() {
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <div className="p-4 border-b border-sidebar-border">
            <h1 className="text-xl font-bold text-primary cursor-pointer" onClick={() => navigate("/")}>Dwamee</h1>
          </div>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink to={item.url} className="hover:bg-muted/50" activeClassName="bg-muted text-primary font-medium">
                          <item.icon className="mr-2 h-4 w-4" />
                          <span>{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <div className="mt-auto p-4 border-t border-sidebar-border">
            <button onClick={() => navigate("/login")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full">
              <LogOut className="w-4 h-4" /> Sign out
            </button>
          </div>
        </Sidebar>

        <main className="flex-1 flex flex-col min-w-0">
          <header className="h-14 border-b border-border flex items-center px-4 bg-background shrink-0">
            <SidebarTrigger />
          </header>
          <div className="flex-1 p-6 overflow-auto bg-muted/30">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
