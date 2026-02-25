import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
