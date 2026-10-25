import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export type DashboardMetric = {
  label: string;
  value: string;
  note: string;
  icon: LucideIcon;
  tint: string;
};

export function MetricCard({ metric }: { metric: DashboardMetric }) {
  const Icon = metric.icon;

  return (
    <Card className="gap-4 rounded-2xl border-border/70 shadow-none">
      <CardContent className="flex items-start justify-between gap-4 p-5">
        <div>
          <p className="text-sm text-muted-foreground">{metric.label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight">
            {metric.value}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">{metric.note}</p>
        </div>
        <div
          className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${metric.tint}`}
        >
          <Icon className="size-5" aria-hidden="true" />
        </div>
      </CardContent>
    </Card>
  );
}
