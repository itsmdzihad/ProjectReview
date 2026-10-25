"use client";

import Link from "next/link";
import { BookOpenCheck, Code2 } from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { mentorRoutes } from "@/routes/mentorRoutes";
import { studentRoutes } from "@/routes/studentRoutes";
import type { DashboardRole } from "@/types";

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  userRole: DashboardRole;
};

export function AppSidebar({ userRole, ...props }: AppSidebarProps) {
  const isStudent = userRole === "student";
  const routes = isStudent ? studentRoutes : mentorRoutes;
  const user = isStudent
    ? { name: "Student", email: "student@codepath.dev", avatar: "" }
    : { name: "Mentor", email: "mentor@codepath.dev", avatar: "" };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="border-b border-sidebar-border/70 px-3 py-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<Link href="/" />}
              className="h-11 gap-3 rounded-xl px-2.5 hover:bg-emerald-50 dark:hover:bg-emerald-950/50"
            >
              <span className="flex size-8 items-center justify-center rounded-lg bg-emerald-700 text-white dark:bg-emerald-600">
                <Code2 className="size-4" aria-hidden="true" />
              </span>
              <span className="grid text-left leading-tight">
                <span className="text-sm font-semibold tracking-tight">CodePath</span>
                <span className="text-[11px] text-muted-foreground">{isStudent ? "Student" : "Mentor"} workspace</span>
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="gap-1 py-3">
        <NavMain routes={routes} />
        <div className="mt-auto mx-3 mb-2 flex items-center gap-2 rounded-xl border border-sidebar-border/70 bg-sidebar-accent/40 px-3 py-3 text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            <BookOpenCheck className="size-3.5" aria-hidden="true" />
          </span>
          <span className="leading-5">Learn a little. Build a lot.</span>
        </div>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border/70 p-2">
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
