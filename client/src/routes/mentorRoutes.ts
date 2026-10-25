import {
  BookOpenText,
  ClipboardList,
  LayoutDashboard,
  PlusCircle,
} from "lucide-react";
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
    ],
  },
  {
    title: "Courses",
    items: [
      {
        title: "My Courses",
        url: "/mentor/courses",
        icon: BookOpenText,
      },
      {
        title: "Create Course",
        url: "/mentor/courses/create",
        icon: PlusCircle,
      },
      {
        title: "Project Submissions",
        url: "/mentor/project-submissions",
        icon: ClipboardList,
      },
    ],
  },
];
