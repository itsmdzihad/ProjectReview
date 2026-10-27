import type { DashboardActivityDay } from "@/services/user.services";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type WeeklyActivityEntry = DashboardActivityDay;

export function WeeklyActivityCard({ activity, totalEvents }: { activity: WeeklyActivityEntry[]; totalEvents: number }) {
  const maxEvents = Math.max(...activity.map((entry) => entry.count), 1);

  return (
    <Card className="rounded-2xl border-border/70 shadow-none">
      <CardHeader className="flex-row items-start justify-between gap-4">
        <div>
          <CardTitle className="text-base">Course and project activity</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">Enrollments and project submissions over the last 7 days</p>
        </div>
        <Badge variant="secondary" className="rounded-full">{totalEvents} {totalEvents === 1 ? "event" : "events"}</Badge>
      </CardHeader>
      <CardContent>
        <div className="flex h-48 items-end justify-between gap-3 pt-3" aria-label="Course enrollments and project submissions in the last seven days">
          {activity.map((entry) => (
            <div key={entry.day} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
              <span className="text-[11px] tabular-nums text-muted-foreground">{entry.count}</span>
              <div className="flex h-36 w-full items-end rounded-lg bg-muted/70 p-1">
                <div
                  className="w-full rounded-md bg-emerald-600 transition-[height] dark:bg-emerald-500"
                  style={{ height: `${entry.count > 0 ? Math.max((entry.count / maxEvents) * 100, 4) : 0}%` }}
                  title={`${entry.count} course or project ${entry.count === 1 ? "event" : "events"} on ${entry.day}`}
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
