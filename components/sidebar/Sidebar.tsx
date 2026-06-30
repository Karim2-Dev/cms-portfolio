import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Link from "next/link";
import PagesNavigator from "./PagesNavigator";

export function AppSidebar() {
  return (
    <Sidebar className="py-5 px-2 sidebar">
      <SidebarHeader>
        <div>
          <h1>Portflio CMS</h1>
          <p>Admin Dashboard</p>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          {/* Links */}
          <PagesNavigator />
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
