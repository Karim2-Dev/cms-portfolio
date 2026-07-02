import Image from "next/image";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import Tag from "./Tag";
import { ArrowRight } from "lucide-react";
import "./project-card.css";
import { Project } from "@/src/types/tProjects";
export default function ProjectCard({ data }: { data: Project }) {
  return (
    <div className="project-card bg-surface border border-border h-115 w-75 rounded-md overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-background-secondary dark:bg-background-secondary-dark">
      <div className="img-wrapper border-b-2 border-border h-58 w-full overflow-hidden">
        {/* <Image
          src={data.thumbnail || ""}
          alt="e-commerce"
          className="cover  hover:scale-110 transition-all duration-300"
          width={300}
          height={166}
        /> */}
      </div>
      <div className="px-3 py-5 flex flex-col gap-5 ">
        <div className="flex items-center justify-between">
          <h2 className="text-gray-800 dark:text-white">{data.title}</h2>
          <div className="icons flex items-center gap-2 text-gray-800 dark:text-white  cursor-pointer mr-1">
            <button className="transition-colors hover:text-primary">
              <MdOutlineEdit className="w-5 h-5 cursor-pointer transition-colors hover:text-primary" />
            </button>
            <button className="transition-colors cursor-pointer hover:text-primary">
              <RiDeleteBinLine className="w-5 h-5 " />
            </button>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
          {data.description}
        </p>
        <div className="flex items-center gap-2">
          {data.tags?.map((tag, index) => (
            <Tag key={index} skill={tag} />
          ))}
        </div>

        <div className="pt-2.5 border-t ">
          <button className="relative  text-md text-primary cursor-pointer font-semibold hover:text-primary/80 transition-all">
            View Project
            <ArrowRight className=" transition-all w-4 h-4 inline-block ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
