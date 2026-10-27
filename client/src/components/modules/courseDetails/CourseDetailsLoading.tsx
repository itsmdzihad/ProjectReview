export function CourseDetailsLoading() {
  return (
    <main aria-busy="true" className="mx-auto w-full max-w-7xl animate-pulse px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
      <p role="status" className="sr-only">Loading course details</p>
      <div className="mb-8 h-5 w-28 rounded bg-muted" />
      <header className="mb-10 max-w-4xl space-y-4">
        <div className="flex gap-2">
          <div className="h-6 w-24 rounded-full bg-muted" />
          <div className="h-6 w-28 rounded-full bg-muted" />
        </div>
        <div className="h-10 w-3/4 rounded bg-muted" />
        <div className="h-5 w-full max-w-3xl rounded bg-muted" />
        <div className="h-5 w-2/3 max-w-3xl rounded bg-muted" />
      </header>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">
        <div className="space-y-8">
          <div className="h-72 rounded-2xl border border-border/70 bg-card" />
          <div className="h-96 rounded-2xl border border-border/70 bg-card" />
        </div>
        <aside className="h-80 rounded-2xl border border-border/70 bg-card" />
      </div>
    </main>
  );
}
