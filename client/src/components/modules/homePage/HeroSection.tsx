import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Play,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 pt-12 pb-16 sm:px-8 sm:pt-16 lg:grid-cols-[1fr_0.88fr] lg:gap-14 lg:px-10 lg:pt-20 lg:pb-20">
      <div className="max-w-2xl">
        <h1 className="text-4xl leading-[1.1] font-semibold tracking-[-0.045em] text-foreground sm:text-5xl lg:text-[3.75rem]">
          Learn web development. <span className="text-emerald-700 dark:text-emerald-400">Build real projects.</span>
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          Practical programming courses, clear explanations, and hands-on projects to help you turn curiosity into a skill.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Button nativeButton={false} render={<a href="#courses" />} size="lg" className="rounded-full bg-emerald-700 px-6 text-white hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500">
            Explore courses <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
          <Button nativeButton={false} render={<a href="#how-it-works" />} variant="outline" size="lg" className="rounded-full px-5">
            <Play className="size-3.5" aria-hidden="true" /> How it works
          </Button>
        </div>
        <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
          <div className="flex -space-x-2" aria-hidden="true">
            <span className="flex size-8 items-center justify-center rounded-full border-2 border-background bg-amber-100 text-[10px] font-bold text-amber-800">A</span>
            <span className="flex size-8 items-center justify-center rounded-full border-2 border-background bg-sky-100 text-[10px] font-bold text-sky-800">R</span>
            <span className="flex size-8 items-center justify-center rounded-full border-2 border-background bg-rose-100 text-[10px] font-bold text-rose-800">S</span>
          </div>
          <span><strong className="text-foreground">Made for learners</strong> starting their next chapter</span>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-lg lg:ml-auto">
        <div className="absolute -inset-5 rounded-[2rem] bg-emerald-100/60 blur-2xl dark:bg-emerald-950/50" />
        <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-[#101a1d] p-5 text-slate-100 shadow-xl shadow-emerald-950/10 sm:p-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2 text-xs text-slate-400"><Terminal className="size-4 text-emerald-400" /> your-first-page.html</div>
            <div className="flex gap-1.5"><span className="size-2 rounded-full bg-rose-400/80" /><span className="size-2 rounded-full bg-amber-300/80" /><span className="size-2 rounded-full bg-emerald-400/80" /></div>
          </div>
          <div className="grid grid-cols-[26px_1fr] gap-x-3 py-5 font-mono text-[11px] leading-7 sm:text-xs">
            <div className="select-none text-right text-slate-600">01<br />02<br />03<br />04<br />05<br />06<br />07</div>
            <div className="overflow-hidden whitespace-nowrap">
              <div><span className="text-violet-300">&lt;article</span> <span className="text-sky-300">class</span>=<span className="text-amber-200">&quot;big-idea&quot;</span><span className="text-violet-300">&gt;</span></div>
              <div className="pl-4"><span className="text-violet-300">&lt;h1&gt;</span><span className="text-emerald-300">Hello, future developer.</span><span className="text-violet-300">&lt;/h1&gt;</span></div>
              <div className="pl-4"><span className="text-violet-300">&lt;p&gt;</span><span className="text-slate-300">You can build this.</span><span className="text-violet-300">&lt;/p&gt;</span></div>
              <div className="pl-4"><span className="text-violet-300">&lt;button</span> <span className="text-sky-300">type</span>=<span className="text-amber-200">&quot;button&quot;</span><span className="text-violet-300">&gt;</span></div>
              <div className="pl-8 text-emerald-300">Start building <ArrowUpRight className="inline size-3" /></div>
              <div className="pl-4"><span className="text-violet-300">&lt;/button&gt;</span></div>
              <div><span className="text-violet-300">&lt;/article&gt;</span></div>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-[11px] text-slate-400">
            <span className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-emerald-400" /> Ready to preview</span>
            <span className="font-mono">HTML · CSS · YOU</span>
          </div>
        </div>
        <div className="absolute -right-3 -bottom-5 hidden items-center gap-2 rounded-xl border border-border/70 bg-background px-3 py-2.5 text-xs shadow-lg sm:flex">
          <span className="flex size-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"><Code2 className="size-4" /></span>
          <span className="font-medium">One line at a time</span>
        </div>
      </div>
    </section>
  );
}
