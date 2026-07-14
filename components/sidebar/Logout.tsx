"use client";
import { SignOutButton } from "@clerk/nextjs";
import { IoLogOutOutline } from "react-icons/io5";

export default function Logout() {
  return (
    <SignOutButton>
      <button className=" w-full text-start text-sm font-medium rounded-md cursor-pointer text-destructive hover:bg-destructive/10 py-1.5 px-5 transition-colors flex items-center gap-2">
        <IoLogOutOutline className="w-5 h-5 shrink-0" />
        Logout
      </button>
    </SignOutButton>
  );
}
