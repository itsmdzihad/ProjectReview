import Link from "next/link";
import { GraduationCap, MoveUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function LearningSnapshotCard({ activeDaysThisWeek, pendingSubmissions }: { activeDaysThisWeek: number; pendingSubmissions: number }) {
  return (
    <Card className="overflow-hidden rounded-2xl border-emerald-900/10 bg-emerald-950 text-white shadow-none dark:border-emerald-300/10">
      <CardContent className="relative p-6 sm:p-7">
        <div className="absolute -right-8 -top-12 size-44 rounded-full border border-emerald-100/10" />
        <div className="absolute -right-1 -top-5 size-32 rounded-full border border-emerald-100/10" />
        <div className="relative">
          <div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-200">
            <GraduationCap className="size-5" aria-hidden="true" />
          </div>
          <p className="text-sm font-medium text-emerald-100/70">Your learning at a glance</p>
          <h2 className="mt-2 max-w-xs text-2xl font-semibold tracking-tight">Keep moving through your courses.</h2>
          <p className="mt-3 max-w-sm text-sm leading-6 text-emerald-50/70">
            {activeDaysThisWeek > 0
              ? `You had course or project activity on ${activeDaysThisWeek} ${activeDaysThisWeek === 1 ? "day" : "days"} this week. ${pendingSubmissions} ${pendingSubmissions === 1 ? "project is" : "projects are"} awaiting mentor review.`
              : "No course or project activity has been recorded this week yet."}
          </p>
          <Link href="/student/courses/catalog" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-200 transition-colors hover:text-white">
            Find your next course <MoveUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
