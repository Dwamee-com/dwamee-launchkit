import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell, MapPin, Clock, CheckCircle, X, Save, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockUsers = [
  { id: "1", name: "Ahmed Hassan", initials: "AH" },
  { id: "2", name: "Sara Ali", initials: "SA" },
  { id: "3", name: "Mohamed Khaled", initials: "MK" },
  { id: "4", name: "Fatima Omar", initials: "FO" },
  { id: "5", name: "Youssef Nabil", initials: "YN" },
];

interface NotificationRule {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  mode: "yes" | "no" | "select";
  selectedUsers: string[];
}

const initialRules: NotificationRule[] = [
  {
    id: "attend",
    title: "Employee Attendance",
    description: "Receive notification when an employee attends",
    icon: <Bell className="h-5 w-5 text-primary" />,
    mode: "no",
    selectedUsers: [],
  },
  {
    id: "outside_location",
    title: "Location Breach",
    description: "Receive notification when an employee goes outside location and comes back",
    icon: <MapPin className="h-5 w-5 text-destructive" />,
    mode: "no",
    selectedUsers: [],
  },
  {
    id: "end_early",
    title: "Early Shift End",
    description: "Receive notification when a user ends shift early",
    icon: <Clock className="h-5 w-5 text-orange-500" />,
    mode: "no",
    selectedUsers: [],
  },
  {
    id: "end_on_time",
    title: "On-Time Shift End",
    description: "Receive notification when a user ends shift on time",
    icon: <CheckCircle className="h-5 w-5 text-emerald-500" />,
    mode: "no",
    selectedUsers: [],
  },
];

export default function NotificationConfig() {
  const [rules, setRules] = useState<NotificationRule[]>(initialRules);
  const { toast } = useToast();

  const updateRule = (id: string, updates: Partial<NotificationRule>) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updates } : r))
    );
  };

  const toggleUser = (ruleId: string, userId: string) => {
    setRules((prev) =>
      prev.map((r) => {
        if (r.id !== ruleId) return r;
        const selected = r.selectedUsers.includes(userId)
          ? r.selectedUsers.filter((u) => u !== userId)
          : [...r.selectedUsers, userId];
        return { ...r, selectedUsers: selected };
      })
    );
  };

  const handleSave = () => {
    toast({ title: "Settings saved", description: "Notification preferences updated successfully." });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notification Settings</h1>
          <p className="text-muted-foreground mt-1">Configure when and who receives notifications</p>
        </div>
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" /> Save Settings
        </Button>
      </div>

      <div className="space-y-4">
        {rules.map((rule) => (
          <Card key={rule.id} className="overflow-hidden border border-border/60 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                  {rule.icon}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-base">{rule.title}</CardTitle>
                  <CardDescription className="text-sm">{rule.description}</CardDescription>
                </div>
                <Switch
                  checked={rule.mode !== "no"}
                  onCheckedChange={(checked) =>
                    updateRule(rule.id, { mode: checked ? "yes" : "no", selectedUsers: [] })
                  }
                />
              </div>
            </CardHeader>

            {rule.mode !== "no" && (
              <CardContent className="pt-0 space-y-4">
                <RadioGroup
                  value={rule.mode}
                  onValueChange={(v) => updateRule(rule.id, { mode: v as "yes" | "select", selectedUsers: v === "yes" ? [] : rule.selectedUsers })}
                  className="flex gap-6"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="yes" id={`${rule.id}-yes`} />
                    <Label htmlFor={`${rule.id}-yes`} className="cursor-pointer font-normal">Everyone</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="select" id={`${rule.id}-select`} />
                    <Label htmlFor={`${rule.id}-select`} className="cursor-pointer font-normal flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5" /> Select Users
                    </Label>
                  </div>
                </RadioGroup>

                {rule.mode === "select" && (
                  <div className="space-y-3">
                    {rule.selectedUsers.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {rule.selectedUsers.map((uid) => {
                          const user = mockUsers.find((u) => u.id === uid);
                          return user ? (
                            <Badge key={uid} variant="secondary" className="gap-1.5 pr-1 py-1">
                              {user.name}
                              <button onClick={() => toggleUser(rule.id, uid)} className="ml-1 rounded-full hover:bg-muted-foreground/20 p-0.5">
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {mockUsers.filter((u) => !rule.selectedUsers.includes(u.id)).map((user) => (
                        <button
                          key={user.id}
                          onClick={() => toggleUser(rule.id, user.id)}
                          className="flex items-center gap-3 p-2.5 rounded-lg border border-border/50 hover:border-primary/40 hover:bg-muted/50 transition-colors text-left"
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs bg-primary/10 text-primary">{user.initials}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium text-foreground">{user.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
