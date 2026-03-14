import { useState } from "react";
import { motion } from "framer-motion";
import { UserCheck, Users, CreditCard, CheckCircle, ArrowLeft } from "lucide-react";
import logo from "@/assets/logo-el-patron.jpeg";
import { ScreenNavigator } from "@/components/ScreenNavigator";
import { Input } from "@/components/ui/input";

const barbeirosTotem = [
  { nome: "Carlos Silva", disponivel: true, tempoRestante: 15 },
  { nome: "Rafael Santos", disponivel: true, tempoRestante: 5 },
  { nome: "Pedro Lima", disponivel: true, tempoRestante: 25 },
  { nome: "João Oliveira", disponivel: false, tempoRestante: 0 },
];

const servicosTotem = [
  { nome: "Corte Masculino", preco: 45 },
  { nome: "Corte + Barba", preco: 65 },
  { nome: "Barba", preco: 30 },
  { nome: "Corte Degradê", preco: 55 },
];

type Step = "inicio" | "barbeiro" | "servico" | "pagamento" | "confirmado";

export default function TotemView() {
  const [step, setStep] = useState<Step>("inicio");
  const [nomeCliente, setNomeCliente] = useState("");
  const [escolha, setEscolha] = useState({ barbeiro: "", servico: "", preco: 0 });

  const reset = () => {
    setStep("inicio");
    setNomeCliente("");
    setEscolha({ barbeiro: "", servico: "", preco: 0 });
  };

  const proximoDisponivel = () => {
    const disponiveis = barbeirosTotem
      .filter(b => b.disponivel)
      .sort((a, b) => a.tempoRestante - b.tempoRestante);
    return disponiveis[0];
  };

  const handleIniciar = () => {
    if (nomeCliente.trim().length < 2) return;
    setStep("barbeiro");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 relative">
      <ScreenNavigator />

      {/* Logo */}
      <button onClick={reset} className="mb-8">
        <img src={logo} alt="El Patron" className="h-20 object-contain" />
      </button>

      <motion.div
        key={step}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-lg"
      >
        {step === "inicio" && (
          <div className="space-y-6">
            <h1 className="text-3xl font-display font-bold text-foreground text-center">
              Iniciar Atendimento
            </h1>
            <p className="text-center text-muted-foreground font-body text-sm">
              Digite seu nome para começar
            </p>
            <Input
              type="text"
              placeholder="Seu nome completo"
              value={nomeCliente}
              onChange={(e) => setNomeCliente(e.target.value)}
              className="w-full py-6 text-center text-lg font-body"
              onKeyDown={(e) => e.key === "Enter" && handleIniciar()}
            />
            <button
              onClick={handleIniciar}
              disabled={nomeCliente.trim().length < 2}
              className="w-full py-5 rounded-xl bg-primary text-primary-foreground font-body text-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continuar
            </button>
          </div>
        )}

        {step === "barbeiro" && (
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground text-center mb-2">
              Olá, {nomeCliente}!
            </h2>
            <p className="text-center text-muted-foreground font-body text-sm mb-6">
              Como deseja ser atendido?
            </p>
            <div className="space-y-3">
              <button
                onClick={() => setStep("servico")}
                className="w-full py-6 rounded-xl bg-card border border-border text-foreground font-body text-lg font-semibold hover:border-accent/60 transition-colors flex items-center justify-center gap-3"
              >
                <UserCheck className="w-6 h-6 text-accent" />
                Escolher Barbeiro
              </button>
              <button
                onClick={() => {
                  const proximo = proximoDisponivel();
                  if (proximo) {
                    setEscolha({ ...escolha, barbeiro: proximo.nome });
                  }
                  setStep("servico");
                }}
                className="w-full py-6 rounded-xl bg-card border border-border text-foreground font-body text-lg font-semibold hover:border-accent/60 transition-colors flex flex-col items-center gap-2"
              >
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-accent" />
                  Próximo Disponível (FIFO)
                </div>
                {(() => {
                  const proximo = proximoDisponivel();
                  return proximo ? (
                    <span className="text-sm text-muted-foreground font-normal">
                      {proximo.nome} — termina em ~{proximo.tempoRestante} min
                    </span>
                  ) : null;
                })()}
              </button>
            </div>

            {/* Escolha de barbeiro específico */}
            <div className="mt-6">
              <p className="text-sm text-muted-foreground font-body mb-3 text-center">Ou escolha diretamente:</p>
              <div className="grid grid-cols-2 gap-3">
                {barbeirosTotem.filter(b => b.disponivel).map((b) => (
                  <button
                    key={b.nome}
                    onClick={() => {
                      setEscolha({ ...escolha, barbeiro: b.nome });
                      setStep("servico");
                    }}
                    className="py-6 rounded-xl bg-card border border-border text-foreground font-body font-semibold hover:border-accent/60 hover:bg-accent/5 transition-all"
                  >
                    <div className="w-12 h-12 rounded-full bg-accent/20 mx-auto mb-2 flex items-center justify-center text-accent font-display text-lg">
                      {b.nome.split(" ").map(n => n[0]).join("")}
                    </div>
                    <span className="text-sm">{b.nome}</span>
                    <span className="block text-xs text-muted-foreground mt-1">~{b.tempoRestante} min</span>
                  </button>
                ))}
              </div>
            </div>

            <button onClick={reset} className="w-full mt-4 py-3 text-muted-foreground font-body text-sm flex items-center justify-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Voltar
            </button>
          </div>
        )}

        {step === "servico" && (
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground text-center mb-6">
              Escolha o Serviço
            </h2>
            <div className="space-y-3">
              {servicosTotem.map((s) => (
                <button
                  key={s.nome}
                  onClick={() => {
                    setEscolha({ ...escolha, servico: s.nome, preco: s.preco });
                    setStep("pagamento");
                  }}
                  className="w-full py-5 px-6 rounded-xl bg-card border border-border text-left hover:border-accent/60 transition-colors flex items-center justify-between"
                >
                  <span className="text-foreground font-body text-lg font-semibold">{s.nome}</span>
                  <span className="text-accent font-display text-xl font-bold">R$ {s.preco}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setStep("barbeiro")} className="w-full mt-4 py-3 text-muted-foreground font-body text-sm flex items-center justify-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Voltar
            </button>
          </div>
        )}

        {step === "pagamento" && (
          <div className="text-center">
            <h2 className="text-2xl font-display font-bold text-foreground mb-6">Pagamento</h2>
            <div className="bg-card rounded-xl border border-border p-6 mb-6 text-left space-y-2">
              <div className="flex justify-between text-muted-foreground font-body text-sm">
                <span>Cliente</span><span className="text-foreground font-medium">{nomeCliente}</span>
              </div>
              <div className="flex justify-between text-muted-foreground font-body text-sm">
                <span>Barbeiro</span><span className="text-foreground font-medium">{escolha.barbeiro}</span>
              </div>
              <div className="flex justify-between text-muted-foreground font-body text-sm">
                <span>Serviço</span><span className="text-foreground font-medium">{escolha.servico}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-border mt-2">
                <span className="text-muted-foreground font-body">Total</span>
                <span className="text-2xl font-display font-bold text-accent">R$ {escolha.preco}</span>
              </div>
            </div>
            <button
              onClick={() => setStep("confirmado")}
              className="w-full py-5 rounded-xl bg-primary text-primary-foreground font-body text-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-3"
            >
              <CreditCard className="w-6 h-6" />
              Pagar
            </button>
            <button onClick={() => setStep("servico")} className="w-full mt-4 py-3 text-muted-foreground font-body text-sm flex items-center justify-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Voltar
            </button>
          </div>
        )}

        {step === "confirmado" && (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            </motion.div>
            <h2 className="text-3xl font-display font-bold text-foreground mb-2">Check-in Confirmado!</h2>
            <p className="text-muted-foreground font-body mb-1">{nomeCliente}</p>
            <p className="text-muted-foreground font-body mb-2">{escolha.servico} com {escolha.barbeiro}</p>
            <p className="text-muted-foreground/60 font-body text-sm mb-8">Aguarde ser chamado. Obrigado!</p>
            <button
              onClick={reset}
              className="px-8 py-3 rounded-xl border border-border text-foreground font-body font-medium hover:bg-accent/5 transition-colors"
            >
              Novo Atendimento
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
