"use client";
import { SidebarGroup } from "../ui/sidebar";
import Link from "next/link";

import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard/overview", label: "Overview", segment: "overview" },
  {
    href: "/dashboard/manage-projects",
    label: "Manage Projects",
    segment: "manage-projects",
  },
  { href: "/dashboard/settings", label: "Settings", segment: "settings" },
];

export default function PagesNavigator() {
  const pathname = usePathname();
  const currentPath = pathname.split("/")[2];
  return (
    <SidebarGroup>
      <ul className="flex flex-col gap-2">
        {links.map(({ href, label, segment }) => (
          <li key={segment}>
            <Link
              className={currentPath === segment ? "active" : ""}
              href={href}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </SidebarGroup>
  );
}
