import { FolderKanban } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { CourseContent } from "../courseContent";

export function ProjectModule({ content }: { content: CourseContent }) {
  return (
    <Card className="mt-4 gap-0 overflow-hidden rounded-2xl border-emerald-900/10 bg-emerald-50/50 p-0 shadow-none dark:border-emerald-300/10 dark:bg-emerald-950/20">
      <CardHeader className="border-b border-emerald-900/10 px-5 py-4 dark:border-emerald-300/10 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
            <FolderKanban className="size-4" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold tracking-wide text-emerald-800/70 uppercase dark:text-emerald-200/70">Module 2 · Hands-on project</p>
            <h3 className="mt-0.5 font-semibold">{content.projectTitle}</h3>
          </div>
          <Badge variant="outline" className="border-emerald-900/15 dark:border-emerald-200/15">Final project</Badge>
        </div>
      </CardHeader>
      <CardContent className="px-5 py-5 sm:px-6">
        <p className="text-sm leading-6 text-muted-foreground">{content.projectDescription}</p>
        <div className="mt-4 rounded-xl border border-emerald-900/10 bg-background/70 p-4 dark:border-emerald-200/10 dark:bg-background/40">
          <p className="text-xs font-semibold">Project outcome</p>
          <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{content.projectDeliverable}</p>
        </div>
      </CardContent>
    </Card>
  );
}
