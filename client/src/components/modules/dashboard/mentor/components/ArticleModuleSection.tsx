export function ArticleModuleSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border/70 bg-card p-5 sm:p-7">
      <h2 className="font-semibold">Article module</h2>
      <p className="mt-1 text-sm leading-6 text-muted-foreground">Add one article title per line. You can add lesson text below, in the same order, separating each lesson with a line containing three dashes.</p>
      <div className="mt-4">{children}</div>
    </section>
  );
}
