import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users, Scissors, TrendingUp, Clock, Star,
  UserCheck, UserX, FileSpreadsheet, HelpCircle
} from "lucide-react";
import { Bar, BarChart, Line, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts";
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

const clientesLucroDia = [
  { dia: "Seg", clientes: 18, lucro: 720 },
  { dia: "Ter", clientes: 22, lucro: 880 },
  { dia: "Qua", clientes: 15, lucro: 600 },
  { dia: "Qui", clientes: 28, lucro: 1120 },
  { dia: "Sex", clientes: 35, lucro: 1400 },
  { dia: "Sáb", clientes: 42, lucro: 1680 },
  { dia: "Dom", clientes: 10, lucro: 400 },
];

const lucroVsFaturamento = [
  { mes: "Jan", faturamento: 12000, lucro: 4800 },
  { mes: "Fev", faturamento: 14500, lucro: 5800 },
  { mes: "Mar", faturamento: 13200, lucro: 5280 },
  { mes: "Abr", faturamento: 16000, lucro: 6400 },
  { mes: "Mai", faturamento: 18500, lucro: 7400 },
  { mes: "Jun", faturamento: 17000, lucro: 6800 },
];

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
            className="fixed inset-0 z-40 flex items-center justify-center bg-foreground/40 backdrop-blur-sm"
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
                className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-body text-sm font-medium hover:opacity-90 transition-opacity"
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

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Clientes do dia + Lucro */}
          <section className="bg-card rounded-lg border border-border p-5">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="font-display text-lg font-semibold">Clientes & Lucro por Dia</h2>
              <button className="text-accent hover:text-accent/80" title="Barras = clientes, Linha = lucro do dia">
                <HelpCircle className="w-4 h-4" />
              </button>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart data={clientesLucroDia}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="dia" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <YAxis yAxisId="left" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                  formatter={(value: number, name: string) => [
                    name === 'clientes' ? `${value} clientes` : `R$ ${value}`,
                    name === 'clientes' ? 'Clientes' : 'Lucro'
                  ]}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="clientes" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} name="Clientes" />
                <Line yAxisId="right" type="monotone" dataKey="lucro" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} name="Lucro (R$)" />
              </ComposedChart>
            </ResponsiveContainer>
          </section>

          {/* Lucro vs Faturamento */}
          <section className="bg-card rounded-lg border border-border p-5">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="font-display text-lg font-semibold">Lucro vs Faturamento</h2>
              <button className="text-accent hover:text-accent/80" title="Comparação mensal entre faturamento bruto e lucro líquido">
                <HelpCircle className="w-4 h-4" />
              </button>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={lucroVsFaturamento}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="mes" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                  formatter={(value: number, name: string) => [`R$ ${value.toLocaleString()}`, name === 'faturamento' ? 'Faturamento' : 'Lucro']}
                />
                <Legend />
                <Area type="monotone" dataKey="faturamento" fill="hsl(var(--accent) / 0.15)" stroke="hsl(var(--accent))" strokeWidth={2} name="Faturamento" />
                <Area type="monotone" dataKey="lucro" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth={2} name="Lucro" />
              </AreaChart>
            </ResponsiveContainer>
          </section>
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
              <button className="px-5 py-2 rounded-lg bg-primary text-primary-foreground font-body text-sm font-medium hover:opacity-90 transition-opacity">
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
