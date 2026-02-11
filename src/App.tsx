import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import LiveTracking from "./pages/LiveTracking";
import TechnicianManagement from "./pages/TechnicianManagement";
import ProductivityAnalytics from "./pages/ProductivityAnalytics";
import EntryExitLogs from "./pages/EntryExitLogs";
import AlertsNotifications from "./pages/AlertsNotifications";
import AuditLogs from "./pages/AuditLogs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tracking" element={<LiveTracking />} />
          <Route path="/technicians" element={<TechnicianManagement />} />
          <Route path="/analytics" element={<ProductivityAnalytics />} />
          <Route path="/logs" element={<EntryExitLogs />} />
          <Route path="/alerts" element={<AlertsNotifications />} />
          <Route path="/audit" element={<AuditLogs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
