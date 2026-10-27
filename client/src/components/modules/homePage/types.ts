import type { LucideIcon } from "lucide-react";

export type Course = {
  id: string;
  title: string;
  description: string;
  category?: string;
  level?: string;
  duration?: string;
  coverImageUrl?: string;
  instructorName?: string;
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
