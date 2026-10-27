import { LoaderCircle } from "lucide-react";

export default function MentorProjectSubmissionsLoading() {
  return (
    <div className="space-y-8" aria-label="Loading project submissions" aria-busy="true">
      <header className="flex items-start gap-4">
        <div className="size-12 animate-pulse rounded-2xl bg-muted" />
        <div className="space-y-3">
          <div className="h-3 w-36 animate-pulse rounded bg-muted" />
          <div className="h-9 w-64 animate-pulse rounded bg-muted" />
          <div className="h-4 w-96 max-w-full animate-pulse rounded bg-muted" />
        </div>
      </header>
      <div className="flex min-h-52 flex-col items-center justify-center gap-3 rounded-2xl border border-border/70 bg-card text-sm text-muted-foreground" role="status">
        <LoaderCircle className="size-6 animate-spin text-emerald-600" aria-hidden="true" />
        Loading project submissions...
      </div>
    </div>
  );
}
