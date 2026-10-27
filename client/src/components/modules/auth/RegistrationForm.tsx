"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { ArrowRight, Mail, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AuthPageShell } from "./AuthPageShell";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";
import { formatValidationErrors } from "./validation-messages";
import { registrationAction } from "@/actions/user.actions";

const registrationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name cannot exceed 100 characters."),
  email: z
    .email("Enter a valid email address.")
    .max(254, "Email cannot exceed 254 characters."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(72, "Password cannot exceed 72 characters."),
  agreedToTerms: z
    .boolean()
    .refine(
      (agreed) => agreed,
      "You must agree to the terms and privacy policy.",
    ),
});

export function RegistrationForm() {
  const router = useRouter();

  const form = useForm({
    defaultValues: { name: "", email: "", password: "", agreedToTerms: false },
    validators: { onSubmit: registrationSchema },
    onSubmit: ({ value }) => {
      const toastId = toast.loading("Creating your account...");
      startTransition(async () => {
        const result = await registrationAction({
          name: value.name.trim(),
          email: value.email.trim(),
          password: value.password,
        });

        if (result.error) {
          toast.error(result.error.message, { id: toastId });
          return;
        }

        toast.success("Account created successfully.", { id: toastId });
        router.replace("/auth/login");
      });
    },
  });

  return (
    <AuthPageShell>
      <Card className="gap-0 rounded-3xl border-border/70 p-0 shadow-lg shadow-foreground/[0.04]">
        <CardHeader className="px-6 pt-7 pb-5 sm:px-8 sm:pt-8">
          <p className="text-xs font-semibold tracking-[0.14em] text-emerald-700 uppercase dark:text-emerald-400">
            Start learning today
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
            Create your account
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            One small step toward the skills you want to build.
          </p>
        </CardHeader>
        <CardContent className="px-6 pb-7 sm:px-8 sm:pb-8">
          <form
            className="space-y-4"
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
              void form.handleSubmit();
            }}
          >
            <div className="space-y-2">
              <label htmlFor="register-name" className="text-sm font-medium">
                Full name
              </label>
              <div className="relative">
                <UserRound
                  className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <form.Field name="name">
                  {(field) => (
                    <input
                      id="register-name"
                      name={field.name}
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      aria-invalid={field.state.meta.errors.length > 0}
                      aria-describedby="register-name-error"
                      className="h-11 w-full rounded-xl border border-input bg-background pr-4 pl-10 text-sm outline-none transition placeholder:text-muted-foreground/70 focus-visible:border-emerald-600 focus-visible:ring-3 focus-visible:ring-emerald-600/15"
                    />
                  )}
                </form.Field>
              </div>
              <form.Field name="name">
                {(field) =>
                  field.state.meta.errors.length > 0 && (
                    <p
                      id="register-name-error"
                      className="text-xs text-destructive"
                    >
                      {formatValidationErrors(field.state.meta.errors)}
                    </p>
                  )
                }
              </form.Field>
            </div>
            <div className="space-y-2">
              <label htmlFor="register-email" className="text-sm font-medium">
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
                      id="register-email"
                      name={field.name}
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      aria-invalid={field.state.meta.errors.length > 0}
                      aria-describedby="register-email-error"
                      className="h-11 w-full rounded-xl border border-input bg-background pr-4 pl-10 text-sm outline-none transition placeholder:text-muted-foreground/70 focus-visible:border-emerald-600 focus-visible:ring-3 focus-visible:ring-emerald-600/15"
                    />
                  )}
                </form.Field>
              </div>
              <form.Field name="email">
                {(field) =>
                  field.state.meta.errors.length > 0 && (
                    <p
                      id="register-email-error"
                      className="text-xs text-destructive"
                    >
                      {formatValidationErrors(field.state.meta.errors)}
                    </p>
                  )
                }
              </form.Field>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="register-password"
                className="text-sm font-medium"
              >
                Create a password
              </label>
              <form.Field name="password">
                {(field) => (
                  <input
                    id="register-password"
                    name={field.name}
                    type="password"
                    autoComplete="new-password"
                    placeholder="At least 8 characters"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    aria-invalid={field.state.meta.errors.length > 0}
                    aria-describedby="register-password-help register-password-error"
                    className="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition placeholder:text-muted-foreground/70 focus-visible:border-emerald-600 focus-visible:ring-3 focus-visible:ring-emerald-600/15"
                  />
                )}
              </form.Field>
              <p
                id="register-password-help"
                className="text-xs text-muted-foreground"
              >
                Use at least 8 characters.
              </p>
              <form.Field name="password">
                {(field) =>
                  field.state.meta.errors.length > 0 && (
                    <p
                      id="register-password-error"
                      className="text-xs text-destructive"
                    >
                      {formatValidationErrors(field.state.meta.errors)}
                    </p>
                  )
                }
              </form.Field>
            </div>
            <div className="flex items-start gap-2.5 pt-1">
              <form.Field name="agreedToTerms">
                {(field) => (
                  <input
                    id="agree-terms"
                    name={field.name}
                    type="checkbox"
                    checked={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) =>
                      field.handleChange(event.target.checked)
                    }
                    aria-invalid={field.state.meta.errors.length > 0}
                    aria-describedby="register-terms-error"
                    className="mt-0.5 size-4 rounded border-input accent-emerald-700 focus-visible:ring-2 focus-visible:ring-emerald-600/40"
                  />
                )}
              </form.Field>
              <label
                htmlFor="agree-terms"
                className="text-xs leading-5 text-muted-foreground"
              >
                I agree to the{" "}
                <a
                  href="#terms"
                  className="font-medium text-foreground underline underline-offset-2"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#privacy"
                  className="font-medium text-foreground underline underline-offset-2"
                >
                  Privacy Policy
                </a>
                .
              </label>
            </div>
            <form.Field name="agreedToTerms">
              {(field) =>
                field.state.meta.errors.length > 0 && (
                  <p
                    id="register-terms-error"
                    className="text-xs text-destructive"
                  >
                    {formatValidationErrors(field.state.meta.errors)}
                  </p>
                )
              }
            </form.Field>
            <Button
              type="submit"
              className="h-11 w-full rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
            >
              Create account{" "}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-semibold text-emerald-700 hover:underline dark:text-emerald-400"
            >
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </AuthPageShell>
  );
}
