import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import BarberView from "./pages/BarberView.tsx";
import ClientView from "./pages/ClientView.tsx";
import TotemView from "./pages/TotemView.tsx";
import LoginView from "./pages/LoginView.tsx";
import EstoqueView from "./pages/EstoqueView.tsx";
import LojaView from "./pages/LojaView.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <NotificationProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/barbeiro" element={<BarberView />} />
              <Route path="/cliente" element={<ClientView />} />
              <Route path="/totem" element={<TotemView />} />
              <Route path="/estoque" element={<EstoqueView />} />
              <Route path="/loja" element={<LojaView />} />
              <Route path="/login" element={<LoginView />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </NotificationProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
