import { BookOpenText, Clock3 } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export function ArticleModule({ articles }: { articles: string[] }) {
  return (
    <Card className="gap-0 overflow-hidden rounded-2xl border-border/70 p-0 shadow-none">
      <CardHeader className="border-b border-border/70 bg-muted/30 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
            <BookOpenText className="size-4" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">Module 1 · Article lessons</p>
            <h3 className="mt-0.5 font-semibold">Core concepts</h3>
          </div>
          <span className="hidden text-xs text-muted-foreground sm:block">{articles.length} lessons</span>
        </div>
      </CardHeader>
      <CardContent className="px-5 py-2 sm:px-6">
        <ol className="divide-y divide-border/70">
          {articles.map((article, index) => (
            <li key={article} className="flex items-center gap-3 py-3.5">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-muted font-mono text-[11px] text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
              <span className="min-w-0 flex-1 text-sm font-medium">{article}</span>
              <span className="hidden items-center gap-1 text-xs text-muted-foreground sm:inline-flex"><Clock3 className="size-3.5" aria-hidden="true" /> 8 min</span>
            </li>
          ))}
        </ol>
      </CardContent>
      <CardFooter className="border-t border-border/70 px-5 py-3.5 text-xs leading-5 text-muted-foreground sm:px-6">
        Read at your own pace. Each lesson includes an explanation and code examples.
      </CardFooter>
    </Card>
  );
}
