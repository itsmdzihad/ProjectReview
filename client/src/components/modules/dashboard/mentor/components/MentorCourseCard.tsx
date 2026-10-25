import { BookOpenText, CalendarDays, Clock3, FolderKanban } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { MentorCourse } from "@/types/mentorCourse";

export function MentorCourseCard({ course }: { course: MentorCourse }) {
  return (
    <Card className="group overflow-hidden rounded-2xl border-border/70 p-0 shadow-none transition hover:-translate-y-0.5 hover:shadow-md">
      <div
        className="relative h-44 bg-muted bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(180deg, rgb(0 0 0 / 0.04) 20%, rgb(0 0 0 / 0.55) 100%), url("${course.coverImageUrl}")`,
        }}
        role="img"
        aria-label={`${course.title} cover photo`}
      >
        <div className="absolute inset-x-5 bottom-4 flex items-end justify-between gap-3 text-white">
          <span className="line-clamp-2 text-lg font-semibold drop-shadow">{course.title}</span>
          <Badge className="shrink-0 border-white/30 bg-black/25 text-white">{course.level}</Badge>
        </div>
      </div>
      <CardHeader className="gap-3 px-5 pt-5 pb-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{course.category}</Badge>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><Clock3 className="size-3.5" aria-hidden="true" />{course.duration}</span>
        </div>
        <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">{course.description}</p>
      </CardHeader>
      <CardContent className="grid gap-3 px-5 pb-5 pt-3 sm:grid-cols-2">
        <div className="flex items-start gap-2 rounded-xl bg-muted/60 p-3">
          <BookOpenText className="mt-0.5 size-4 shrink-0 text-emerald-700 dark:text-emerald-300" aria-hidden="true" />
          <p className="text-xs leading-5 text-muted-foreground">{course.articles.length} article lessons</p>
        </div>
        <div className="flex items-start gap-2 rounded-xl bg-muted/60 p-3">
          <FolderKanban className="mt-0.5 size-4 shrink-0 text-emerald-700 dark:text-emerald-300" aria-hidden="true" />
          <p className="line-clamp-2 text-xs leading-5 text-muted-foreground">{course.projectTitle}</p>
        </div>
        <p className="flex items-center gap-2 text-xs text-muted-foreground sm:col-span-2">
          <CalendarDays className="size-3.5" aria-hidden="true" /> Created {new Date(course.createdAt).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
}
