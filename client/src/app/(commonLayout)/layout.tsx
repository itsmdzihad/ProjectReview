import Link from "next/link";
import { ArrowUpRight, BookOpenText, ChevronDown, Code2 } from "lucide-react";
import { ModeToggle } from "@/components/ui/ModeToggle";

export default function CommonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id="top" className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
          <Link href="/" className="flex shrink-0 items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <span className="flex size-9 items-center justify-center rounded-xl bg-emerald-700 text-white dark:bg-emerald-600">
              <Code2 className="size-[18px]" aria-hidden="true" />
            </span>
            <span className="text-[17px] font-semibold tracking-tight">CodePath</span>
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">
            <Link href="/" className="text-sm font-medium text-foreground">Home</Link>
            <Link href="/#courses" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Courses</Link>
            <Link href="/#how-it-works" className="text-sm text-muted-foreground transition-colors hover:text-foreground">About</Link>
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <button type="button" aria-label="Language: English" className="hidden items-center gap-1.5 rounded-full px-2.5 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:inline-flex">
              <span aria-hidden="true">EN</span><ChevronDown className="size-3" aria-hidden="true" />
            </button>
            <div className="hidden sm:block"><ModeToggle /></div>
            <Link href="/auth/login" className="hidden px-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:block">Log in</Link>
            <Link href="/auth/registration" className="inline-flex h-9 items-center gap-1.5 rounded-full bg-emerald-700 px-4 text-sm font-medium text-white transition-colors hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:bg-emerald-600 dark:hover:bg-emerald-500">
              Get started <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <nav aria-label="Mobile navigation" className="flex items-center justify-center gap-6 border-t border-border/50 px-4 py-2.5 md:hidden">
          <Link href="/" className="text-xs font-medium text-foreground">Home</Link>
          <Link href="/#courses" className="text-xs text-muted-foreground">Courses</Link>
          <Link href="/#how-it-works" className="text-xs text-muted-foreground">About</Link>
          <Link href="/auth/login" className="inline-flex items-center gap-1 text-xs text-muted-foreground"><BookOpenText className="size-3" aria-hidden="true" /> Login</Link>
          <ModeToggle />
        </nav>
      </header>
      {children}
      <footer className="border-t border-border/70 bg-muted/20">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-9 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center gap-2 font-semibold tracking-tight">
              <span className="flex size-8 items-center justify-center rounded-lg bg-emerald-700 text-white dark:bg-emerald-600"><Code2 className="size-4" aria-hidden="true" /></span>
              CodePath
            </Link>
            <p className="mt-2 max-w-xs text-xs leading-5 text-muted-foreground">A clearer path into code, built for curious minds and hands-on learners.</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-muted-foreground">
            <Link href="/#courses" className="transition-colors hover:text-foreground">Courses</Link>
            <Link href="/#how-it-works" className="transition-colors hover:text-foreground">About</Link>
            <a href="#contact" className="transition-colors hover:text-foreground">Contact</a>
            <span className="basis-full text-muted-foreground/70 md:basis-auto">© 2026 CodePath. Learn, build, repeat.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
