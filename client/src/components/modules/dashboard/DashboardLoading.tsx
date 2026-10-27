export function DashboardLoading() {
  return (
    <div className="flex min-h-svh animate-pulse bg-background">
      <aside className="hidden w-72 shrink-0 border-r border-border/70 p-4 md:block">
        <div className="mb-8 h-11 rounded-xl bg-muted" />
        <div className="space-y-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="h-9 rounded-lg bg-muted/80" />
          ))}
        </div>
      </aside>
      <div className="min-w-0 flex-1">
        <header className="flex h-12 items-center gap-3 border-b border-border/70 px-5">
          <div className="size-7 rounded-md bg-muted" />
          <div className="h-4 w-40 rounded bg-muted" />
        </header>
        <main className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
          <div className="h-8 w-56 rounded bg-muted" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }, (_, index) => (
              <div key={index} className="h-44 rounded-2xl border border-border/70 bg-card" />
            ))}
          </div>
          <div className="h-72 rounded-2xl border border-border/70 bg-card" />
        </main>
      </div>
    </div>
  );
}
