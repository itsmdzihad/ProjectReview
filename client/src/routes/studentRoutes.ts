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
      {
        title: "Browse courses",
        url: "/#courses",
        icon: BookOpenText,
      },
    ],
  },
];
