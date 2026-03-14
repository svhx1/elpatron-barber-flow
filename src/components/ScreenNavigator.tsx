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
} from "lucide-react";

const screens = [
  { name: "Home", path: "/", icon: Home },
  { name: "Admin", path: "/admin", icon: LayoutDashboard },
  { name: "Barbeiro", path: "/barbeiro", icon: Scissors },
  { name: "Cliente", path: "/cliente", icon: User },
  { name: "Totem", path: "/totem", icon: Monitor },
  { name: "Estoque", path: "/estoque", icon: Package },
];

export function ScreenNavigator() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const current = screens.find((s) => s.path === location.pathname) || screens[0];

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-charcoal text-gold shadow-elevated backdrop-blur-sm font-body text-sm font-medium transition-all hover:bg-charcoal-light"
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
            className="absolute right-0 mt-2 w-48 rounded-lg bg-charcoal shadow-elevated overflow-hidden border border-charcoal-light"
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
                      ? "bg-gold/10 text-gold"
                      : "text-gold/70 hover:bg-gold/5 hover:text-gold"
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
  );
}
