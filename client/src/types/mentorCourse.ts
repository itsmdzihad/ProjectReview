export type MentorCourse = {
  id: string;
  title: string;
  description: string;
  category: string;
  coverImageUrl: string;
  level: "Beginner" | "Intermediate";
  duration: string;
  articles: string[];
  projectTitle: string;
  projectDescription: string;
  projectDeliverable: string;
  createdAt: string;
  status?: "DRAFT" | "PUBLISHED";
  enrollmentCount?: number;
  submissionCount?: number;
};

export type NewMentorCourse = Omit<MentorCourse, "id" | "createdAt">;
