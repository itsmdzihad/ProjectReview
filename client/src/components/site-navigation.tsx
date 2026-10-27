"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteNavigationLinks({ variant }: { variant: "desktop" | "mobile" }) {
  const pathname = usePathname();
  const isHomeActive = pathname === "/";
  const isCoursesActive = pathname === "/courses" || pathname.startsWith("/details/");

  const linkClass = (active: boolean) => active
    ? "font-medium text-foreground"
    : "text-muted-foreground transition-colors hover:text-foreground";
  const sizeClass = variant === "desktop" ? "text-sm" : "text-xs";

  if (variant === "desktop") {
    return (
      <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">
        <Link href="/" aria-current={isHomeActive ? "page" : undefined} className={`${sizeClass} ${linkClass(isHomeActive)}`}>Home</Link>
        <Link href="/courses" aria-current={isCoursesActive ? "page" : undefined} className={`${sizeClass} ${linkClass(isCoursesActive)}`}>Courses</Link>
        <Link href="/#how-it-works" className={`${sizeClass} ${linkClass(false)}`}>About</Link>
      </nav>
    );
  }

  return (
    <>
      <Link href="/" aria-current={isHomeActive ? "page" : undefined} className={`${sizeClass} ${linkClass(isHomeActive)}`}>Home</Link>
      <Link href="/courses" aria-current={isCoursesActive ? "page" : undefined} className={`${sizeClass} ${linkClass(isCoursesActive)}`}>Courses</Link>
      <Link href="/#how-it-works" className={`${sizeClass} ${linkClass(false)}`}>About</Link>
    </>
  );
}
