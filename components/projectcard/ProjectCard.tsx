import Image from "next/image";
import { MdOutlineEdit } from "react-icons/md";
import Tag from "./Tag";
import { ArrowRight } from "lucide-react";
import "./project-card.css";
import { Project } from "@/src/types/tProjects";
import { AlertDialogDestructive } from "./DeleteProject";
import { useState } from "react";
import ProjectForm from "./ProjectForm";

export default function ProjectCard({ data }: { data: Project }) {
  const [isOpenEditForm, setIsOpenEditForm] = useState<boolean>(false);

  return (
    <div className="project-card bg-surface border border-border w-full flex flex-col justify-between min-h-[460px] rounded-md overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-background-secondary dark:bg-background-secondary-dark">
      {/* 📸 جزء الصورة بعد فك التعليق وتعديل الـ Classes */}
      <div className="img-wrapper border-b-2 border-border relative h-56 w-full overflow-hidden bg-muted">
        {data.thumbnail ? (
          <Image
            src={data.thumbnail}
            alt={data.title || "Project thumbnail"}
            fill // 👈 بيخلي الصورة تملا الـ wrapper بالكامل تلقائياً بشكل متجاوب
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover hover:scale-110 transition-all duration-300" // 👈 object-cover بيمنع تمطيط الصورة
            priority={false}
          />
        ) : (
          // لو مفيش صورة للمشروع يعرض بليس هولدر شيك
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
            No Image Available
          </div>
        )}
      </div>

      {/* 📝 محتوى الكارت */}
      <div className="px-3 py-5 flex flex-col gap-5 flex-grow justify-between">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-gray-800 dark:text-white font-bold text-lg line-clamp-1">
              {data.title}
            </h2>
            <div className="icons flex items-center gap-2 text-gray-800 dark:text-white cursor-pointer mr-1">
              <button
                className="transition-colors hover:text-primary"
                onClick={() => {
                  setIsOpenEditForm(true);
                }}
              >
                <MdOutlineEdit className="w-5 h-5 cursor-pointer transition-colors " />
              </button>

              <AlertDialogDestructive id={data.id} />
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 min-h-[40px]">
            {data.description}
          </p>
        </div>

        <div className="space-y-4">
          {/* الـ Tags */}
          <div className="flex flex-wrap items-center gap-2">
            {data.tags && data.tags.length > 0 ? (
              data.tags.map((tag, index) => <Tag key={index} skill={tag} />)
            ) : (
              <span className="text-xs text-muted-foreground">No tags</span>
            )}
          </div>

          {/* زر الـ Link */}
          <div className="view-project pt-3 border-t border-border">
            <a
              href={data.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative text-md text-primary cursor-pointer font-semibold hover:text-primary/80 transition-all flex items-center gap-1 group"
            >
              View Project
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
      <ProjectForm
        initialData={data}
        isOpen={isOpenEditForm}
        setIsOpen={setIsOpenEditForm}
        mode="edit"
      />
    </div>
  );
}
