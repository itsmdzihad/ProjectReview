import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export type MentorMetric = {
  label: string;
  value: string;
  note: string;
  icon: LucideIcon;
  color: string;
};

export function MentorMetricCard({ metric }: { metric: MentorMetric }) {
  const Icon = metric.icon;

  return (
    <Card className="rounded-2xl border-border/70 shadow-none">
      <CardContent className="flex items-start justify-between gap-4 p-5">
        <div>
          <p className="text-sm text-muted-foreground">{metric.label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight tabular-nums">{metric.value}</p>
          <p className="mt-2 text-xs text-muted-foreground">{metric.note}</p>
        </div>
        <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${metric.color}`}>
          <Icon className="size-5" aria-hidden="true" />
        </span>
      </CardContent>
    </Card>
  );
}
