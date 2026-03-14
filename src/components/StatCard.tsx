import { type LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
}

export function StatCard({ title, value, icon: Icon, trend }: StatCardProps) {
  return (
    <div className="bg-card rounded-lg p-5 shadow-card border border-border animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-muted-foreground font-body">{title}</span>
        <div className="w-9 h-9 rounded-md bg-accent/20 flex items-center justify-center">
          <Icon className="w-4.5 h-4.5 text-accent" />
        </div>
      </div>
      <p className="text-2xl font-display font-bold text-foreground">{value}</p>
      {trend && (
        <span className="text-xs text-muted-foreground font-body mt-1 block">{trend}</span>
      )}
    </div>
  );
}
