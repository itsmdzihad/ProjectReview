import { MentorMetricCard, type MentorMetric } from "./MentorMetricCard";

export function MentorAnalyticsGrid({ metrics }: { metrics: MentorMetric[] }) {
  return (
    <section aria-label="Teaching analytics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => <MentorMetricCard key={metric.label} metric={metric} />)}
    </section>
  );
}
