import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";
import DashboardLayout from "./components/DashboardLayout";
import Branches from "./pages/dashboard/Branches";
import Places from "./pages/dashboard/Places";
import Groups from "./pages/dashboard/Groups";
import Fields from "./pages/dashboard/Fields";
import Assignments from "./pages/dashboard/Assignments";

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
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="branches" element={<Branches />} />
            <Route path="places" element={<Places />} />
            <Route path="groups" element={<Groups />} />
            <Route path="fields" element={<Fields />} />
            <Route path="assignments" element={<Assignments />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
