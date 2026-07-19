import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import "./navbar.css";
import { SidebarTrigger } from "../ui/sidebar";
import { currentUser } from "@clerk/nextjs/server";
import Search from "./Search";
export default async function Navbar() {
  const user = await currentUser();
  const fullName = user?.fullName;
  const initials = user
    ? `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase()
    : "U";

  return (
    <nav className="absolute top-0 left-0 w-full h-17 border-b border-b-border z-50 bg-background">
      <div className="container px-5 md:px-5 flex h-full items-center justify-between">
        <div className="left-side flex items-center gap-4">
          <SidebarTrigger />
          <h3 className="md:hidden">Portfolio CMS</h3>
          <Search />
        </div>
        <div className="right-side flex items-center ">
          <p className="hidden md:block text-sm font-medium">
            Welcome, &nbsp; <span>{fullName}</span>
          </p>
          <Avatar className="ml-5">
            <AvatarImage src={user?.imageUrl} alt="avatar" />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
}
