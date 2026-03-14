import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users, Scissors, Calendar, TrendingUp, Clock, Star,
  UserCheck, UserX, AlertCircle, FileSpreadsheet, HelpCircle
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { ScreenNavigator } from "@/components/ScreenNavigator";

const barbeiros = [
  { nome: "Carlos Silva", status: "disponível", atendimentos: 8, fila: 2, avaliacao: 4.8 },
  { nome: "Rafael Santos", status: "atendendo", atendimentos: 6, fila: 3, avaliacao: 4.5 },
  { nome: "João Oliveira", status: "indisponível", atendimentos: 4, fila: 0, avaliacao: 4.9 },
  { nome: "Pedro Lima", status: "disponível", atendimentos: 7, fila: 1, avaliacao: 4.3 },
];

const logs = [
  { barbeiro: "Carlos Silva", data: "14/03/2026", horario: "08:00" },
  { barbeiro: "Rafael Santos", data: "14/03/2026", horario: "08:15" },
  { barbeiro: "Pedro Lima", data: "14/03/2026", horario: "09:00" },
];

const statusColor: Record<string, string> = {
  "disponível": "bg-green-500/10 text-green-600",
  "atendendo": "bg-accent/10 text-accent",
  "indisponível": "bg-destructive/10 text-destructive",
};

export default function AdminDashboard() {
  const [showTutorial, setShowTutorial] = useState(true);

  return (
    <div className="min-h-screen bg-background p-6 pb-20">
      <ScreenNavigator />
      <div className="max-w-6xl mx-auto">
        <PageHeader title="Painel Administrativo" subtitle="Gestão completa da barbearia" />

        {/* Tutorial Modal */}
        {showTutorial && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-charcoal/60 backdrop-blur-sm"
          >
            <div className="bg-background rounded-xl p-8 max-w-md w-full mx-4 shadow-elevated border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-accent" />
                </div>
                <h2 className="font-display text-xl font-bold">Bem-vindo, Admin!</h2>
              </div>
              <p className="text-sm text-muted-foreground font-body mb-2">
                Este é seu painel de controle. Aqui você pode:
              </p>
              <ul className="text-sm text-muted-foreground font-body space-y-1.5 mb-6 ml-4">
                <li>• Gerenciar barbeiros e seus status</li>
                <li>• Acompanhar métricas em tempo real</li>
                <li>• Consultar logs de acesso</li>
                <li>• Importar dados via Excel</li>
                <li>• Controlar estoque de produtos</li>
              </ul>
              <p className="text-xs text-muted-foreground mb-4">
                Use o botão <HelpCircle className="w-3 h-3 inline text-accent" /> para ver explicações em cada seção.
              </p>
              <button
                onClick={() => setShowTutorial(false)}
                className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-body text-sm font-medium hover:bg-charcoal-light transition-colors"
              >
                Entendido
              </button>
            </div>
          </motion.div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Barbeiros Ativos" value={3} icon={UserCheck} />
          <StatCard title="Indisponíveis" value={1} icon={UserX} />
          <StatCard title="Atendimentos Hoje" value={25} icon={Scissors} trend="+12% vs ontem" />
          <StatCard title="Faturamento" value="R$ 1.850" icon={TrendingUp} trend="+8% vs ontem" />
        </div>

        {/* Barbeiros */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="font-display text-lg font-semibold">Barbeiros</h2>
            <button className="text-accent hover:text-accent/80" title="Gerenciar barbeiros, ver status e métricas individuais">
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {barbeiros.map((b) => (
              <div key={b.nome} className="bg-card rounded-lg p-4 border border-border flex items-center justify-between animate-fade-in">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-sm">
                    {b.nome.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-body font-medium text-sm">{b.nome}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-body ${statusColor[b.status]}`}>
                        {b.status}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                        <Star className="w-3 h-3 text-accent" /> {b.avaliacao}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-display font-bold">{b.atendimentos}</p>
                  <p className="text-xs text-muted-foreground">atendimentos</p>
                  {b.fila > 0 && (
                    <p className="text-xs text-accent mt-0.5">Fila: {b.fila}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Logs */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="font-display text-lg font-semibold">Logs de Acesso</h2>
              <button className="text-accent hover:text-accent/80" title="Registro de login dos barbeiros">
                <HelpCircle className="w-4 h-4" />
              </button>
            </div>
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <table className="w-full text-sm font-body">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left p-3 text-muted-foreground font-medium">Barbeiro</th>
                    <th className="text-left p-3 text-muted-foreground font-medium">Data</th>
                    <th className="text-left p-3 text-muted-foreground font-medium">Horário</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((l, i) => (
                    <tr key={i} className="border-b border-border last:border-0">
                      <td className="p-3">{l.barbeiro}</td>
                      <td className="p-3 text-muted-foreground">{l.data}</td>
                      <td className="p-3 text-muted-foreground">{l.horario}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Import */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="font-display text-lg font-semibold">Importar Dados</h2>
              <button className="text-accent hover:text-accent/80" title="Importe planilhas Excel para cadastrar dados em massa">
                <HelpCircle className="w-4 h-4" />
              </button>
            </div>
            <div className="bg-card rounded-lg border border-border border-dashed p-8 text-center">
              <FileSpreadsheet className="w-10 h-10 text-accent mx-auto mb-3" />
              <p className="font-body text-sm text-muted-foreground mb-1">
                Arraste uma planilha Excel ou clique para selecionar
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                Formatos aceitos: .xlsx, .xls
              </p>
              <button className="px-5 py-2 rounded-lg bg-primary text-primary-foreground font-body text-sm font-medium hover:bg-charcoal-light transition-colors">
                Selecionar Arquivo
              </button>
            </div>
          </section>
        </div>

        {/* Agendamentos do dia */}
        <section className="mt-8">
          <h2 className="font-display text-lg font-semibold mb-4">Agendamentos Hoje</h2>
          <div className="space-y-2">
            {[
              { hora: "09:00", cliente: "Marcos Pereira", barbeiro: "Carlos Silva", servico: "Corte + Barba", status: "concluído" },
              { hora: "10:00", cliente: "Lucas Mendes", barbeiro: "Rafael Santos", servico: "Corte Degradê", status: "em andamento" },
              { hora: "11:00", cliente: "André Costa", barbeiro: "Carlos Silva", servico: "Barba", status: "agendado" },
              { hora: "14:00", cliente: "Fernando Souza", barbeiro: "Pedro Lima", servico: "Corte Social", status: "agendado" },
            ].map((a, i) => (
              <div key={i} className="bg-card rounded-lg p-4 border border-border flex items-center justify-between animate-fade-in">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-body font-semibold text-accent w-12">{a.hora}</span>
                  <div>
                    <p className="font-body font-medium text-sm">{a.cliente}</p>
                    <p className="text-xs text-muted-foreground">{a.servico} • {a.barbeiro}</p>
                  </div>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-body ${
                  a.status === "concluído" ? "bg-green-500/10 text-green-600" :
                  a.status === "em andamento" ? "bg-accent/10 text-accent" :
                  "bg-muted text-muted-foreground"
                }`}>
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
