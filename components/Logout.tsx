"use client";
import { useClerk } from "@clerk/nextjs";
import { IoLogOutOutline } from "react-icons/io5";
import { AlertDialogDestructive } from "./AlertSubmitting";

export default function Logout({ size = "full" }: { size?: string }) {
  const { signOut } = useClerk();
  async function handleLogout() {
    await signOut();
  }
  return (
    <div className="log-out">
      <AlertDialogDestructive
        title="Logout"
        description="Are you sure you want to logout?"
        clickName="Logout"
        handleClick={handleLogout}
        btn={
          <button
            className={` w-${size} text-start text-sm font-medium rounded-md cursor-pointer text-destructive hover:bg-destructive/10 py-1.5 px-5 transition-colors flex items-center gap-2`}
          >
            <IoLogOutOutline className="w-5 h-5 shrink-0" />
            Logout
          </button>
        }
      />
    </div>
  );
}
