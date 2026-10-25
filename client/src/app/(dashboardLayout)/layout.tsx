import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { DashboardRole } from "@/types";

function getDashboardForRole(
  userRole: DashboardRole,
  student: React.ReactNode,
  mentor: React.ReactNode,
) {
  return userRole === "student" ? student : mentor;
}

export default function DashboardLayout({
  mentor,
  student,
}: {
  mentor: React.ReactNode;
  student: React.ReactNode;
}) {
  const userRole: DashboardRole = "student";
  const activeDashboard = getDashboardForRole(userRole, student, mentor);

  return (
    <div className="min-h-svh bg-background">
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar userRole={userRole} variant="inset" />
        <SidebarInset className="min-h-svh bg-muted/20">
          <SiteHeader userRole={userRole} />
          <div className="flex flex-1 flex-col">
            <main className="@container/main mx-auto flex w-full max-w-7xl flex-1 flex-col p-4 sm:p-6 lg:p-8">
              {activeDashboard}
            </main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
