export default function DashboardLayout({
  mentor,
  student,
}: {
  mentor: React.ReactNode;
  student: React.ReactNode;
}) {
  const userRole = "student";
  return <div>{userRole === "student" ? student : mentor}</div>;
}
