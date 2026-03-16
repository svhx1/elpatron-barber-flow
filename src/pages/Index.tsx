import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, Scissors, User, Monitor, Package, ShoppingBag } from "lucide-react";
import logo from "@/assets/logo-el-patron.jpeg";
import { ScreenNavigator } from "@/components/ScreenNavigator";

const views = [
  { name: "Painel Admin", desc: "Dashboard e gestão completa", path: "/admin", icon: LayoutDashboard },
  { name: "Barbeiro", desc: "Agenda e atendimentos", path: "/barbeiro", icon: Scissors },
  { name: "Cliente", desc: "Agendar e avaliar", path: "/cliente", icon: User },
  { name: "Totem", desc: "Autoatendimento premium", path: "/totem", icon: Monitor },
  { name: "Loja", desc: "Produtos e ofertas", path: "/loja", icon: ShoppingBag },
  { name: "Estoque", desc: "Controle de inventário", path: "/estoque", icon: Package },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
      <ScreenNavigator />

      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C5A059' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center mb-12"
      >
        <img src={logo} alt="Barbearia El Patron" className="h-28 mx-auto mb-6 object-contain" />
        <div className="w-24 h-0.5 gold-gradient mx-auto rounded-full" />
      </motion.div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6 max-w-4xl w-full">
        {views.map((view, i) => (
          <motion.button
            key={view.path}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
            onClick={() => navigate(view.path)}
            className="group flex items-center gap-4 p-5 rounded-lg border border-border bg-card/50 backdrop-blur-sm hover:border-accent/50 hover:bg-card transition-all text-left"
          >
            <div className="w-11 h-11 rounded-md bg-accent/20 flex items-center justify-center shrink-0">
              <view.icon className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="font-display font-semibold text-foreground group-hover:text-accent transition-colors">
                {view.name}
              </p>
              <p className="text-xs text-muted-foreground font-body">{view.desc}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="relative z-10 mt-12 text-muted-foreground/50 text-xs font-body tracking-widest uppercase"
      >
        Sistema de Gestão • El Patron
      </motion.p>
    </div>
  );
};

export default Index;
