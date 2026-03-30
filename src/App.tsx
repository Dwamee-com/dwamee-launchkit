import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";
import InitCheckout from "./pages/InitCheckout";
import HowItWorks from "./pages/HowItWorks";
import Blogs from "./pages/Blogs";
import DashboardLayout from "./components/DashboardLayout";
import Branches from "./pages/dashboard/Branches";
import Places from "./pages/dashboard/Places";
import Groups from "./pages/dashboard/Groups";
import Fields from "./pages/dashboard/Fields";
import Assignments from "./pages/dashboard/Assignments";
import MonthlySalaries from "./pages/dashboard/MonthlySalaries";
import SalaryDetails from "./pages/dashboard/SalaryDetails";
import DailyReport from "./pages/dashboard/DailyReport";
import Projects from "./pages/dashboard/Projects";
import ProjectDetails from "./pages/dashboard/ProjectDetails";
import ModuleDetails from "./pages/dashboard/ModuleDetails";
import KanbanBoard from "./pages/dashboard/KanbanBoard";
import TaskTracker from "./pages/dashboard/TaskTracker";
import LeaveTypes from "./pages/dashboard/LeaveTypes";
import LeaveRequests from "./pages/dashboard/LeaveRequests";
import EmployeeComparison from "./pages/dashboard/EmployeeComparison";
import Statistics from "./pages/dashboard/Statistics";
import EmployeeProfile from "./pages/dashboard/EmployeeProfile";
import NotificationConfig from "./pages/dashboard/NotificationConfig";
import Notifications from "./pages/dashboard/Notifications";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<InitCheckout />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="branches" element={<Branches />} />
            <Route path="places" element={<Places />} />
            <Route path="groups" element={<Groups />} />
            <Route path="fields" element={<Fields />} />
            <Route path="assignments" element={<Assignments />} />
            <Route path="salaries" element={<MonthlySalaries />} />
            <Route path="salary-details/:year/:month" element={<SalaryDetails />} />
            <Route path="daily-report" element={<DailyReport />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:projectId" element={<ProjectDetails />} />
            <Route path="projects/:projectId/modules/:moduleId" element={<ModuleDetails />} />
            <Route path="kanban" element={<KanbanBoard />} />
            <Route path="tracker" element={<TaskTracker />} />
            <Route path="leave-types" element={<LeaveTypes />} />
            <Route path="leave-requests" element={<LeaveRequests />} />
            <Route path="employee-comparison" element={<EmployeeComparison />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="employee/:employeeId" element={<EmployeeProfile />} />
            <Route path="notification-config" element={<NotificationConfig />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
