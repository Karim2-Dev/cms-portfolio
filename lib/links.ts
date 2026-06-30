// lib/nav-links.ts
import { LayoutDashboard, FolderKanban, Settings } from "lucide-react";

export const navLinks = [
  {
    href: "/dashboard/overview",
    label: "Overview",
    segment: "overview",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/manage-projects",
    label: "Projects",
    segment: "manage-projects",
    icon: FolderKanban,
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    segment: "settings",
    icon: Settings,
  },
];
