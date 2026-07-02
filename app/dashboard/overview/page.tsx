/* eslint-disable @typescript-eslint/no-explicit-any */
import HeadingPage from "@/components/HeadingPage";
import AddProjectCard from "@/components/projectcard/AddProjectCard";
import ProjectCard from "@/components/projectcard/ProjectCard";

import { supabase } from "@/src/lib/supabaseClient";
import { Project } from "@/src/types/tProjects";

export default async function page() {
  const { data: projects, error } = (await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false })) as {
    data: Project[];
    error: any;
  };
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="overview">
      <div className="container py-5 px-3 md:px-10 ">
        <HeadingPage
          title="overview"
          subtitle="Manage your digital showcase and track project performance."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
          {projects.map((project) => (
            <ProjectCard key={project.id} data={project} />
          ))}
          <AddProjectCard />
        </div>
      </div>
    </div>
  );
}
