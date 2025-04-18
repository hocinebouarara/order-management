import { cn } from "../../lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    positive: boolean;
  };
  className?: string;
}

export function StatsCard({
  title,
  value,
  icon,
  description,
  trend,
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card p-5 shadow-sm transition-all hover:shadow-md",
        className
      )}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
      </div>

      {trend && (
        <div className="mt-3 flex items-center">
          <span
            className={cn(
              "text-xs font-medium inline-flex items-center",
              trend.positive
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            )}
          >
            <span className="mr-1">{trend.positive ? "↑" : "↓"}</span>
            {trend.value}%
          </span>
          <span className="text-xs text-muted-foreground ml-1">
            vs last week
          </span>
        </div>
      )}
    </div>
  );
}
