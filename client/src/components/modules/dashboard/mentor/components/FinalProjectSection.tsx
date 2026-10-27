export function FinalProjectSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border/70 bg-card p-5 sm:p-7">
      <h2 className="font-semibold">Final project</h2>
      <p className="mt-1 text-sm leading-6 text-muted-foreground">Define the project students will submit when they complete the course.</p>
      <div className="mt-5 grid gap-5">{children}</div>
    </section>
  );
}
