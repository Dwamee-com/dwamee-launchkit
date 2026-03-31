import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, CreditCard, Shield, Globe, Plus, Trash2, Save } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface ExpiryAlert {
  id: string;
  daysBefore: number;
  enabled: boolean;
}

export default function SystemConfig() {
  const { toast } = useToast();

  const [subAlerts, setSubAlerts] = useState<ExpiryAlert[]>([
    { id: "1", daysBefore: 7, enabled: true },
    { id: "2", daysBefore: 30, enabled: true },
  ]);

  const [autoRenewReminder, setAutoRenewReminder] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [defaultLanguage, setDefaultLanguage] = useState("en");
  const [sessionTimeout, setSessionTimeout] = useState(60);

  const addAlert = () => {
    setSubAlerts((prev) => [
      ...prev,
      { id: Date.now().toString(), daysBefore: 14, enabled: true },
    ]);
  };

  const removeAlert = (id: string) => {
    setSubAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const updateAlert = (id: string, field: keyof ExpiryAlert, value: any) => {
    setSubAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, [field]: value } : a))
    );
  };

  const handleSave = () => {
    toast({ title: "Settings Saved", description: "System configuration updated successfully." });
  };

  const configs = [
    {
      icon: <CreditCard className="h-5 w-5 text-primary" />,
      title: "Subscription Expiry Alerts",
      description: "Notify organizations before their subscription expires",
      content: (
        <div className="space-y-3">
          {subAlerts.map((alert, i) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30"
            >
              <Switch
                checked={alert.enabled}
                onCheckedChange={(v) => updateAlert(alert.id, "enabled", v)}
              />
              <div className="flex items-center gap-2 flex-1">
                <span className="text-sm text-muted-foreground">Notify</span>
                <Input
                  type="number"
                  min={1}
                  max={365}
                  value={alert.daysBefore}
                  onChange={(e) => updateAlert(alert.id, "daysBefore", parseInt(e.target.value) || 1)}
                  className="w-20 h-8"
                />
                <span className="text-sm text-muted-foreground">days before expiry</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
                onClick={() => removeAlert(alert.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
          <Button variant="outline" size="sm" onClick={addAlert} className="gap-1">
            <Plus className="h-3.5 w-3.5" /> Add Alert
          </Button>
        </div>
      ),
    },
    {
      icon: <Bell className="h-5 w-5 text-primary" />,
      title: "Auto-Renewal Reminder",
      description: "Send a reminder when subscription auto-renews",
      content: (
        <div className="flex items-center justify-between p-3 rounded-lg border border-border">
          <div>
            <p className="text-sm font-medium text-foreground">Enable auto-renewal reminders</p>
            <p className="text-xs text-muted-foreground">Notify admins before auto-renewal charges</p>
          </div>
          <Switch checked={autoRenewReminder} onCheckedChange={setAutoRenewReminder} />
        </div>
      ),
    },
    {
      icon: <Globe className="h-5 w-5 text-primary" />,
      title: "General Settings",
      description: "System-wide configuration",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Default Language</Label>
              <Select value={defaultLanguage} onValueChange={setDefaultLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ar">العربية</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Session Timeout (minutes)</Label>
              <Input
                type="number"
                min={5}
                max={480}
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(parseInt(e.target.value) || 60)}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: <Shield className="h-5 w-5 text-primary" />,
      title: "Maintenance Mode",
      description: "Temporarily disable the system for maintenance",
      content: (
        <div className="flex items-center justify-between p-3 rounded-lg border border-border">
          <div>
            <p className="text-sm font-medium text-foreground">Enable Maintenance Mode</p>
            <p className="text-xs text-muted-foreground">Users will see a maintenance page</p>
          </div>
          <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">System Configuration</h1>
          <p className="text-muted-foreground">Manage system-wide settings and alerts</p>
        </div>
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" /> Save Settings
        </Button>
      </div>

      <div className="grid gap-4">
        {configs.map((cfg, i) => (
          <motion.div
            key={cfg.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  {cfg.icon}
                  <div>
                    <CardTitle className="text-base">{cfg.title}</CardTitle>
                    <CardDescription className="text-xs">{cfg.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>{cfg.content}</CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
