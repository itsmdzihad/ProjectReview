"use client";

import { startTransition, useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AuthPageShell } from "./AuthPageShell";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { loginAction } from "@/actions/user.actions";
import { formatValidationErrors } from "@/lib/validation-messages";

const loginSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

const demoAccounts = {
  student: {
    label: "Student",
    email: "zihad.test@example.com",
    password: "TestPass123!",
  },
  mentor: {
    label: "Mentor",
    email: "mentor@codepath.dev",
    password: "Mentor@12345",
  },
} as const;

type DemoRole = keyof typeof demoAccounts;

export function LoginForm() {
  const [selectedDemo, setSelectedDemo] = useState<DemoRole | null>(null);
  const router = useRouter();

  const form = useForm({
    defaultValues: { email: "", password: "" },
    validators: { onSubmit: loginSchema },
    onSubmit: ({ value }) => {
      const toastId = toast.loading("Signing in...");
      startTransition(async () => {
        const result = await loginAction(value);

        if (result.error) {
          toast.error(result.error.message, { id: toastId });
          return;
        }

        toast.success("Signed in successfully.", { id: toastId });
        router.replace(
          result.data.data.role === "MENTOR"
            ? "/mentor/dashboard"
            : "/student/dashboard",
        );
      });
    },
  });

  function fillDemoCredentials(role: DemoRole) {
    const account = demoAccounts[role];
    form.setFieldValue("email", account.email);
    form.setFieldValue("password", account.password);
    setSelectedDemo(role);
  }

  return (
    <AuthPageShell>
      <Card className="gap-0 rounded-3xl border-border/70 p-0 shadow-lg shadow-foreground/[0.04]">
        <CardHeader className="px-6 pt-7 pb-5 sm:px-8 sm:pt-8">
          <p className="text-xs font-semibold tracking-[0.14em] text-emerald-700 uppercase dark:text-emerald-400">
            Welcome back
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
            Sign in to CodePath
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Pick up where you left off and keep your momentum going.
          </p>
        </CardHeader>
        <CardContent className="px-6 pb-7 sm:px-8 sm:pb-8">
          <div className="mb-5 rounded-2xl border border-emerald-900/10 bg-emerald-50/70 p-4 dark:border-emerald-300/10 dark:bg-emerald-950/30">
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(demoAccounts) as DemoRole[]).map((role) => {
                const account = demoAccounts[role];
                const isSelected = selectedDemo === role;

                return (
                  <Button
                    key={role}
                    type="button"
                    variant="outline"
                    aria-pressed={isSelected}
                    onClick={() => fillDemoCredentials(role)}
                    className={`h-auto min-h-12 justify-start rounded-xl px-3 py-2.5 text-left ${isSelected ? "border-emerald-700 bg-emerald-100/80 dark:border-emerald-400 dark:bg-emerald-900/50" : "bg-background/80"}`}
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                      <UserRound className="size-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold">
                        {account.label}
                      </span>
                      <span className="block truncate text-[10px] font-normal text-muted-foreground">
                        Demo access
                      </span>
                    </span>
                  </Button>
                );
              })}
            </div>
          </div>

          <form
            className="space-y-5"
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
              void form.handleSubmit();
            }}
          >
            <div className="space-y-2">
              <label htmlFor="login-email" className="text-sm font-medium">
                Email address
              </label>
              <div className="relative">
                <Mail
                  className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <form.Field name="email">
                  {(field) => (
                    <input
                      id="login-email"
                      name={field.name}
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) => {
                        field.handleChange(event.target.value);
                        setSelectedDemo(null);
                      }}
                      aria-invalid={field.state.meta.errors.length > 0}
                      aria-describedby="login-email-error"
                      className="h-11 w-full rounded-xl border border-input bg-background pr-4 pl-10 text-sm outline-none transition placeholder:text-muted-foreground/70 focus-visible:border-emerald-600 focus-visible:ring-3 focus-visible:ring-emerald-600/15"
                    />
                  )}
                </form.Field>
              </div>
              <form.Field name="email">
                {(field) =>
                  field.state.meta.errors.length > 0 && (
                    <p
                      id="login-email-error"
                      className="text-xs text-destructive"
                    >
                      {formatValidationErrors(field.state.meta.errors)}
                    </p>
                  )
                }
              </form.Field>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <label htmlFor="login-password" className="text-sm font-medium">
                  Password
                </label>
                <a
                  href="#forgot-password"
                  className="text-xs font-medium text-emerald-700 hover:underline dark:text-emerald-400"
                >
                  Forgot password?
                </a>
              </div>
              <form.Field name="password">
                {(field) => (
                  <input
                    id="login-password"
                    name={field.name}
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => {
                      field.handleChange(event.target.value);
                      setSelectedDemo(null);
                    }}
                    aria-invalid={field.state.meta.errors.length > 0}
                    aria-describedby="login-password-error"
                    className="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition placeholder:text-muted-foreground/70 focus-visible:border-emerald-600 focus-visible:ring-3 focus-visible:ring-emerald-600/15"
                  />
                )}
              </form.Field>
              <form.Field name="password">
                {(field) =>
                  field.state.meta.errors.length > 0 && (
                    <p
                      id="login-password-error"
                      className="text-xs text-destructive"
                    >
                      {formatValidationErrors(field.state.meta.errors)}
                    </p>
                  )
                }
              </form.Field>
            </div>
            <div className="flex items-center gap-2.5">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="size-4 rounded border-input accent-emerald-700 focus-visible:ring-2 focus-visible:ring-emerald-600/40"
              />
              <label
                htmlFor="remember-me"
                className="text-sm text-muted-foreground"
              >
                Keep me signed in
              </label>
            </div>
            <Button
              type="submit"
              className="h-11 w-full rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
            >
              Sign in <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </form>
          <div className="relative my-6 flex items-center justify-center">
            <span className="absolute inset-x-0 h-px bg-border" />
            <span className="relative bg-card px-3 text-xs text-muted-foreground">
              or continue with
            </span>
          </div>
          <Button
            type="button"
            variant="outline"
            className="h-11 w-full rounded-xl"
          >
            <span className="flex size-5 items-center justify-center rounded-full border border-border text-[11px] font-semibold">
              G
            </span>
            Continue with Google
          </Button>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            New to CodePath?{" "}
            <Link
              href="/auth/registration"
              className="font-semibold text-emerald-700 hover:underline dark:text-emerald-400"
            >
              Create an account
            </Link>
          </p>
        </CardContent>
      </Card>
      <p className="mt-5 text-center text-xs leading-5 text-muted-foreground">
        By continuing, you agree to CodePath’s{" "}
        <a
          href="#terms"
          className="underline underline-offset-2 hover:text-foreground"
        >
          Terms
        </a>{" "}
        and{" "}
        <a
          href="#privacy"
          className="underline underline-offset-2 hover:text-foreground"
        >
          Privacy Policy
        </a>
        .
      </p>
    </AuthPageShell>
  );
}
