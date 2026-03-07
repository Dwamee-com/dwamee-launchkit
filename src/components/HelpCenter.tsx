import { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle, Search, X, ChevronDown, ChevronRight,
  MessageSquare, Send, FolderKanban, LayoutList, CheckSquare,
  Timer, BookOpen, Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const categories = [
  {
    id: "projects",
    label: "Projects",
    icon: FolderKanban,
    faqs: [
      { q: "How do I create a new project?", a: "Navigate to the Projects section in the sidebar, then click the '+ New Project' button. Fill in the project name, description, and upload an optional image." },
      { q: "Can I assign multiple users to a project?", a: "Yes. Open the project details and use the 'Assign Users' panel to add team members. Each user will receive a notification." },
      { q: "How do I delete a project?", a: "Open the project, click the three-dot menu, and select 'Delete'. This will also remove all modules and tasks within it." },
    ],
  },
  {
    id: "modules",
    label: "Modules",
    icon: LayoutList,
    faqs: [
      { q: "What is a module?", a: "A module is a grouping of related tasks within a project. Think of it as a folder that organizes work into logical sections." },
      { q: "How do I add tags to a module?", a: "When creating or editing a module, use the 'Tags' field to add comma-separated labels for easy filtering." },
    ],
  },
  {
    id: "tasks",
    label: "Tasks & Workflow",
    icon: CheckSquare,
    faqs: [
      { q: "What are the task statuses?", a: "Tasks move through five stages: Pending → Planning → In Progress → Review → Finished. You can update status manually or drag-and-drop on the Kanban board." },
      { q: "How do I upload attachments?", a: "Open a task and use the 'Files' section to drag-and-drop or browse for files to attach." },
      { q: "How does the rating system work?", a: "After a task is marked as 'Finished', reviewers can submit a 1–5 star rating with optional feedback." },
    ],
  },
  {
    id: "tracker",
    label: "Time Tracker",
    icon: Timer,
    faqs: [
      { q: "How do I start tracking time?", a: "Open an assigned task and click 'Start Task'. The timer begins recording automatically. Click 'Send to Review' or 'Complete' to stop." },
      { q: "Can I see total hours spent?", a: "Yes. Each task card shows accumulated hours. The project overview also displays a summary of estimated vs actual hours." },
    ],
  },
  {
    id: "general",
    label: "General Usage",
    icon: BookOpen,
    faqs: [
      { q: "How do I navigate the dashboard?", a: "Use the sidebar on the left to switch between Branches, Places, Groups, Fields, Assignments, Salaries, and Reports." },
      { q: "Is the system mobile responsive?", a: "Yes. The dashboard adapts to all screen sizes. On mobile, the sidebar collapses into a hamburger menu." },
      { q: "How do I reset my password?", a: "Go to the Login page and click 'Forgot Password'. You'll receive an email with reset instructions." },
    ],
  },
];

const pageContextMap: Record<string, string> = {
  "/dashboard/branches": "projects",
  "/dashboard/places": "general",
  "/dashboard/groups": "modules",
  "/dashboard/fields": "general",
  "/dashboard/assignments": "tasks",
  "/dashboard/salaries": "tracker",
  "/dashboard/daily-report": "tracker",
};

export default function HelpCenter() {
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [showContact, setShowContact] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const currentContext = pageContextMap[location.pathname] || "general";
  const contextCategory = categories.find((c) => c.id === currentContext);

  const filteredCategories = search.trim()
    ? categories.map((cat) => ({
        ...cat,
        faqs: cat.faqs.filter(
          (f) =>
            f.q.toLowerCase().includes(search.toLowerCase()) ||
            f.a.toLowerCase().includes(search.toLowerCase())
        ),
      })).filter((cat) => cat.faqs.length > 0)
    : categories;

  const handleSend = () => {
    setSent(true);
    setContactForm({ name: "", email: "", message: "" });
    setTimeout(() => {
      setSent(false);
      setShowContact(false);
    }, 2000);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative group">
          <HelpCircle className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          <span className="sr-only">Help Center</span>
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md flex flex-col p-0 gap-0">
        <SheetHeader className="p-6 pb-4 border-b border-border shrink-0">
          <SheetTitle className="text-xl font-bold flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            Help Center
          </SheetTitle>
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search help topics…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence mode="wait">
            {!showContact ? (
              <motion.div
                key="faq"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-6"
              >
                {/* Context-aware section */}
                {!search.trim() && contextCategory && (
                  <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <contextCategory.icon className="h-4 w-4 text-primary" />
                      <span className="text-sm font-semibold text-primary">Relevant to this page</span>
                    </div>
                    <Accordion type="single" collapsible>
                      {contextCategory.faqs.map((faq, i) => (
                        <AccordionItem key={i} value={`ctx-${i}`} className="border-primary/10">
                          <AccordionTrigger className="text-sm text-left py-3 hover:no-underline">
                            {faq.q}
                          </AccordionTrigger>
                          <AccordionContent className="text-sm text-muted-foreground">
                            {faq.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                )}

                {/* All categories */}
                {filteredCategories.map((cat) => (
                  <div key={cat.id}>
                    <div className="flex items-center gap-2 mb-2">
                      <cat.icon className="h-4 w-4 text-muted-foreground" />
                      <h3 className="text-sm font-semibold text-foreground">{cat.label}</h3>
                    </div>
                    <Accordion type="single" collapsible>
                      {cat.faqs.map((faq, i) => (
                        <AccordionItem key={i} value={`${cat.id}-${i}`}>
                          <AccordionTrigger className="text-sm text-left py-3 hover:no-underline">
                            {faq.q}
                          </AccordionTrigger>
                          <AccordionContent className="text-sm text-muted-foreground">
                            {faq.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))}

                {filteredCategories.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Search className="h-8 w-8 mx-auto mb-2 opacity-40" />
                    <p className="text-sm">No results found for "{search}"</p>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="contact"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-4"
              >
                <button
                  onClick={() => setShowContact(false)}
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronRight className="h-4 w-4 rotate-180" />
                  Back to Help
                </button>

                {sent ? (
                  <div className="text-center py-12">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                      <CheckSquare className="h-6 w-6 text-accent" />
                    </div>
                    <p className="font-semibold text-foreground">Message sent!</p>
                    <p className="text-sm text-muted-foreground mt-1">We'll get back to you shortly.</p>
                  </div>
                ) : (
                  <>
                    <h3 className="font-semibold text-foreground">Contact Support</h3>
                    <div className="space-y-3">
                      <Input
                        placeholder="Your name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      />
                      <Input
                        type="email"
                        placeholder="Email address"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      />
                      <Textarea
                        placeholder="How can we help?"
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        rows={4}
                      />
                      <div className="rounded-lg bg-muted p-3">
                        <p className="text-xs text-muted-foreground">
                          <Settings className="inline h-3 w-3 mr-1" />
                          Current section: <span className="font-medium text-foreground">{location.pathname}</span>
                        </p>
                      </div>
                      <Button
                        onClick={handleSend}
                        disabled={!contactForm.name || !contactForm.email || !contactForm.message}
                        className="w-full"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {!showContact && (
          <div className="p-4 border-t border-border shrink-0">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowContact(true)}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
