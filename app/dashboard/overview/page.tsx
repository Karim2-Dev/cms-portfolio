"use client";
import HeadingPage from "@/components/HeadingPage";
import AddProjectCard from "@/components/projectcard/AddProjectCard";
import ProjectCard from "@/components/projectcard/ProjectCard";

import { supabase } from "@/src/lib/supabaseClient";
import { Project } from "@/src/types/tProjects";
import { useEffect, useState } from "react";

export default function Page() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getProjects() {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        setError(error.message);
        return;
      }

      setProjects(data);
    }

    getProjects();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("projects")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "projects",
        },
        async () => {
          const { data } = await supabase
            .from("projects")
            .select("*")
            .order("created_at", { ascending: false });

          setProjects(data ?? []);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  if (error) return <div>Error: {error}</div>;
  return (
    <div className=" ">
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
