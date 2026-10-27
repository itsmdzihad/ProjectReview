import { LoaderCircle } from "lucide-react";

export default function CoursesLoading() {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-8 px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12" aria-label="Loading course catalog" aria-busy="true">
      <header className="space-y-4">
        <div className="h-4 w-28 animate-pulse rounded bg-muted" />
        <div className="flex items-start gap-4">
          <div className="size-12 animate-pulse rounded-2xl bg-muted" />
          <div className="space-y-3">
            <div className="h-3 w-32 animate-pulse rounded bg-muted" />
            <div className="h-9 w-56 animate-pulse rounded bg-muted" />
            <div className="h-4 w-96 max-w-full animate-pulse rounded bg-muted" />
          </div>
        </div>
      </header>
      <div className="flex min-h-40 items-center justify-center gap-3 rounded-2xl border border-border/70 bg-card text-sm text-muted-foreground" role="status">
        <LoaderCircle className="size-5 animate-spin text-emerald-600" aria-hidden="true" /> Loading published courses...
      </div>
    </main>
  );
}
