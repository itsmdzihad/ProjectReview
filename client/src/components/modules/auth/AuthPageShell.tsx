import type { ReactNode } from "react";
type AuthPageShellProps = {
  children: ReactNode;
};

export function AuthPageShell({ children }: AuthPageShellProps) {
  return (
    <main className="mx-auto grid w-full max-w-6xl items-stretch gap-6 px-5 py-8 sm:px-8 sm:py-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-10 lg:px-10 lg:py-16">
      <aside className="relative flex min-h-64 flex-col justify-start overflow-hidden rounded-3xl bg-emerald-950 p-7 text-white sm:min-h-72 sm:p-9 lg:min-h-[500px] lg:p-10">
        <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(#a7f3d0_0.7px,transparent_0.7px)] [background-size:18px_18px]" />
        <div className="absolute -right-20 -bottom-24 size-72 rounded-full border border-emerald-200/10" />
        <div className="absolute -right-12 -bottom-16 size-56 rounded-full border border-emerald-200/10" />
        <div className="relative z-10 mt-9 max-w-md">
          <h1 className="text-3xl leading-tight font-semibold tracking-[-0.035em] sm:text-4xl">
            Your next chapter starts with one line.
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-6 text-emerald-100/75">
            Learn practical skills, follow a clear path, and build projects
            you’re proud to share.
          </p>
          <div className="mt-7 hidden rounded-2xl border border-white/10 bg-black/20 p-4 font-mono text-xs leading-6 text-emerald-100/80 sm:block">
            <p>
              <span className="text-emerald-400">const</span> nextStep ={" "}
              <span className="text-amber-200">&quot;start here&quot;</span>;
            </p>
            <p>
              <span className="text-emerald-400">while</span> (curious) {"{"}
            </p>
            <p className="pl-4">learn(); build(); repeat();</p>
            <p>{"}"}</p>
            <div className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3 text-[11px] text-emerald-100/60">
              <span className="size-1.5 rounded-full bg-emerald-400" /> Ready
              when you are
            </div>
          </div>
        </div>
      </aside>
      <div className="flex items-center justify-center py-2 sm:py-5 lg:px-5">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </main>
  );
}
