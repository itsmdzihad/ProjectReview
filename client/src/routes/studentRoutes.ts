import { BookOpenText, LayoutDashboard } from "lucide-react";
import type { Route } from "@/types";

export const studentRoutes: Route[] = [
  {
    title: "My learning",
    items: [
      {
        title: "Dashboard",
        url: "/student/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Course",
    items: [
      {
        title: "Enroll Course List",
        url: "/student/courses/enroll",
        icon: BookOpenText,
      },
    ],
  },
];
