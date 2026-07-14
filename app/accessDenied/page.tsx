import { SignOutButton } from "@clerk/nextjs";
import { IoLogOutOutline } from "react-icons/io5";

export default function page() {
  return (
    <div className="access denied flex items-center justify-center h-screen">
      <div className="content text-center space-y-4">
        <h1>Sorry but you don&apos;t have access to this application.</h1>
        <p>please contact Admin or Moderator </p>
        <SignOutButton>
          <button className=" w-full text-start text-sm font-medium rounded-md cursor-pointer text-destructive hover:bg-destructive/10 py-1.5 px-5 transition-colors flex items-center gap-2">
            <IoLogOutOutline className="w-5 h-5 shrink-0" />
            Logout
          </button>
        </SignOutButton>
      </div>
    </div>
  );
}
