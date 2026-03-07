export type TaskStatus = "pending" | "planning" | "in_progress" | "review" | "finished";

export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
}

export interface Project {
  id: string;
  name: string;
  information: string;
  image: string;
  users: string[];
  createdAt: string;
}

export interface Module {
  id: string;
  project_id: string;
  user_id: string;
  name: string;
  info: string;
  tags: string[];
  note: string;
}

export interface TaskComment {
  id: string;
  task_id: string;
  user_id: string;
  message: string;
  attachments: string[];
  created_at: string;
  parent_id?: string;
}

export interface TaskRating {
  rating: number;
  feedback: string;
  reviewer_id: string;
}

export interface TaskTracker {
  task_id: string;
  user_id: string;
  start_time?: string;
  review_request_time?: string;
  finish_time?: string;
}

export interface Task {
  id: string;
  module_id: string;
  user_id: string;
  name: string;
  info: string;
  files: string[];
  assigned_users: string[];
  status: TaskStatus;
  comments: TaskComment[];
  rating?: TaskRating;
  start_date: string;
  finish_date: string;
  estimated_hours: number;
  actual_hours: number;
  tracker?: TaskTracker;
}
