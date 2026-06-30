"use client";
import { SidebarGroup } from "../ui/sidebar";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/links";

export default function PagesNavigator() {
  const pathname = usePathname();
  const currentPath = pathname.split("/")[2];
  return (
    <SidebarGroup>
      <ul className="flex flex-col gap-2">
        {navLinks.map(({ href, label, segment, icon: Icon }) => (
          <li key={segment}>
            <Link
              className={`${currentPath === segment ? "active" : ""} flex items-center gap-2 text-md `}
              href={href}
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </SidebarGroup>
  );
}
