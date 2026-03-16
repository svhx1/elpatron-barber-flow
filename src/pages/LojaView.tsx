// LojaView - Vitrine de produtos da barbearia para clientes
// Exibe ofertas/combos em destaque, seguidos de cortes e produtos
// Mostra apenas status Disponível/Indisponível (sem quantidade de estoque)
import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Tag, Scissors, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { ScreenNavigator } from "@/components/ScreenNavigator";

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  precoOriginal?: number;
  categoria: "combo" | "corte" | "produto";
  disponivel: boolean;
  imagem?: string;
}

const produtos: Produto[] = [
  // Combos / Ofertas em destaque
  { id: 1, nome: "Combo Premium", descricao: "Corte + Barba + Sobrancelha + Cerveja", preco: 75, precoOriginal: 105, categoria: "combo", disponivel: true },
  { id: 2, nome: "Combo Pai & Filho", descricao: "2 cortes masculinos com desconto", preco: 70, precoOriginal: 90, categoria: "combo", disponivel: true },
  { id: 3, nome: "Combo Barba Completa", descricao: "Barba + Hidratação + Gel Pós-Barba", preco: 55, precoOriginal: 72, categoria: "combo", disponivel: false },
  // Cortes / Serviços
  { id: 4, nome: "Corte Masculino", descricao: "Corte social ou moderno", preco: 45, categoria: "corte", disponivel: true },
  { id: 5, nome: "Corte Degradê", descricao: "Degradê low, mid ou high fade", preco: 55, categoria: "corte", disponivel: true },
  { id: 6, nome: "Barba", descricao: "Alinhamento e acabamento completo", preco: 30, categoria: "corte", disponivel: true },
  { id: 7, nome: "Sobrancelha", descricao: "Design e acabamento", preco: 15, categoria: "corte", disponivel: true },
  // Produtos
  { id: 8, nome: "Pomada Modeladora", descricao: "Fixação média, acabamento matte", preco: 35, categoria: "produto", disponivel: true },
  { id: 9, nome: "Óleo para Barba", descricao: "Hidratação e brilho natural", preco: 42, categoria: "produto", disponivel: true },
  { id: 10, nome: "Shampoo Profissional", descricao: "Para uso diário, 300ml", preco: 55, categoria: "produto", disponivel: false },
  { id: 11, nome: "Cera Capilar", descricao: "Fixação forte, efeito natural", preco: 28, categoria: "produto", disponivel: true },
  { id: 12, nome: "Spray Fixador", descricao: "Acabamento profissional duradouro", preco: 18, categoria: "produto", disponivel: true },
];

const tabs = ["Todos", "Ofertas", "Cortes", "Produtos"] as const;
type Tab = typeof tabs[number];

const tabFilter: Record<Tab, (p: Produto) => boolean> = {
  Todos: () => true,
  Ofertas: (p) => p.categoria === "combo",
  Cortes: (p) => p.categoria === "corte",
  Produtos: (p) => p.categoria === "produto",
};

const catIcon: Record<Produto["categoria"], typeof Tag> = {
  combo: Sparkles,
  corte: Scissors,
  produto: ShoppingBag,
};

export default function LojaView() {
  const [tab, setTab] = useState<Tab>("Todos");

  const filtered = produtos.filter(tabFilter[tab]);
  // Ordena: combos primeiro, depois cortes, depois produtos
  const sorted = [...filtered].sort((a, b) => {
    const order = { combo: 0, corte: 1, produto: 2 };
    return order[a.categoria] - order[b.categoria];
  });

  return (
    <div className="min-h-screen bg-background p-6 pb-20">
      <ScreenNavigator />
      <div className="max-w-4xl mx-auto">
        <PageHeader title="Loja" subtitle="Produtos, serviços e ofertas exclusivas" />

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-card rounded-lg p-1 border border-border w-fit">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-md text-sm font-body font-medium transition-colors ${
                tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Destaque de ofertas */}
        {(tab === "Todos" || tab === "Ofertas") && (
          <section className="mb-8">
            <h2 className="font-display text-lg font-semibold mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" /> Ofertas & Combos
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {produtos.filter((p) => p.categoria === "combo").map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`relative bg-card rounded-xl border p-5 transition-all ${
                    p.disponivel
                      ? "border-accent/30 hover:border-accent/60 hover:shadow-card"
                      : "border-border opacity-60"
                  }`}
                >
                  {p.precoOriginal && p.disponivel && (
                    <span className="absolute top-3 right-3 text-[10px] px-2 py-0.5 rounded-full bg-accent text-accent-foreground font-body font-bold">
                      -{Math.round(((p.precoOriginal - p.preco) / p.precoOriginal) * 100)}%
                    </span>
                  )}
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                    <Sparkles className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-display font-bold text-base">{p.nome}</h3>
                  <p className="text-xs text-muted-foreground font-body mt-1 mb-3">{p.descricao}</p>
                  <div className="flex items-end gap-2">
                    <span className="text-xl font-display font-bold text-accent">R$ {p.preco}</span>
                    {p.precoOriginal && (
                      <span className="text-sm text-muted-foreground line-through font-body">R$ {p.precoOriginal}</span>
                    )}
                  </div>
                  <span className={`inline-block mt-3 text-[10px] px-2 py-0.5 rounded-full font-body font-medium ${
                    p.disponivel ? "bg-green-500/10 text-green-600" : "bg-destructive/10 text-destructive"
                  }`}>
                    {p.disponivel ? "Disponível" : "Indisponível"}
                  </span>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Lista geral (cortes + produtos) */}
        {sorted.filter((p) => tab === "Todos" || tab === "Ofertas" ? p.categoria !== "combo" : true).length > 0 && (
          <section>
            {tab === "Todos" && (
              <h2 className="font-display text-lg font-semibold mb-3">Serviços & Produtos</h2>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {sorted
                .filter((p) => (tab === "Todos" || tab === "Ofertas" ? p.categoria !== "combo" : true))
                .map((p, i) => {
                  const Icon = catIcon[p.categoria];
                  return (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className={`bg-card rounded-lg border p-4 transition-all ${
                        p.disponivel
                          ? "border-border hover:border-accent/30 hover:shadow-card"
                          : "border-border opacity-60"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
                          <Icon className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-body font-medium ${
                          p.disponivel ? "bg-green-500/10 text-green-600" : "bg-destructive/10 text-destructive"
                        }`}>
                          {p.disponivel ? "Disponível" : "Indisponível"}
                        </span>
                      </div>
                      <h3 className="font-body font-semibold text-sm">{p.nome}</h3>
                      <p className="text-[11px] text-muted-foreground font-body mt-0.5 mb-2">{p.descricao}</p>
                      <span className="text-lg font-display font-bold text-accent">R$ {p.preco}</span>
                    </motion.div>
                  );
                })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
