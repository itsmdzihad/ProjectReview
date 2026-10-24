import Link from "next/link";
import { ArrowRight, Mail, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AuthPageShell } from "./AuthPageShell";

export function RegistrationForm() {
  return (
    <AuthPageShell>
      <Card className="gap-0 rounded-3xl border-border/70 p-0 shadow-lg shadow-foreground/[0.04]">
        <CardHeader className="px-6 pt-7 pb-5 sm:px-8 sm:pt-8">
          <p className="text-xs font-semibold tracking-[0.14em] text-emerald-700 uppercase dark:text-emerald-400">Start learning today</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-[1.75rem]">Create your account</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">One small step toward the skills you want to build.</p>
        </CardHeader>
        <CardContent className="px-6 pb-7 sm:px-8 sm:pb-8">
          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="register-name" className="text-sm font-medium">Full name</label>
              <div className="relative">
                <UserRound className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <input id="register-name" name="name" type="text" autoComplete="name" placeholder="Your name" required className="h-11 w-full rounded-xl border border-input bg-background pr-4 pl-10 text-sm outline-none transition placeholder:text-muted-foreground/70 focus-visible:border-emerald-600 focus-visible:ring-3 focus-visible:ring-emerald-600/15" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="register-email" className="text-sm font-medium">Email address</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <input id="register-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required className="h-11 w-full rounded-xl border border-input bg-background pr-4 pl-10 text-sm outline-none transition placeholder:text-muted-foreground/70 focus-visible:border-emerald-600 focus-visible:ring-3 focus-visible:ring-emerald-600/15" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="register-password" className="text-sm font-medium">Create a password</label>
              <input id="register-password" name="password" type="password" autoComplete="new-password" minLength={8} placeholder="At least 8 characters" required className="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition placeholder:text-muted-foreground/70 focus-visible:border-emerald-600 focus-visible:ring-3 focus-visible:ring-emerald-600/15" />
              <p className="text-xs text-muted-foreground">Use at least 8 characters.</p>
            </div>
            <div className="flex items-start gap-2.5 pt-1">
              <input id="agree-terms" name="agree-terms" type="checkbox" required className="mt-0.5 size-4 rounded border-input accent-emerald-700 focus-visible:ring-2 focus-visible:ring-emerald-600/40" />
              <label htmlFor="agree-terms" className="text-xs leading-5 text-muted-foreground">I agree to the <a href="#terms" className="font-medium text-foreground underline underline-offset-2">Terms of Service</a> and <a href="#privacy" className="font-medium text-foreground underline underline-offset-2">Privacy Policy</a>.</label>
            </div>
            <Button type="button" className="h-11 w-full rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500">
              Create account <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account? <Link href="/auth/login" className="font-semibold text-emerald-700 hover:underline dark:text-emerald-400">Sign in</Link>
          </p>
        </CardContent>
      </Card>
    </AuthPageShell>
  );
}
