import { User, Project, Module, Task } from "@/types/project";

export const mockUsers: User[] = [
  { id: "u1", name: "Ahmed Hassan", avatar: "AH", email: "ahmed@dwamee.com" },
  { id: "u2", name: "Sara Ali", avatar: "SA", email: "sara@dwamee.com" },
  { id: "u3", name: "Omar Khalid", avatar: "OK", email: "omar@dwamee.com" },
  { id: "u4", name: "Lina Farouk", avatar: "LF", email: "lina@dwamee.com" },
  { id: "u5", name: "Youssef Nader", avatar: "YN", email: "youssef@dwamee.com" },
];

export const mockProjects: Project[] = [
  {
    id: "p1",
    name: "Dwamee Mobile App",
    information: "Main mobile application for workforce management including attendance tracking, shift scheduling, and salary management.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop",
    users: ["u1", "u2", "u3"],
    createdAt: "2026-01-15",
  },
  {
    id: "p2",
    name: "Admin Dashboard",
    information: "Web-based admin dashboard for managing branches, employees, reports, and analytics.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    users: ["u1", "u4", "u5"],
    createdAt: "2026-02-01",
  },
  {
    id: "p3",
    name: "API Gateway",
    information: "RESTful API service handling authentication, data sync, and third-party integrations.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
    users: ["u3", "u5"],
    createdAt: "2026-02-20",
  },
];

export const mockModules: Module[] = [
  { id: "m1", project_id: "p1", user_id: "u1", name: "Authentication", info: "User login, registration, and session management", tags: ["auth", "security"], note: "OAuth integration planned" },
  { id: "m2", project_id: "p1", user_id: "u2", name: "Attendance Tracker", info: "GPS-based check-in/check-out with geofencing", tags: ["gps", "tracking"], note: "Supports polygon boundaries" },
  { id: "m3", project_id: "p1", user_id: "u3", name: "Shift Scheduler", info: "Calendar-based shift management and notifications", tags: ["calendar", "notifications"], note: "" },
  { id: "m4", project_id: "p2", user_id: "u4", name: "Report Engine", info: "Generate daily, weekly, and monthly reports with export", tags: ["reports", "export"], note: "PDF and Excel support" },
  { id: "m5", project_id: "p2", user_id: "u1", name: "User Management", info: "CRUD operations for employee profiles and roles", tags: ["users", "roles"], note: "" },
  { id: "m6", project_id: "p3", user_id: "u5", name: "Auth Middleware", info: "JWT token validation and rate limiting", tags: ["jwt", "security"], note: "Rate limit: 100 req/min" },
];

export const mockTasks: Task[] = [
  {
    id: "t1", module_id: "m1", user_id: "u1", name: "Design login screen", info: "Create mobile login UI with phone + password fields",
    files: [], assigned_users: ["u1", "u2"], status: "finished",
    comments: [
      { id: "c1", task_id: "t1", user_id: "u2", message: "Should we add biometric login?", attachments: [], created_at: "2026-01-20T10:00:00Z" },
      { id: "c2", task_id: "t1", user_id: "u1", message: "Yes, planned for v2. Let's keep it simple for now.", attachments: [], created_at: "2026-01-20T11:30:00Z", parent_id: "c1" },
    ],
    rating: { rating: 5, feedback: "Clean design, well executed", reviewer_id: "u3" },
    start_date: "2026-01-16", finish_date: "2026-01-20", estimated_hours: 8, actual_hours: 6,
    tracker: { task_id: "t1", user_id: "u1", start_time: "2026-01-16T09:00:00Z", review_request_time: "2026-01-19T16:00:00Z", finish_time: "2026-01-20T14:00:00Z" },
  },
  {
    id: "t2", module_id: "m1", user_id: "u1", name: "Implement OTP verification", info: "Add SMS OTP flow for phone verification",
    files: [], assigned_users: ["u1"], status: "in_progress",
    comments: [
      { id: "c3", task_id: "t2", user_id: "u1", message: "Using Twilio for SMS gateway", attachments: [], created_at: "2026-02-01T09:00:00Z" },
    ],
    start_date: "2026-02-01", finish_date: "2026-02-10", estimated_hours: 16, actual_hours: 10,
    tracker: { task_id: "t2", user_id: "u1", start_time: "2026-02-01T09:00:00Z" },
  },
  {
    id: "t3", module_id: "m2", user_id: "u2", name: "GPS check-in module", info: "Implement location capture on check-in with accuracy validation",
    files: [], assigned_users: ["u2", "u3"], status: "review",
    comments: [],
    start_date: "2026-01-25", finish_date: "2026-02-05", estimated_hours: 20, actual_hours: 18,
    tracker: { task_id: "t3", user_id: "u2", start_time: "2026-01-25T08:00:00Z", review_request_time: "2026-02-04T15:00:00Z" },
  },
  {
    id: "t4", module_id: "m2", user_id: "u2", name: "Geofence polygon editor", info: "Map-based polygon drawing for geofence boundaries",
    files: [], assigned_users: ["u2"], status: "planning",
    comments: [],
    start_date: "2026-02-10", finish_date: "2026-02-20", estimated_hours: 24, actual_hours: 0,
  },
  {
    id: "t5", module_id: "m3", user_id: "u3", name: "Calendar view component", info: "Monthly calendar view with shift color coding",
    files: [], assigned_users: ["u3"], status: "pending",
    comments: [],
    start_date: "2026-02-15", finish_date: "2026-02-28", estimated_hours: 12, actual_hours: 0,
  },
  {
    id: "t6", module_id: "m4", user_id: "u4", name: "Daily report generator", info: "Auto-generate daily attendance summaries",
    files: [], assigned_users: ["u4", "u5"], status: "in_progress",
    comments: [
      { id: "c4", task_id: "t6", user_id: "u4", message: "Added PDF export functionality", attachments: [], created_at: "2026-02-28T14:00:00Z" },
    ],
    start_date: "2026-02-25", finish_date: "2026-03-10", estimated_hours: 16, actual_hours: 8,
    tracker: { task_id: "t6", user_id: "u4", start_time: "2026-02-25T09:00:00Z" },
  },
  {
    id: "t7", module_id: "m5", user_id: "u1", name: "Employee profile page", info: "Design and implement employee profile with editable fields",
    files: [], assigned_users: ["u1", "u4"], status: "pending",
    comments: [],
    start_date: "2026-03-01", finish_date: "2026-03-15", estimated_hours: 10, actual_hours: 0,
  },
  {
    id: "t8", module_id: "m6", user_id: "u5", name: "JWT middleware setup", info: "Configure JWT validation and refresh token logic",
    files: [], assigned_users: ["u5"], status: "finished",
    comments: [],
    rating: { rating: 4, feedback: "Good implementation, needs better error messages", reviewer_id: "u1" },
    start_date: "2026-02-20", finish_date: "2026-02-28", estimated_hours: 8, actual_hours: 7,
    tracker: { task_id: "t8", user_id: "u5", start_time: "2026-02-20T09:00:00Z", review_request_time: "2026-02-27T16:00:00Z", finish_time: "2026-02-28T11:00:00Z" },
  },
];
