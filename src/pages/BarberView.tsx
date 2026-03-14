import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Clock, Star, Heart, Calendar } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { ScreenNavigator } from "@/components/ScreenNavigator";

const diasSemana = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const agendaHoje = [
  { hora: "09:00", cliente: "Marcos Pereira", servico: "Corte + Barba", duracao: "45min", status: "concluído", favorito: true },
  { hora: "10:00", cliente: "Lucas Mendes", servico: "Corte Degradê", duracao: "30min", status: "em andamento", favorito: false },
  { hora: "11:00", cliente: "André Costa", servico: "Barba", duracao: "20min", status: "agendado", favorito: false },
  { hora: "13:30", cliente: "Fernando Souza", servico: "Corte Social", duracao: "30min", status: "agendado", favorito: true },
  { hora: "14:30", cliente: "Bruno Ribeiro", servico: "Corte + Sobrancelha", duracao: "40min", status: "agendado", favorito: false },
];

export default function BarberView() {
  const [disponivel, setDisponivel] = useState(true);
  const [agenda, setAgenda] = useState(agendaHoje);

  const marcarConcluido = (idx: number) => {
    setAgenda((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, status: "concluído" } : item))
    );
  };

  const toggleFavorito = (idx: number) => {
    setAgenda((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, favorito: !item.favorito } : item))
    );
  };

  return (
    <div className="min-h-screen bg-background p-6 pb-20">
      <ScreenNavigator />
      <div className="max-w-3xl mx-auto">
        <PageHeader title="Visão do Barbeiro" subtitle="Carlos Silva" />

        {/* Status + Stats */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => setDisponivel(!disponivel)}
            className={`px-4 py-2 rounded-lg text-sm font-body font-medium transition-colors ${
              disponivel
                ? "bg-green-500/10 text-green-600 border border-green-500/30"
                : "bg-destructive/10 text-destructive border border-destructive/30"
            }`}
          >
            {disponivel ? "● Disponível" : "● Indisponível"}
          </button>
          <div className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-card border border-border text-sm">
            <Star className="w-3.5 h-3.5 text-accent" />
            <span className="font-body font-medium">4.8</span>
            <span className="text-muted-foreground">(127 avaliações)</span>
          </div>
          <div className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-card border border-border text-sm">
            <Calendar className="w-3.5 h-3.5 text-accent" />
            <span className="font-body">{agenda.length} agendamentos hoje</span>
          </div>
        </div>

        {/* Week mini calendar */}
        <div className="flex gap-2 mb-6">
          {diasSemana.map((dia, i) => (
            <button
              key={dia}
              className={`flex-1 py-2.5 rounded-lg text-xs font-body font-medium transition-colors ${
                i === 4
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:border-accent/30"
              }`}
            >
              <div>{dia}</div>
              <div className="text-sm font-semibold mt-0.5">{9 + i}</div>
            </button>
          ))}
        </div>

        {/* Agenda */}
        <h2 className="font-display text-lg font-semibold mb-4">Agenda de Hoje</h2>
        <div className="space-y-2">
          {agenda.map((item, idx) => (
            <motion.div
              key={idx}
              layout
              className={`bg-card rounded-lg p-4 border border-border flex items-center gap-4 animate-fade-in ${
                item.status === "concluído" ? "opacity-60" : ""
              }`}
            >
              <div className="text-center min-w-[50px]">
                <p className="text-sm font-body font-semibold text-accent">{item.hora}</p>
                <p className="text-[10px] text-muted-foreground">{item.duracao}</p>
              </div>

              <div className="h-10 w-px bg-border" />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-body font-medium text-sm truncate">{item.cliente}</p>
                  <button onClick={() => toggleFavorito(idx)} className="shrink-0">
                    <Heart
                      className={`w-3.5 h-3.5 transition-colors ${
                        item.favorito ? "text-destructive fill-destructive" : "text-muted-foreground"
                      }`}
                    />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">{item.servico}</p>
              </div>

              <div className="flex items-center gap-2">
                {item.status === "concluído" ? (
                  <span className="text-xs px-2.5 py-1 rounded-full bg-green-500/10 text-green-600 font-body">
                    <Check className="w-3 h-3 inline mr-1" />Concluído
                  </span>
                ) : item.status === "em andamento" ? (
                  <span className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent font-body flex items-center gap-1">
                    <Clock className="w-3 h-3" />Em andamento
                  </span>
                ) : (
                  <button
                    onClick={() => marcarConcluido(idx)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-body font-medium hover:bg-charcoal-light transition-colors"
                  >
                    Concluir
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
