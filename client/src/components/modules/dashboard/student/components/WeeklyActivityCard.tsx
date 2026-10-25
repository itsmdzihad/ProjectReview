import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const weeklyActivity = [
  { day: "Mon", hours: 1.5 },
  { day: "Tue", hours: 2.25 },
  { day: "Wed", hours: 1.1 },
  { day: "Thu", hours: 3.2 },
  { day: "Fri", hours: 2.4 },
  { day: "Sat", hours: 3.8 },
  { day: "Sun", hours: 1.75 },
];

export function WeeklyActivityCard() {
  return (
    <Card className="rounded-2xl border-border/70 shadow-none">
      <CardHeader className="flex-row items-start justify-between gap-4">
        <div>
          <CardTitle className="text-base">Study activity</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">Your learning time over the last 7 days</p>
        </div>
        <Badge variant="secondary" className="rounded-full">16 hrs</Badge>
      </CardHeader>
      <CardContent>
        <div className="flex h-48 items-end justify-between gap-3 pt-3" aria-label="Weekly study hours bar chart">
          {weeklyActivity.map((entry) => (
            <div key={entry.day} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
              <span className="text-[11px] tabular-nums text-muted-foreground">{entry.hours}h</span>
              <div className="flex h-36 w-full items-end rounded-lg bg-muted/70 p-1">
                <div
                  className="w-full rounded-md bg-emerald-600 transition-[height] dark:bg-emerald-500"
                  style={{ height: `${(entry.hours / 4) * 100}%` }}
                  title={`${entry.hours} hours on ${entry.day}`}
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
