"use client";
import HeadingPage from "@/components/HeadingPage";
import AddProjectCard from "@/components/projectcard/AddProjectCard";
import ProjectCard from "@/components/projectcard/ProjectCard";

import { useAdminStore } from "@/src/store/projectsStore";
import { useEffect } from "react";

export default function Page() {
  const { projects, fetchProjects } = useAdminStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <div className="over-view">
      <div className="container py-5 px-3 md:px-10  ">
        <HeadingPage
          title="overview"
          subtitle="Manage your digital showcase and track project performance."
        />
        <div className="place-items-center md:place-items-baseline grid md:grid-cols-2 lg:grid-cols-3 gap-5 ">
          {projects.map((project) => (
            <ProjectCard key={project.id} data={project} />
          ))}
          <AddProjectCard />
        </div>
      </div>
    </div>
  );
}
