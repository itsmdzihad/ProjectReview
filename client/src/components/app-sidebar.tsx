"use client";

import Link from "next/link";
import { Code2 } from "lucide-react";
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
import type { AuthUser } from "@/types";

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  userRole: DashboardRole;
  userProfile: Pick<AuthUser, "name" | "email">;
};

export function AppSidebar({ userRole, userProfile, ...props }: AppSidebarProps) {
  const isStudent = userRole === "student";
  const routes = isStudent ? studentRoutes : mentorRoutes;
  const user = { ...userProfile, avatar: "" };

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
                <span className="text-sm font-semibold tracking-tight">
                  CodePath
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {isStudent ? "Student" : "Mentor"} workspace
                </span>
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="gap-1 py-3">
        <NavMain routes={routes} />
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border/70 p-2">
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
