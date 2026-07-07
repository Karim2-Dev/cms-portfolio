"use client";
import { HiMiniPlusSmall } from "react-icons/hi2";
import { useState } from "react";
import ProjectForm from "../projectcard/ProjectForm";

export default function AddProjectBtn() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="text-sm w-full text-start font-semibold cursor-pointer bg-primary hover:bg-primary/80 transition-colors rounded-sm py-2 px-5 flex items-center gap-2 text-white dark:text-black"
      >
        <HiMiniPlusSmall className="w-5 h-5 shrink-0" />
        Create New Project
      </button>
      <ProjectForm isOpen={isOpen} setIsOpen={setIsOpen} mode="add" />
    </div>
  );
}
