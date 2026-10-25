import { BookOpenText, LayoutDashboard } from "lucide-react";
import type { Route } from "@/types";

export const mentorRoutes: Route[] = [
  {
    title: "Teaching",
    items: [
      {
        title: "Dashboard",
        url: "/mentor/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Course library",
        url: "/#courses",
        icon: BookOpenText,
      },
    ],
  },
];
