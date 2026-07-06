"use client";
import { useState, useEffect } from "react";
import { HiPlus } from "react-icons/hi2";
import ProjectForm from "./ProjectForm";

export default function AddProjectCard() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="w-full">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="project-card border-2 border-dashed select-none !border-primary/30 cursor-pointer hover:!border-primary min-h-[460px] w-full rounded-md transition-colors"
      >
        <div className="container min-h-[456px] flex flex-col items-center justify-center gap-2 px-3">
          <HiPlus className="w-15 h-15 text-primary p-2 rounded-full bg-primary/20" />
          <h2 className="text-primary text-lg font-semibold">
            Add New Project
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm text-center">
            Create a new project entry for your portfolio.
          </p>
        </div>
      </div>

      <ProjectForm isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
