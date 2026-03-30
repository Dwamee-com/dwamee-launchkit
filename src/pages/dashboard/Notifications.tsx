import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, CheckCheck, MapPin, Clock, CheckCircle, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Notification {
  id: string;
  userName: string;
  userInitials: string;
  content: string;
  type: "attend" | "location" | "early" | "on_time";
  url: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  { id: "1", userName: "Ahmed Hassan", userInitials: "AH", content: "has checked in at Cairo HQ branch", type: "attend", url: "/dashboard/employee/1", time: "2 min ago", read: false },
  { id: "2", userName: "Sara Ali", userInitials: "SA", content: "went outside the assigned location at Alexandria Office", type: "location", url: "/dashboard/employee/1", time: "15 min ago", read: false },
  { id: "3", userName: "Mohamed Khaled", userInitials: "MK", content: "ended shift early at 3:30 PM (scheduled 5:00 PM)", type: "early", url: "/dashboard/employee/1", time: "1 hour ago", read: false },
  { id: "4", userName: "Fatima Omar", userInitials: "FO", content: "ended shift on time at 5:00 PM", type: "on_time", url: "/dashboard/employee/1", time: "2 hours ago", read: true },
  { id: "5", userName: "Youssef Nabil", userInitials: "YN", content: "has checked in at Riyadh branch", type: "attend", url: "/dashboard/employee/1", time: "3 hours ago", read: true },
  { id: "6", userName: "Sara Ali", userInitials: "SA", content: "returned to the assigned location at Alexandria Office", type: "location", url: "/dashboard/employee/1", time: "4 hours ago", read: true },
  { id: "7", userName: "Ahmed Hassan", userInitials: "AH", content: "ended shift early at 4:00 PM (scheduled 5:00 PM)", type: "early", url: "/dashboard/employee/1", time: "Yesterday", read: true },
  { id: "8", userName: "Mohamed Khaled", userInitials: "MK", content: "ended shift on time at 5:00 PM", type: "on_time", url: "/dashboard/employee/1", time: "Yesterday", read: true },
];

const typeConfig = {
  attend: { icon: LogIn, color: "text-primary", bg: "bg-primary/10", label: "Attendance" },
  location: { icon: MapPin, color: "text-destructive", bg: "bg-destructive/10", label: "Location" },
  early: { icon: Clock, color: "text-orange-500", bg: "bg-orange-500/10", label: "Early Leave" },
  on_time: { icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-500/10", label: "On Time" },
};

export default function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleClick = (notif: Notification) => {
    setNotifications((prev) => prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n)));
    navigate(notif.url);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
          {unreadCount > 0 && (
            <Badge className="rounded-full">{unreadCount} new</Badge>
          )}
        </div>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" onClick={markAllRead} className="gap-2 text-muted-foreground">
            <CheckCheck className="h-4 w-4" /> Mark all read
          </Button>
        )}
      </div>

      <div className="space-y-2">
        {notifications.map((notif) => {
          const config = typeConfig[notif.type];
          const Icon = config.icon;
          return (
            <button
              key={notif.id}
              onClick={() => handleClick(notif)}
              className={`w-full flex items-start gap-4 p-4 rounded-xl border transition-all text-left ${
                notif.read
                  ? "border-border/40 bg-card hover:bg-muted/40"
                  : "border-primary/20 bg-primary/[0.03] hover:bg-primary/[0.06] shadow-sm"
              }`}
            >
              <div className="relative shrink-0">
                <Avatar className="h-11 w-11">
                  <AvatarFallback className="bg-muted text-sm font-semibold">{notif.userInitials}</AvatarFallback>
                </Avatar>
                <div className={`absolute -bottom-1 -right-1 h-6 w-6 rounded-full ${config.bg} flex items-center justify-center ring-2 ring-background`}>
                  <Icon className={`h-3.5 w-3.5 ${config.color}`} />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-semibold text-foreground">{notif.userName}</span>{" "}
                  <span className="text-muted-foreground">{notif.content}</span>
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-xs text-muted-foreground">{notif.time}</span>
                  <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${config.color} border-current/20`}>
                    {config.label}
                  </Badge>
                </div>
              </div>

              {!notif.read && (
                <div className="h-2.5 w-2.5 rounded-full bg-primary shrink-0 mt-2" />
              )}
            </button>
          );
        })}
      </div>

      {notifications.length === 0 && (
        <div className="text-center py-16">
          <Bell className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground">No notifications yet</p>
        </div>
      )}
    </div>
  );
}
