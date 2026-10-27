"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, PlusCircle, RotateCw, Search } from "lucide-react";
import { useCallback, useEffect, useState, useTransition } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { deleteCourseAction, getMyCoursesAction } from "@/actions/course.actions";
import { toMentorCourse } from "@/lib/mentor-course-presentation";
import { useMentorCourses } from "@/hooks/use-mentor-courses";
import type { MentorCourse } from "@/types/mentorCourse";
import { toast } from "sonner";
import { MentorCourseCard } from "./MentorCourseCard";

const PAGE_SIZE = 10;

export function MentorCourseLibrary() {
  const [mentorCourses, setMentorCourses] = useState<MentorCourse[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, startDelete] = useTransition();
  const { removeCourse } = useMentorCourses();

  const loadCourses = useCallback(async (targetPage: number, search: string) => {
    const result = await getMyCoursesAction({ page: targetPage, limit: PAGE_SIZE, search });
    if (result.error) {
      setError(result.error.message);
    } else {
      setMentorCourses(result.data.map(toMentorCourse));
      setHasNextPage(result.data.length === PAGE_SIZE);
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    let active = true;
    void getMyCoursesAction({ page, limit: PAGE_SIZE, search: appliedSearch }).then((result) => {
      if (!active) return;
      if (result.error) {
        setError(result.error.message);
      } else {
        setMentorCourses(result.data.map(toMentorCourse));
        setHasNextPage(result.data.length === PAGE_SIZE);
      }
      setIsReady(true);
    });
    return () => { active = false; };
  }, [page, appliedSearch]);

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextSearch = searchInput.trim();
    if (nextSearch === appliedSearch && page === 1) {
      setIsReady(false);
      setError(null);
      void loadCourses(1, nextSearch);
      return;
    }
    setIsReady(false);
    setError(null);
    setPage(1);
    setAppliedSearch(nextSearch);
  };

  const handleDelete = (course: MentorCourse) => {
    if (!window.confirm(`Delete “${course.title}”? This cannot be undone.`)) return;
    const toastId = toast.loading("Deleting course...");
    startDelete(async () => {
      const result = await deleteCourseAction(course.id);
      if (result.error) {
        toast.error(result.error.message, { id: toastId });
        return;
      }
      removeCourse(course.id);
      if (mentorCourses.length === 1 && page > 1) setPage((current) => current - 1);
      else setMentorCourses((current) => current.filter((item) => item.id !== course.id));
      toast.success("Course deleted.", { id: toastId });
    });
  };

  if (!isReady) {
    return <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"><div className="h-80 animate-pulse rounded-2xl bg-muted" /><div className="h-80 animate-pulse rounded-2xl bg-muted" /></div>;
  }

  if (error) {
    return (
      <Card className="rounded-2xl border-border/70 shadow-none">
        <CardContent className="flex flex-col items-center px-6 py-12 text-center">
          <p className="text-sm text-destructive">{error}</p>
          <Button variant="outline" className="mt-4 rounded-full" onClick={() => { setIsReady(false); setError(null); void loadCourses(page, appliedSearch); }}>
            <RotateCw className="size-4" aria-hidden="true" /> Try again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (mentorCourses.length === 0 && !appliedSearch && page === 1) {
    return (
      <Card className="rounded-2xl border-border/70 shadow-none">
        <CardContent className="flex flex-col items-center px-6 py-14 text-center">
          <h2 className="text-lg font-semibold">No courses yet</h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">Your drafts and published courses will appear here. Published courses are shown in the student catalog.</p>
          <Link href="/mentor/courses/create" className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500">
            <PlusCircle className="size-4" aria-hidden="true" /> Create your first course
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-5">
      <form onSubmit={submitSearch} className="flex w-full max-w-xl gap-2" role="search">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input value={searchInput} onChange={(event) => setSearchInput(event.target.value)} placeholder="Search your courses" aria-label="Search your courses" className="h-10 rounded-full pl-9" />
        </div>
        <Button type="submit" variant="outline" className="rounded-full">Search</Button>
      </form>

      {mentorCourses.length === 0 ? (
        <Card className="rounded-2xl border-border/70 shadow-none">
          <CardContent className="px-6 py-10 text-center">
            <h2 className="font-semibold">No matching courses</h2>
            <p className="mt-2 text-sm text-muted-foreground">Try another title or clear your search.</p>
            <Button variant="ghost" className="mt-2" onClick={() => { setIsReady(false); setError(null); setSearchInput(""); setAppliedSearch(""); setPage(1); }}>Clear search</Button>
          </CardContent>
        </Card>
      ) : (
        <section aria-label="Courses you created" className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {mentorCourses.map((course) => <MentorCourseCard key={course.id} course={course} onDelete={handleDelete} isDeleting={isDeleting} />)}
        </section>
      )}

      {(page > 1 || hasNextPage) && (
        <nav aria-label="Course pages" className="flex items-center justify-center gap-3">
          <Button variant="outline" className="rounded-full" disabled={page === 1 || !isReady} onClick={() => { setIsReady(false); setPage((current) => Math.max(1, current - 1)); }}>
            <ChevronLeft className="size-4" aria-hidden="true" /> Previous
          </Button>
          <span className="text-sm text-muted-foreground">Page {page}</span>
          <Button variant="outline" className="rounded-full" disabled={!hasNextPage || !isReady} onClick={() => { setIsReady(false); setPage((current) => current + 1); }}>
            Next <ChevronRight className="size-4" aria-hidden="true" />
          </Button>
        </nav>
      )}
    </div>
  );
}
