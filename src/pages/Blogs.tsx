import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";

const blogs = [
  {
    id: 1,
    title: "How Geofencing is Revolutionizing Workforce Management",
    description: "Discover how GPS-based attendance tracking eliminates buddy punching and improves accountability across distributed teams.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=340&fit=crop",
    tags: ["Geofencing", "Attendance"],
    date: "Feb 20, 2026",
  },
  {
    id: 2,
    title: "5 Payroll Mistakes That Cost You Thousands",
    description: "Learn the most common payroll errors small businesses make and how automated rules can save you time and money.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=340&fit=crop",
    tags: ["Payroll", "HR"],
    date: "Feb 15, 2026",
  },
  {
    id: 3,
    title: "Remote Teams: Building Trust Through Transparency",
    description: "Best practices for managing remote teams with attendance insights, shift visibility, and clear expectations.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=340&fit=crop",
    tags: ["Remote Work", "Management"],
    date: "Feb 10, 2026",
  },
  {
    id: 4,
    title: "The Future of Employee Scheduling in 2026",
    description: "AI-powered shift planning, swap requests, and smart notifications — what's next for scheduling software.",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&h=340&fit=crop",
    tags: ["Scheduling", "AI"],
    date: "Feb 5, 2026",
  },
  {
    id: 5,
    title: "Compliance Made Easy: Labor Law Essentials",
    description: "Stay compliant with local labor laws using automated overtime tracking and policy enforcement.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=340&fit=crop",
    tags: ["Compliance", "Legal"],
    date: "Jan 28, 2026",
  },
  {
    id: 6,
    title: "Why Employee Self-Service Portals Matter",
    description: "Empower your workforce with self-service tools for leave requests, pay slips, and shift swaps.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=340&fit=crop",
    tags: ["Self-Service", "HR Tech"],
    date: "Jan 20, 2026",
  },
];

export default function Blogs() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 sm:py-24">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3 bg-primary/10 px-4 py-1.5 rounded-full">
            Our Blog
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-4">
            Insights & <span className="gradient-text">Updates</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto text-lg">
            Tips, guides, and news to help you manage your workforce smarter.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, i) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                <div className="relative overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardContent className="p-5 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {blog.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-[10px] font-medium">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="font-bold text-foreground text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 flex-1">{blog.description}</p>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {blog.date}
                    </span>
                    <Button variant="ghost" size="sm" className="text-primary text-xs gap-1 px-2 h-7">
                      Read More <ArrowRight className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
