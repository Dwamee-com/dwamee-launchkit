import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Send, Mail, MessageSquare, Users, Building2, Clock, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const mockOrganizations = [
  { id: "org1", name: "Acme Corp", users: 45 },
  { id: "org2", name: "Tech Solutions", users: 32 },
  { id: "org3", name: "Global Services", users: 28 },
];

const mockClients = [
  { id: "c1", name: "John Smith", email: "john@example.com", phone: "+201234567890" },
  { id: "c2", name: "Jane Doe", email: "jane@example.com", phone: "+201234567891" },
  { id: "c3", name: "Ali Hassan", email: "ali@example.com", phone: "+201234567892" },
];

const sentMessages = [
  { id: "1", target: "Acme Corp", channel: "email", content: "Your subscription renews in 7 days.", date: "2026-03-28", status: "delivered" },
  { id: "2", target: "John Smith", channel: "whatsapp", content: "Welcome to Dwamee! Your account is ready.", date: "2026-03-27", status: "delivered" },
  { id: "3", target: "All Organizations", channel: "email", content: "System maintenance scheduled for April 5th.", date: "2026-03-25", status: "delivered" },
];

export default function AdminMessages() {
  const { toast } = useToast();
  const [audience, setAudience] = useState<"organizations" | "clients">("organizations");
  const [selectedTargets, setSelectedTargets] = useState<string[]>([]);
  const [channel, setChannel] = useState<"email" | "whatsapp">("email");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [selectAll, setSelectAll] = useState(false);

  const targets = audience === "organizations" ? mockOrganizations : mockClients;

  const toggleTarget = (id: string) => {
    setSelectedTargets((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    setSelectedTargets(checked ? targets.map((t) => t.id) : []);
  };

  const handleSend = () => {
    toast({ title: "Message Sent", description: `Sent via ${channel} to ${selectedTargets.length} recipient(s).` });
    setContent("");
    setSubject("");
    setSelectedTargets([]);
    setSelectAll(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Messages</h1>
        <p className="text-muted-foreground">Send messages to organizations or clients via email or WhatsApp</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Compose */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Compose Message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Audience */}
              <div className="space-y-2">
                <Label>Send To</Label>
                <RadioGroup
                  value={audience}
                  onValueChange={(v) => {
                    setAudience(v as any);
                    setSelectedTargets([]);
                    setSelectAll(false);
                  }}
                  className="flex gap-4"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="organizations" id="org" />
                    <Label htmlFor="org" className="flex items-center gap-1.5 cursor-pointer">
                      <Building2 className="h-4 w-4" /> Organizations
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="clients" id="cli" />
                    <Label htmlFor="cli" className="flex items-center gap-1.5 cursor-pointer">
                      <Users className="h-4 w-4" /> Clients
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Recipients */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Recipients</Label>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={selectAll}
                      onCheckedChange={(v) => handleSelectAll(!!v)}
                      id="select-all"
                    />
                    <Label htmlFor="select-all" className="text-xs cursor-pointer">Select All</Label>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 p-3 rounded-lg border border-border bg-muted/30 min-h-[60px]">
                  {targets.map((t) => {
                    const isSelected = selectedTargets.includes(t.id);
                    return (
                      <Badge
                        key={t.id}
                        variant={isSelected ? "default" : "outline"}
                        className="cursor-pointer transition-all hover:scale-105"
                        onClick={() => toggleTarget(t.id)}
                      >
                        {t.name}
                        {"users" in t && <span className="ml-1 opacity-70">({t.users})</span>}
                      </Badge>
                    );
                  })}
                </div>
              </div>

              {/* Channel */}
              <div className="space-y-2">
                <Label>Channel</Label>
                <RadioGroup value={channel} onValueChange={(v) => setChannel(v as any)} className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="email" id="ch-email" />
                    <Label htmlFor="ch-email" className="flex items-center gap-1.5 cursor-pointer">
                      <Mail className="h-4 w-4" /> Email
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="whatsapp" id="ch-wa" />
                    <Label htmlFor="ch-wa" className="flex items-center gap-1.5 cursor-pointer">
                      <MessageSquare className="h-4 w-4" /> WhatsApp
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Subject (email only) */}
              {channel === "email" && (
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Enter email subject..."
                  />
                </div>
              )}

              {/* Content */}
              <div className="space-y-2">
                <Label>Message Content</Label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Type your message here..."
                  rows={5}
                />
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={handleSend}
                  disabled={!content || selectedTargets.length === 0}
                  className="gap-2"
                >
                  <Send className="h-4 w-4" /> Send Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sent History */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Messages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {sentMessages.map((msg, i) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-3 rounded-lg border border-border space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{msg.target}</span>
                    <Badge variant="outline" className="text-xs gap-1">
                      {msg.channel === "email" ? <Mail className="h-3 w-3" /> : <MessageSquare className="h-3 w-3" />}
                      {msg.channel}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{msg.content}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" /> {msg.date}
                    <CheckCircle2 className="h-3 w-3 text-accent" />
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
