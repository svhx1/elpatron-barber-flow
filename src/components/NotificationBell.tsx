// NotificationBell - Ícone de sino com painel dropdown de notificações
import { useState, useRef, useEffect } from "react";
import { Bell, Calendar, Tag, Receipt, Info, X, CheckCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNotifications, type Notification } from "@/contexts/NotificationContext";

const typeIcon: Record<Notification["type"], typeof Calendar> = {
  agendamento: Calendar,
  promo: Tag,
  comprovante: Receipt,
  sistema: Info,
};

const typeColor: Record<Notification["type"], string> = {
  agendamento: "text-accent bg-accent/10",
  promo: "text-green-500 bg-green-500/10",
  comprovante: "text-blue-500 bg-blue-500/10",
  sistema: "text-muted-foreground bg-muted",
};

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  // Fecha ao clicar fora
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative w-9 h-9 rounded-full flex items-center justify-center bg-card border border-border text-foreground hover:bg-accent/10 transition-colors"
        aria-label="Notificações"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-80 rounded-xl bg-card border border-border shadow-elevated overflow-hidden z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <h3 className="font-display font-semibold text-sm">Notificações</h3>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-[10px] text-accent font-body font-medium flex items-center gap-1 hover:underline"
                  >
                    <CheckCheck className="w-3 h-3" /> Marcar todas
                  </button>
                )}
                <button onClick={() => setOpen(false)}>
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* List */}
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="text-center text-sm text-muted-foreground py-8 font-body">
                  Nenhuma notificação
                </p>
              ) : (
                notifications.map((n) => {
                  const Icon = typeIcon[n.type];
                  return (
                    <button
                      key={n.id}
                      onClick={() => markAsRead(n.id)}
                      className={`w-full text-left px-4 py-3 flex gap-3 hover:bg-muted/50 transition-colors border-b border-border last:border-0 ${
                        !n.read ? "bg-accent/5" : ""
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${typeColor[n.type]}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-body font-medium text-xs truncate">{n.title}</p>
                          {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />}
                        </div>
                        <p className="text-[11px] text-muted-foreground font-body truncate">{n.message}</p>
                        <p className="text-[10px] text-muted-foreground/60 font-body mt-0.5">{n.time}</p>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
