import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Minus, Search, Edit2, Trash2, Save, X, Package,
  AlertTriangle, Filter
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { ScreenNavigator } from "@/components/ScreenNavigator";

interface ItemEstoque {
  id: number;
  nome: string;
  categoria: string;
  quantidade: number;
  minimo: number;
  preco: number;
  unidade: string;
}

const categoriasDefault = ["Todos", "Cabelo", "Barba", "Higiene", "Acessórios", "Bebidas"];

const estoquePadrao: ItemEstoque[] = [
  { id: 1, nome: "Pomada Modeladora", categoria: "Cabelo", quantidade: 12, minimo: 5, preco: 35, unidade: "un" },
  { id: 2, nome: "Óleo para Barba", categoria: "Barba", quantidade: 8, minimo: 3, preco: 42, unidade: "un" },
  { id: 3, nome: "Cera Capilar", categoria: "Cabelo", quantidade: 3, minimo: 5, preco: 28, unidade: "un" },
  { id: 4, nome: "Shampoo Profissional", categoria: "Higiene", quantidade: 15, minimo: 4, preco: 55, unidade: "un" },
  { id: 5, nome: "Lâminas Descartáveis", categoria: "Acessórios", quantidade: 2, minimo: 10, preco: 0.5, unidade: "cx" },
  { id: 6, nome: "Toalhas Descartáveis", categoria: "Higiene", quantidade: 50, minimo: 20, preco: 0.3, unidade: "pct" },
  { id: 7, nome: "Gel Pós-Barba", categoria: "Barba", quantidade: 6, minimo: 3, preco: 22, unidade: "un" },
  { id: 8, nome: "Cerveja Artesanal", categoria: "Bebidas", quantidade: 24, minimo: 12, preco: 12, unidade: "un" },
  { id: 9, nome: "Spray Fixador", categoria: "Cabelo", quantidade: 4, minimo: 5, preco: 18, unidade: "un" },
  { id: 10, nome: "Pente de Corte", categoria: "Acessórios", quantidade: 7, minimo: 3, preco: 8, unidade: "un" },
];

export default function EstoqueView() {
  const [items, setItems] = useState<ItemEstoque[]>(estoquePadrao);
  const [busca, setBusca] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todos");
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<ItemEstoque | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [novoItem, setNovoItem] = useState<Omit<ItemEstoque, "id">>({
    nome: "", categoria: "Cabelo", quantidade: 0, minimo: 1, preco: 0, unidade: "un"
  });

  const nextId = () => Math.max(...items.map(i => i.id), 0) + 1;

  const filtrados = items.filter((item) => {
    const matchBusca = item.nome.toLowerCase().includes(busca.toLowerCase());
    const matchCat = categoriaFiltro === "Todos" || item.categoria === categoriaFiltro;
    return matchBusca && matchCat;
  });

  const lowStockCount = items.filter(i => i.quantidade <= i.minimo).length;

  const ajustarQtd = (id: number, delta: number) => {
    setItems(prev => prev.map(i =>
      i.id === id ? { ...i, quantidade: Math.max(0, i.quantidade + delta) } : i
    ));
  };

  const startEdit = (item: ItemEstoque) => {
    setEditandoId(item.id);
    setEditForm({ ...item });
  };

  const saveEdit = () => {
    if (!editForm) return;
    setItems(prev => prev.map(i => i.id === editForm.id ? editForm : i));
    setEditandoId(null);
    setEditForm(null);
  };

  const deleteItem = (id: number) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const addItem = () => {
    if (!novoItem.nome.trim()) return;
    setItems(prev => [...prev, { ...novoItem, id: nextId() }]);
    setNovoItem({ nome: "", categoria: "Cabelo", quantidade: 0, minimo: 1, preco: 0, unidade: "un" });
    setShowAdd(false);
  };

  return (
    <div className="min-h-screen bg-background p-6 pb-20">
      <ScreenNavigator />
      <div className="max-w-5xl mx-auto">
        <PageHeader title="Controle de Estoque" subtitle="Gerencie produtos e insumos" />

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-card rounded-lg p-4 border border-border text-center">
            <p className="text-2xl font-display font-bold">{items.length}</p>
            <p className="text-xs text-muted-foreground font-body">Itens cadastrados</p>
          </div>
          <div className="bg-card rounded-lg p-4 border border-border text-center">
            <p className="text-2xl font-display font-bold">
              R$ {items.reduce((s, i) => s + i.preco * i.quantidade, 0).toFixed(0)}
            </p>
            <p className="text-xs text-muted-foreground font-body">Valor em estoque</p>
          </div>
          <div className={`rounded-lg p-4 border text-center ${lowStockCount > 0 ? "bg-destructive/5 border-destructive/20" : "bg-card border-border"}`}>
            <p className={`text-2xl font-display font-bold ${lowStockCount > 0 ? "text-destructive" : ""}`}>
              {lowStockCount}
            </p>
            <p className="text-xs text-muted-foreground font-body">Estoque baixo</p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar produto..."
              value={busca}
              onChange={e => setBusca(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-card border border-border text-sm font-body focus:outline-none focus:border-accent/40"
            />
          </div>
          <div className="flex gap-1 overflow-x-auto">
            {categoriasDefault.map(cat => (
              <button
                key={cat}
                onClick={() => setCategoriaFiltro(cat)}
                className={`px-3 py-2 rounded-lg text-xs font-body font-medium whitespace-nowrap transition-colors ${
                  categoriaFiltro === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="px-4 py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-body font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Adicionar
          </button>
        </div>

        {/* Add Form */}
        <AnimatePresence>
          {showAdd && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-4"
            >
              <div className="bg-card rounded-lg border border-accent/30 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display font-semibold text-sm">Novo Produto</h3>
                  <button onClick={() => setShowAdd(false)}><X className="w-4 h-4 text-muted-foreground" /></button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <input
                    placeholder="Nome do produto"
                    value={novoItem.nome}
                    onChange={e => setNovoItem({ ...novoItem, nome: e.target.value })}
                    className="col-span-2 px-3 py-2 rounded-md border border-border bg-background text-sm font-body focus:outline-none focus:border-accent/40"
                  />
                  <select
                    value={novoItem.categoria}
                    onChange={e => setNovoItem({ ...novoItem, categoria: e.target.value })}
                    className="px-3 py-2 rounded-md border border-border bg-background text-sm font-body focus:outline-none"
                  >
                    {categoriasDefault.filter(c => c !== "Todos").map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <select
                    value={novoItem.unidade}
                    onChange={e => setNovoItem({ ...novoItem, unidade: e.target.value })}
                    className="px-3 py-2 rounded-md border border-border bg-background text-sm font-body focus:outline-none"
                  >
                    <option value="un">Unidade</option>
                    <option value="cx">Caixa</option>
                    <option value="pct">Pacote</option>
                    <option value="lt">Litro</option>
                  </select>
                  <input
                    type="number" placeholder="Qtd" min={0}
                    value={novoItem.quantidade || ""}
                    onChange={e => setNovoItem({ ...novoItem, quantidade: +e.target.value })}
                    className="px-3 py-2 rounded-md border border-border bg-background text-sm font-body focus:outline-none"
                  />
                  <input
                    type="number" placeholder="Mínimo" min={0}
                    value={novoItem.minimo || ""}
                    onChange={e => setNovoItem({ ...novoItem, minimo: +e.target.value })}
                    className="px-3 py-2 rounded-md border border-border bg-background text-sm font-body focus:outline-none"
                  />
                  <input
                    type="number" placeholder="Preço (R$)" min={0} step={0.01}
                    value={novoItem.preco || ""}
                    onChange={e => setNovoItem({ ...novoItem, preco: +e.target.value })}
                    className="px-3 py-2 rounded-md border border-border bg-background text-sm font-body focus:outline-none"
                  />
                  <button
                    onClick={addItem}
                    className="px-4 py-2 rounded-md bg-accent text-accent-foreground text-sm font-body font-medium hover:opacity-90 transition-opacity"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Items list */}
        <div className="space-y-2">
          {filtrados.map((item) => {
            const isLow = item.quantidade <= item.minimo;
            const isEditing = editandoId === item.id;

            return (
              <motion.div
                key={item.id}
                layout
                className={`bg-card rounded-lg p-4 border flex items-center gap-4 animate-fade-in ${
                  isLow ? "border-destructive/30" : "border-border"
                }`}
              >
                {isEditing && editForm ? (
                  <>
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-2">
                      <input
                        value={editForm.nome}
                        onChange={e => setEditForm({ ...editForm, nome: e.target.value })}
                        className="col-span-2 px-2 py-1.5 rounded border border-border bg-background text-sm font-body"
                      />
                      <select
                        value={editForm.categoria}
                        onChange={e => setEditForm({ ...editForm, categoria: e.target.value })}
                        className="px-2 py-1.5 rounded border border-border bg-background text-sm font-body"
                      >
                        {categoriasDefault.filter(c => c !== "Todos").map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      <input
                        type="number" value={editForm.preco} step={0.01}
                        onChange={e => setEditForm({ ...editForm, preco: +e.target.value })}
                        className="px-2 py-1.5 rounded border border-border bg-background text-sm font-body"
                      />
                      <input
                        type="number" value={editForm.quantidade}
                        onChange={e => setEditForm({ ...editForm, quantidade: +e.target.value })}
                        className="px-2 py-1.5 rounded border border-border bg-background text-sm font-body"
                        placeholder="Qtd"
                      />
                      <input
                        type="number" value={editForm.minimo}
                        onChange={e => setEditForm({ ...editForm, minimo: +e.target.value })}
                        className="px-2 py-1.5 rounded border border-border bg-background text-sm font-body"
                        placeholder="Mín"
                      />
                    </div>
                    <div className="flex gap-1">
                      <button onClick={saveEdit} className="p-2 rounded-md hover:bg-green-500/10 text-green-600"><Save className="w-4 h-4" /></button>
                      <button onClick={() => { setEditandoId(null); setEditForm(null); }} className="p-2 rounded-md hover:bg-muted text-muted-foreground"><X className="w-4 h-4" /></button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-body font-medium text-sm truncate">{item.nome}</p>
                        {isLow && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-destructive/10 text-destructive font-body flex items-center gap-0.5 shrink-0">
                            <AlertTriangle className="w-2.5 h-2.5" /> Estoque Baixo
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {item.categoria} • R$ {item.preco.toFixed(2)}/{item.unidade} • Mín: {item.minimo}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => ajustarQtd(item.id, -1)}
                        className="w-8 h-8 rounded-md border border-border flex items-center justify-center hover:bg-destructive/10 hover:border-destructive/30 hover:text-destructive transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className={`w-10 text-center font-body font-semibold text-sm ${isLow ? "text-destructive" : ""}`}>
                        {item.quantidade}
                      </span>
                      <button
                        onClick={() => ajustarQtd(item.id, 1)}
                        className="w-8 h-8 rounded-md border border-border flex items-center justify-center hover:bg-green-500/10 hover:border-green-500/30 hover:text-green-600 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex gap-1">
                      <button onClick={() => startEdit(item)} className="p-2 rounded-md hover:bg-accent/10 text-muted-foreground hover:text-accent"><Edit2 className="w-3.5 h-3.5" /></button>
                      <button onClick={() => deleteItem(item.id)} className="p-2 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}

          {filtrados.length === 0 && (
            <div className="text-center py-12 text-muted-foreground font-body">
              <Package className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">Nenhum item encontrado</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
