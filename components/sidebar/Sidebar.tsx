import { HiMiniPlusSmall } from "react-icons/hi2";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import PagesNavigator from "./PagesNavigator";
import { IoLogOutOutline } from "react-icons/io5";
import AddProjectBtn from "./AddProjectBtn";

export function AppSidebar() {
  return (
    <div className="hidden md:block bg-surface">
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
              <button className=" w-full text-start text-sm font-medium rounded-md cursor-pointer text-destructive hover:bg-destructive/10 py-1.5 px-5 transition-colors flex items-center gap-2">
                <IoLogOutOutline className="w-5 h-5 shrink-0" />
                Logout
              </button>
            </div>
          </SidebarGroup>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
}
