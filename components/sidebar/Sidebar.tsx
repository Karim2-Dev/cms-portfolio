import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import PagesNavigator from "./PagesNavigator";
import AddProjectBtn from "./AddProjectBtn";
import Logout from "./Logout";

export function AppSidebar() {
  return (
    <div className="hidden md:block bg-surface ">
      <Sidebar className="pt-5 px-2 sidebar ">
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
        </SidebarContent>
        <SidebarFooter>
          <SidebarGroup className="flex flex-col gap-3">
            <AddProjectBtn />

            <div className="border-t border-border pt-2">
              <Logout />
            </div>
          </SidebarGroup>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
}
