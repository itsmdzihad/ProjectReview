export default function EditMentorCourseLoading() {
  return (
    <div className="space-y-8" aria-label="Loading course editor">
      <div className="h-5 w-32 animate-pulse rounded bg-muted" />
      <div className="space-y-3">
        <div className="h-4 w-40 animate-pulse rounded bg-muted" />
        <div className="h-10 w-64 animate-pulse rounded bg-muted" />
        <div className="h-5 w-96 max-w-full animate-pulse rounded bg-muted" />
      </div>
      <div className="mx-auto h-[32rem] w-full max-w-4xl animate-pulse rounded-2xl bg-muted" />
    </div>
  );
}
