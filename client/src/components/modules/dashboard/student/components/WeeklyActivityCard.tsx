import type { DailyActivity } from "@/hooks/use-student-dashboard-stats";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type WeeklyActivityEntry = DailyActivity;

export function WeeklyActivityCard({ activity, totalSteps }: { activity: WeeklyActivityEntry[]; totalSteps: number }) {
  const maxSteps = Math.max(...activity.map((entry) => entry.steps), 1);

  return (
    <Card className="rounded-2xl border-border/70 shadow-none">
      <CardHeader className="flex-row items-start justify-between gap-4">
        <div>
          <CardTitle className="text-base">Learning activity</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">Learning steps advanced over the last 7 days</p>
        </div>
        <Badge variant="secondary" className="rounded-full">{totalSteps} {totalSteps === 1 ? "step" : "steps"}</Badge>
      </CardHeader>
      <CardContent>
        <div className="flex h-48 items-end justify-between gap-3 pt-3" aria-label="Learning steps advanced in the last seven days">
          {activity.map((entry) => (
            <div key={entry.day} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
              <span className="text-[11px] tabular-nums text-muted-foreground">{entry.steps}</span>
              <div className="flex h-36 w-full items-end rounded-lg bg-muted/70 p-1">
                <div
                  className="w-full rounded-md bg-emerald-600 transition-[height] dark:bg-emerald-500"
                  style={{ height: `${entry.steps > 0 ? Math.max((entry.steps / maxSteps) * 100, 4) : 0}%` }}
                  title={`${entry.steps} learning ${entry.steps === 1 ? "step" : "steps"} on ${entry.day}`}
                />
              </div>
              <span className="text-xs text-muted-foreground">{entry.day}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
