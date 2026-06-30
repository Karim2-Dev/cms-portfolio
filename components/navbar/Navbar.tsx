import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoIosSearch } from "react-icons/io";
import "./navbar.css";
export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full h-17 border-b border-b-border z-50 bg-background">
      <div className="container px-5 md:px-5 flex h-full items-center justify-between">
        <div className="left-side">
          <h3 className="md:hidden">Portfolio CMS</h3>
          <div className="search hidden md:w-88 h-9 md:flex justify-center items-center gap-5 bg-accent px-3 py-1 rounded-sm outline-none ">
            <IoIosSearch />
            <input
              type="text"
              className=" h-full w-full"
              placeholder="Search products..."
            />
          </div>
        </div>
        <div className="right-side flex items-center ">
          <p className="hidden md:block text-sm font-medium">
            Welcome, &nbsp; <span>{"Karim Same"}r</span>
          </p>
          <Avatar className="ml-5">
            <AvatarImage src="/images/avatar.jpg" alt="avatar" />
            <AvatarFallback>KS</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
}
