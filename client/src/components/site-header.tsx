import type { DashboardRole } from "@/types"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function SiteHeader({ userRole }: { userRole: DashboardRole }) {
  const heading = userRole === "student" ? "Student dashboard" : "Mentor dashboard"

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 h-4 data-vertical:self-auto"
        />
        <div className="min-w-0">
          <h1 className="truncate text-sm font-semibold tracking-tight">{heading}</h1>
          <p className="hidden text-xs text-muted-foreground sm:block">CodePath learning workspace</p>
        </div>
      </div>
    </header>
  )
}
