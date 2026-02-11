import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: string; positive: boolean };
  variant?: "default" | "accent" | "success" | "warning" | "destructive";
}

const variantStyles = {
  default: "border-l-primary",
  accent: "border-l-accent",
  success: "border-l-success",
  warning: "border-l-warning",
  destructive: "border-l-destructive",
};

const iconVariantStyles = {
  default: "bg-primary/10 text-primary",
  accent: "bg-accent/10 text-accent",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  destructive: "bg-destructive/10 text-destructive",
};

export function StatCard({ title, value, subtitle, icon: Icon, trend, variant = "default" }: StatCardProps) {
  return (
    <div className={`stat-card border-l-4 ${variantStyles[variant]}`}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          {trend && (
            <p className={`text-xs font-medium ${trend.positive ? "text-success" : "text-destructive"}`}>
              {trend.positive ? "↑" : "↓"} {trend.value}
            </p>
          )}
        </div>
        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${iconVariantStyles[variant]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
