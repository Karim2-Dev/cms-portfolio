"use client";
import HeadingPage from "@/components/HeadingPage";
import AddProjectCard from "@/app/dashboard/manage-projects/components/AddProjectCard";
import ProjectCard from "@/app/dashboard/manage-projects/components/ProjectCard";
import SkeletonProjectCard from "@/app/dashboard/manage-projects/components/SkeletonProjectCard";

import { useAdminStore } from "@/src/store/projectsStore";
import { useEffect } from "react";

export default function Page() {
  const { projects, fetchProjects, isLoading } = useAdminStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <div className="over-view">
      <div className="container mx-auto py-5 px-3 md:px-10  ">
        <HeadingPage
          title="overview"
          subtitle="Manage your digital showcase and track project performance."
        />
        <div className="place-items-center md:place-items-start grid md:grid-cols-2 lg:grid-cols-3 gap-5 ">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <SkeletonProjectCard key={index} />
              ))
            : projects.map((project) => (
                <ProjectCard key={project.id} data={project} />
              ))}

          <AddProjectCard />
        </div>
      </div>
    </div>
  );
}
