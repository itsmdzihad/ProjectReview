import { MentorCourseEditor } from "@/components/modules/dashboard/mentor/MentorCourseEditor";

export default async function EditMentorCoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  return <MentorCourseEditor courseId={courseId} />;
}
