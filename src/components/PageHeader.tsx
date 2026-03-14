import { LogoHome } from "./LogoHome";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header className="flex items-center gap-4 mb-8">
      <LogoHome />
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">{title}</h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground font-body">{subtitle}</p>
        )}
      </div>
    </header>
  );
}
