export type StudentProjectSubmission = {
  studentId: string;
  studentName: string;
  studentEmail: string;
  projectName: string;
  repoUrl: string;
  liveLink: string;
  description: string;
  submittedAt: string;
};

export type ProjectSubmissionDetails = Pick<
  StudentProjectSubmission,
  "projectName" | "repoUrl" | "liveLink" | "description"
>;

export type ProjectSubmissionsByCourse = Record<string, StudentProjectSubmission[]>;

export const PROJECT_SUBMISSIONS_STORAGE_KEY = "codepath:student:project-submissions";
export const PROJECT_SUBMISSIONS_CHANGE_EVENT = "codepath:student-project-submissions-changed";
export const DEMO_STUDENT = {
  id: "student-demo",
  name: "Student",
  email: "student@codepath.dev",
};

function isSubmission(value: unknown): value is Partial<StudentProjectSubmission> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function normalizeSubmission(value: unknown): StudentProjectSubmission | null {
  if (!isSubmission(value)) return null;
  if (
    typeof value.projectName !== "string" ||
    typeof value.repoUrl !== "string" ||
    typeof value.description !== "string" ||
    typeof value.submittedAt !== "string"
  ) {
    return null;
  }

  return {
    studentId: typeof value.studentId === "string" ? value.studentId : DEMO_STUDENT.id,
    studentName: typeof value.studentName === "string" ? value.studentName : DEMO_STUDENT.name,
    studentEmail: typeof value.studentEmail === "string" ? value.studentEmail : DEMO_STUDENT.email,
    projectName: value.projectName,
    repoUrl: value.repoUrl,
    liveLink: typeof value.liveLink === "string" ? value.liveLink : "",
    description: value.description,
    submittedAt: value.submittedAt,
  };
}

export function readProjectSubmissions(): ProjectSubmissionsByCourse {
  try {
    const stored = window.localStorage.getItem(PROJECT_SUBMISSIONS_STORAGE_KEY);
    const parsed: unknown = stored ? JSON.parse(stored) : {};
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};

    const normalizedSubmissions: ProjectSubmissionsByCourse = {};
    for (const [courseId, courseSubmissions] of Object.entries(parsed)) {
      const values = Array.isArray(courseSubmissions) ? courseSubmissions : [courseSubmissions];
      const normalized = values
        .map(normalizeSubmission)
        .filter((submission): submission is StudentProjectSubmission => submission !== null);
      if (normalized.length > 0) normalizedSubmissions[courseId] = normalized;
    }
    return normalizedSubmissions;
  } catch {
    return {};
  }
}

export function writeProjectSubmissions(submissions: ProjectSubmissionsByCourse) {
  try {
    window.localStorage.setItem(PROJECT_SUBMISSIONS_STORAGE_KEY, JSON.stringify(submissions));
    window.dispatchEvent(new Event(PROJECT_SUBMISSIONS_CHANGE_EVENT));
  } catch {
    // Keep the current page functional when browser storage is unavailable.
  }
}
