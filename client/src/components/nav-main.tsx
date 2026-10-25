"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { Route } from "@/types";

export function NavMain({ routes }: { routes: Route[] }) {
  const pathname = usePathname();

  return (
    <>
      {routes.map((group) => (
        <SidebarGroup key={group.title}>
          <SidebarGroupLabel className="text-[11px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
            {group.title}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {group.items.map((item) => {
                const Icon = item.icon;
                const itemPath = item.url.split("#")[0] || "/";

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      render={<Link href={item.url} />}
                      isActive={pathname === itemPath}
                      tooltip={item.title}
                    >
                      {Icon && <Icon aria-hidden="true" />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
}
