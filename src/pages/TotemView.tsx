import { useState } from "react";
import { motion } from "framer-motion";
import { UserCheck, Users, CreditCard, CheckCircle } from "lucide-react";
import logo from "@/assets/logo-el-patron.jpeg";
import { ScreenNavigator } from "@/components/ScreenNavigator";

const barbeirosTotem = [
  { nome: "Carlos Silva", disponivel: true },
  { nome: "Rafael Santos", disponivel: true },
  { nome: "Pedro Lima", disponivel: true },
  { nome: "João Oliveira", disponivel: false },
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
  const [escolha, setEscolha] = useState({ barbeiro: "", servico: "", preco: 0 });

  const reset = () => {
    setStep("inicio");
    setEscolha({ barbeiro: "", servico: "", preco: 0 });
  };

  return (
    <div className="min-h-screen bg-charcoal flex flex-col items-center justify-center p-8 relative">
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
          <div className="space-y-4">
            <h1 className="text-3xl font-display font-bold text-gold text-center mb-8">
              Bem-vindo!
            </h1>
            <button
              onClick={() => setStep("barbeiro")}
              className="w-full py-6 rounded-xl bg-charcoal-light border border-gold/30 text-gold font-display text-xl font-semibold hover:border-gold/60 transition-colors flex items-center justify-center gap-3"
            >
              <UserCheck className="w-6 h-6" />
              Escolher Barbeiro
            </button>
            <button
              onClick={() => {
                setEscolha({ ...escolha, barbeiro: "Próximo Disponível (FIFO)" });
                setStep("servico");
              }}
              className="w-full py-6 rounded-xl bg-charcoal-light border border-gold/30 text-gold font-display text-xl font-semibold hover:border-gold/60 transition-colors flex items-center justify-center gap-3"
            >
              <Users className="w-6 h-6" />
              Fila — Próximo Disponível
            </button>
          </div>
        )}

        {step === "barbeiro" && (
          <div>
            <h2 className="text-2xl font-display font-bold text-gold text-center mb-6">
              Escolha seu Barbeiro
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {barbeirosTotem.filter(b => b.disponivel).map((b) => (
                <button
                  key={b.nome}
                  onClick={() => {
                    setEscolha({ ...escolha, barbeiro: b.nome });
                    setStep("servico");
                  }}
                  className="py-8 rounded-xl bg-charcoal-light border border-gold/30 text-gold font-display text-lg font-semibold hover:border-gold/60 hover:bg-gold/5 transition-all"
                >
                  <div className="w-14 h-14 rounded-full bg-gold/20 mx-auto mb-3 flex items-center justify-center text-xl">
                    {b.nome.split(" ").map(n => n[0]).join("")}
                  </div>
                  {b.nome}
                </button>
              ))}
            </div>
            <button onClick={reset} className="w-full mt-4 py-3 text-gold/50 font-body text-sm">
              ← Voltar
            </button>
          </div>
        )}

        {step === "servico" && (
          <div>
            <h2 className="text-2xl font-display font-bold text-gold text-center mb-6">
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
                  className="w-full py-5 px-6 rounded-xl bg-charcoal-light border border-gold/30 text-left hover:border-gold/60 transition-colors flex items-center justify-between"
                >
                  <span className="text-gold font-display text-lg font-semibold">{s.nome}</span>
                  <span className="text-gold-light font-display text-xl font-bold">R$ {s.preco}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setStep("barbeiro")} className="w-full mt-4 py-3 text-gold/50 font-body text-sm">
              ← Voltar
            </button>
          </div>
        )}

        {step === "pagamento" && (
          <div className="text-center">
            <h2 className="text-2xl font-display font-bold text-gold mb-6">Pagamento</h2>
            <div className="bg-charcoal-light rounded-xl border border-gold/20 p-6 mb-6 text-left space-y-2">
              <div className="flex justify-between text-gold/70 font-body text-sm">
                <span>Barbeiro</span><span className="text-gold">{escolha.barbeiro}</span>
              </div>
              <div className="flex justify-between text-gold/70 font-body text-sm">
                <span>Serviço</span><span className="text-gold">{escolha.servico}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gold/10 mt-2">
                <span className="text-gold/70 font-body">Total</span>
                <span className="text-2xl font-display font-bold text-gold">R$ {escolha.preco}</span>
              </div>
            </div>
            <button
              onClick={() => setStep("confirmado")}
              className="w-full py-5 rounded-xl gold-gradient text-charcoal font-display text-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-3"
            >
              <CreditCard className="w-6 h-6" />
              Pagar
            </button>
            <button onClick={() => setStep("servico")} className="w-full mt-4 py-3 text-gold/50 font-body text-sm">
              ← Voltar
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
            <h2 className="text-3xl font-display font-bold text-gold mb-2">Check-in Confirmado!</h2>
            <p className="text-gold/60 font-body mb-2">{escolha.servico} com {escolha.barbeiro}</p>
            <p className="text-gold/40 font-body text-sm mb-8">Aguarde ser chamado. Obrigado!</p>
            <button
              onClick={reset}
              className="px-8 py-3 rounded-xl border border-gold/30 text-gold font-body font-medium hover:bg-gold/5 transition-colors"
            >
              Novo Atendimento
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
