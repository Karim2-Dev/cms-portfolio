import { create } from "zustand";
import { currentUser } from "@clerk/nextjs/server";

export const useUser = create((set) => ({
  user: currentUser(),
}));
