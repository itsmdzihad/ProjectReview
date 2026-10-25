import type { LucideIcon } from "lucide-react";

export type Route = {
  title: string;
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
};

export type DashboardRole = "student" | "mentor";
