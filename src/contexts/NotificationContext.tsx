// NotificationContext - Gerencia notificações do sistema (agendamentos, promoções, comprovantes)
import { createContext, useContext, useState, type ReactNode } from "react";

export interface Notification {
  id: string;
  type: "agendamento" | "promo" | "comprovante" | "sistema";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (n: Omit<Notification, "id" | "read">) => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const mockNotifications: Notification[] = [
  { id: "1", type: "agendamento", title: "Agendamento confirmado", message: "Corte + Barba com Carlos Silva às 14:00", time: "Agora", read: false },
  { id: "2", type: "promo", title: "Promoção ativa!", message: "Combo Corte + Barba + Sobrancelha por R$ 75", time: "2h atrás", read: false },
  { id: "3", type: "comprovante", title: "Comprovante gerado", message: "Pagamento de R$ 65,00 confirmado — Senha #042", time: "5h atrás", read: false },
  { id: "4", type: "sistema", title: "Bem-vindo ao El Patron!", message: "Seu cadastro foi realizado com sucesso", time: "1 dia atrás", read: true },
];

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) =>
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  const markAllAsRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const addNotification = (n: Omit<Notification, "id" | "read">) =>
    setNotifications((prev) => [{ ...n, id: Date.now().toString(), read: false }, ...prev]);

  const removeNotification = (id: string) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, markAllAsRead, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotifications must be used within NotificationProvider");
  return context;
}
