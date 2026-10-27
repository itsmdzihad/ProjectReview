import { BookOpenText, Compass, LayoutDashboard } from "lucide-react";
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
        title: "My Enrolled Courses",
        url: "/student/courses/enroll",
        icon: BookOpenText,
      },
      {
        title: "Explore Courses",
        url: "/student/courses/catalog",
        icon: Compass,
      },
    ],
  },
];
