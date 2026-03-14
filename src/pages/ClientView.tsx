import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Clock, Calendar, MapPin, ChevronRight, X } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { ScreenNavigator } from "@/components/ScreenNavigator";

const barbeiros = [
  { nome: "Carlos Silva", avaliacao: 4.8, reviews: 127, disponivel: true, especialidade: "Degradê & Barba" },
  { nome: "Rafael Santos", avaliacao: 4.5, reviews: 89, disponivel: true, especialidade: "Corte Social" },
  { nome: "João Oliveira", avaliacao: 4.9, reviews: 201, disponivel: false, especialidade: "Afro & Tranças" },
  { nome: "Pedro Lima", avaliacao: 4.3, reviews: 56, disponivel: true, especialidade: "Corte Infantil" },
];

const servicos = [
  { nome: "Corte Masculino", preco: 45, duracao: "30min" },
  { nome: "Corte + Barba", preco: 65, duracao: "45min" },
  { nome: "Barba", preco: 30, duracao: "20min" },
  { nome: "Corte Degradê", preco: 55, duracao: "35min" },
  { nome: "Sobrancelha", preco: 15, duracao: "10min" },
  { nome: "Corte + Sobrancelha", preco: 55, duracao: "40min" },
];

const horarios = ["09:00", "09:30", "10:00", "10:30", "11:00", "13:00", "13:30", "14:00", "14:30", "15:00"];

const historico = [
  { data: "10/03/2026", servico: "Corte + Barba", barbeiro: "Carlos Silva", avaliacao: 5 },
  { data: "25/02/2026", servico: "Corte Degradê", barbeiro: "Rafael Santos", avaliacao: 4 },
  { data: "12/02/2026", servico: "Barba", barbeiro: "Carlos Silva", avaliacao: 5 },
];

export default function ClientView() {
  const [step, setStep] = useState<"barbeiros" | "servicos" | "horario" | "confirmar">("barbeiros");
  const [selected, setSelected] = useState({ barbeiro: "", servico: "", horario: "" });
  const [tab, setTab] = useState<"agendar" | "historico">("agendar");

  const reset = () => {
    setStep("barbeiros");
    setSelected({ barbeiro: "", servico: "", horario: "" });
  };

  return (
    <div className="min-h-screen bg-background p-6 pb-20">
      <ScreenNavigator />
      <div className="max-w-3xl mx-auto">
        <PageHeader title="Área do Cliente" subtitle="Olá, Marcos!" />

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-card rounded-lg p-1 border border-border w-fit">
          {(["agendar", "historico"] as const).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); reset(); }}
              className={`px-4 py-2 rounded-md text-sm font-body font-medium transition-colors ${
                tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "agendar" ? "Agendar" : "Histórico"}
            </button>
          ))}
        </div>

        {tab === "historico" ? (
          <div className="space-y-3">
            {historico.map((h, i) => (
              <div key={i} className="bg-card rounded-lg p-4 border border-border animate-fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-body font-medium text-sm">{h.servico}</p>
                    <p className="text-xs text-muted-foreground">{h.barbeiro} • {h.data}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className={`w-3.5 h-3.5 ${j < h.avaliacao ? "text-accent fill-accent" : "text-muted"}`} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Progress */}
            <div className="flex items-center gap-2 mb-6 text-xs font-body text-muted-foreground">
              {["Barbeiro", "Serviço", "Horário", "Confirmar"].map((label, i) => {
                const steps = ["barbeiros", "servicos", "horario", "confirmar"];
                const currentIdx = steps.indexOf(step);
                return (
                  <div key={label} className="flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                      i <= currentIdx ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                    }`}>{i + 1}</span>
                    <span className={i <= currentIdx ? "text-foreground" : ""}>{label}</span>
                    {i < 3 && <ChevronRight className="w-3 h-3" />}
                  </div>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              {step === "barbeiros" && (
                <motion.div key="barbeiros" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3">
                  <h2 className="font-display text-lg font-semibold mb-2">Escolha seu barbeiro</h2>
                  {barbeiros.map((b) => (
                    <button
                      key={b.nome}
                      disabled={!b.disponivel}
                      onClick={() => { setSelected({ ...selected, barbeiro: b.nome }); setStep("servicos"); }}
                      className={`w-full text-left bg-card rounded-lg p-4 border transition-all flex items-center justify-between ${
                        b.disponivel ? "border-border hover:border-accent/40 cursor-pointer" : "border-border opacity-50 cursor-not-allowed"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-sm">
                          {b.nome.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <p className="font-body font-medium text-sm">{b.nome}</p>
                          <p className="text-xs text-muted-foreground">{b.especialidade}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-accent fill-accent" />
                          <span className="text-sm font-body font-medium">{b.avaliacao}</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground">{b.reviews} reviews</p>
                        {!b.disponivel && <span className="text-[10px] text-destructive">Indisponível</span>}
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}

              {step === "servicos" && (
                <motion.div key="servicos" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display text-lg font-semibold">Escolha o serviço</h2>
                    <button onClick={() => setStep("barbeiros")} className="text-xs text-accent font-body">← Voltar</button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {servicos.map((s) => (
                      <button
                        key={s.nome}
                        onClick={() => { setSelected({ ...selected, servico: s.nome }); setStep("horario"); }}
                        className="text-left bg-card rounded-lg p-4 border border-border hover:border-accent/40 transition-all"
                      >
                        <p className="font-body font-medium text-sm">{s.nome}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-lg font-display font-bold text-accent">R$ {s.preco}</span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />{s.duracao}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === "horario" && (
                <motion.div key="horario" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display text-lg font-semibold">Escolha o horário</h2>
                    <button onClick={() => setStep("servicos")} className="text-xs text-accent font-body">← Voltar</button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 font-body">
                    <Calendar className="w-3.5 h-3.5 inline mr-1" /> Sexta, 14 de Março de 2026
                  </p>
                  <div className="grid grid-cols-5 gap-2">
                    {horarios.map((h) => (
                      <button
                        key={h}
                        onClick={() => { setSelected({ ...selected, horario: h }); setStep("confirmar"); }}
                        className="py-3 rounded-lg bg-card border border-border text-sm font-body font-medium hover:border-accent/40 hover:bg-accent/5 transition-all"
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === "confirmar" && (
                <motion.div key="confirmar" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="font-display text-lg font-semibold mb-4">Confirmar Agendamento</h2>
                  <div className="bg-card rounded-lg p-6 border border-border space-y-3">
                    <div className="flex justify-between text-sm font-body">
                      <span className="text-muted-foreground">Barbeiro</span>
                      <span className="font-medium">{selected.barbeiro}</span>
                    </div>
                    <div className="flex justify-between text-sm font-body">
                      <span className="text-muted-foreground">Serviço</span>
                      <span className="font-medium">{selected.servico}</span>
                    </div>
                    <div className="flex justify-between text-sm font-body">
                      <span className="text-muted-foreground">Horário</span>
                      <span className="font-medium">{selected.horario} - 14/03/2026</span>
                    </div>
                    <div className="flex justify-between text-sm font-body pt-3 border-t border-border">
                      <span className="text-muted-foreground">Total</span>
                      <span className="text-lg font-display font-bold text-accent">
                        R$ {servicos.find(s => s.nome === selected.servico)?.preco || 0}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button onClick={reset} className="flex-1 py-3 rounded-lg border border-border text-sm font-body text-muted-foreground hover:bg-muted transition-colors">
                      Cancelar
                    </button>
                    <button
                      onClick={reset}
                      className="flex-1 py-3 rounded-lg bg-accent text-accent-foreground text-sm font-body font-semibold hover:opacity-90 transition-opacity"
                    >
                      Confirmar e Pagar
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
}
