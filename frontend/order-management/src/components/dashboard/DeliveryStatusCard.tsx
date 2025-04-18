import { Progress } from "../../components/ui/progress";
import { cn } from "../../lib/utils";

interface DeliveryStatusItemProps {
  label: string;
  value: number;
  color: string;
  count: number;
}

function DeliveryStatusItem({
  label,
  value,
  color,
  count,
}: DeliveryStatusItemProps) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <div className="flex items-center">
          <div
            className={`h-3 w-3 rounded-full mr-2`}
            style={{ backgroundColor: color }}
          ></div>
          <span>{label}</span>
        </div>
        <span className="font-medium">{value}%</span>
      </div>
      <Progress
        value={value}
        className={cn("h-2", `bg-[${color}]`)}
        // The Progress component doesn't accept indicatorClassName, so we need to use inline style
        style={
          {
            "--progress-foreground": color,
          } as React.CSSProperties
        }
      />
      <div className="text-xs text-muted-foreground text-right">
        {count.toLocaleString()} orders
      </div>
    </div>
  );
}

export function DeliveryStatusCard() {
  const statuses = [
    { label: "Delivered", value: 68, color: "#10b981", count: 5576 },
    { label: "Returned", value: 15, color: "#f97316", count: 1230 },
    { label: "At Delivery", value: 12, color: "#3b82f6", count: 984 },
    { label: "In Transit", value: 5, color: "#a855f7", count: 410 },
  ];

  return (
    <div className="space-y-4">
      {statuses.map((status) => (
        <DeliveryStatusItem
          key={status.label}
          label={status.label}
          value={status.value}
          color={status.color}
          count={status.count}
        />
      ))}
    </div>
  );
}
