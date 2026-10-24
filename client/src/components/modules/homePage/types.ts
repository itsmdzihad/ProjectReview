import type { LucideIcon } from "lucide-react";

export type Course = {
  title: string;
  description: string;
  category: string;
  level: "Beginner" | "Intermediate";
  duration: string;
  icon: LucideIcon;
  accent: string;
  graphic: string;
  code: string[];
};

export type LearningStep = {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
};
