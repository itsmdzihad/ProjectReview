export type MentorCourse = {
  id: string;
  title: string;
  description: string;
  category: string;
  level: "Beginner" | "Intermediate";
  duration: string;
  articles: string[];
  projectTitle: string;
  projectDescription: string;
  projectDeliverable: string;
  createdAt: string;
};

export type NewMentorCourse = Omit<MentorCourse, "id" | "createdAt">;
