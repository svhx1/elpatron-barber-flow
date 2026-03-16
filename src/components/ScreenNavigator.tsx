// ScreenNavigator - Menu flutuante de navegação entre telas + tema + notificações
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Scissors,
  User,
  Monitor,
  Package,
  ChevronDown,
  Home,
  ShoppingBag,
  LogIn,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NotificationBell } from "@/components/NotificationBell";

const screens = [
  { name: "Home", path: "/", icon: Home },
  { name: "Login", path: "/login", icon: LogIn },
  { name: "Admin", path: "/admin", icon: LayoutDashboard },
  { name: "Barbeiro", path: "/barbeiro", icon: Scissors },
  { name: "Cliente", path: "/cliente", icon: User },
  { name: "Totem", path: "/totem", icon: Monitor },
  { name: "Loja", path: "/loja", icon: ShoppingBag },
  { name: "Estoque", path: "/estoque", icon: Package },
];

export function ScreenNavigator() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const current = screens.find((s) => s.path === location.pathname) || screens[0];

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <ThemeToggle />
      <NotificationBell />

      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-foreground shadow-elevated font-body text-sm font-medium transition-all hover:bg-muted"
        >
          <current.icon className="w-4 h-4" />
          <span>{current.name}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-48 rounded-lg bg-card shadow-elevated overflow-hidden border border-border"
            >
              {screens.map((screen) => {
                const isActive = location.pathname === screen.path;
                return (
                  <button
                    key={screen.path}
                    onClick={() => {
                      navigate(screen.path);
                      setOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-body transition-colors ${
                      isActive
                        ? "bg-accent/10 text-accent"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <screen.icon className="w-4 h-4" />
                    <span>{screen.name}</span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
