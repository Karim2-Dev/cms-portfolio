/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { IoClose } from "react-icons/io5";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "@/components/ui/textarea";
import { InputTags } from "@/components/base/input/input-tags";
import { useAdminStore } from "@/src/store/projectsStore";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { InfoIcon, Loader2Icon } from "lucide-react";
import AddThumbnail from "./AddThumbnail";
import { useEffect, useState } from "react";
import ImagePreview from "./ImagePreview";
import { ProjectFormData } from "@/src/types/tProjects";
import { ProjectFormProps } from "@/src/types/tsProjectForm";

export default function ProjectForm({
  isOpen,
  setIsOpen: setIsOpen,
  initialData,
  mode,
}: ProjectFormProps) {
  const [image, setImage] = useState<File | null>(null);
  const [project, setProject] = useState<Partial<ProjectFormData>>(
    initialData ?? {},
  );
  const { addProject, editProject: editProjectStore, isLoading } = useAdminStore();

  // Handles
  const handleCancelBtn = () => {
    setProject({});
    setIsOpen(false);
    setImage(null);
  };
  const handleRemoveImage = () => {
    setImage(null);
    setProject((prev) => ({ ...prev, thumbnail: "" }));
  };
  async function addNewProject() {
    if (!project?.title || project.title.trim() === "") {
      return;
    }
    const slug = project.title
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

    const result = await addProject(
      {
        title: project.title,
        slug,
        description: project.description,
        live_url: project.live_url,
        github_url: project.github_url,
        is_featured: false,
        tags: project.tags,
      },
      image,
    );
    if (result.success) {
      handleCancelBtn();
    } else {
      console.error(result.error);
      // ممكن تعرض toast/error state هنا لاحقًا
    }
  }
  async function editProject() {
    if (!project?.title || project.title.trim() === "") return;
    const slug = project.title
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

    const result = await editProjectStore(
      {
        title: project.title,
        slug,
        description: project.description,
        live_url: project.live_url,
        github_url: project.github_url,
        is_featured: initialData?.is_featured ?? false,
        tags: project.tags,
      },
      image,
      initialData?.id ?? "",
    );
    if (result.success) {
      handleCancelBtn();
    } else {
      console.error(result.error);
      // ممكن تعرض toast/error state هنا لاحقًا
    }
  }

  async function handleSaveBtn() {
    if (mode === "add") {
      addNewProject();
    } else if (mode === "edit") {
      editProject();
    }
  }

  function handleOnChangeInput<K extends keyof ProjectFormData>(
    key: K,
    value: ProjectFormData[K],
  ) {
    setProject((prev) => ({ ...prev, [key]: value }));
  }
  //UseEffects
  useEffect(() => {
    if (isOpen) {
      setProject(initialData ?? {});
      setImage(null);
    }
  }, [isOpen, initialData]);

  useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image);
      handleOnChangeInput("thumbnail", url);
      return () => URL.revokeObjectURL(url);
    }
  }, [image]);
  return (
    <div
      className={`project-form py-5 px-3 w-full h-full flex items-center justify-center backdrop-blur-sm fixed top-0 left-0 z-100
          ${isOpen ? "opacity-100 pointer-events-auto translate-0" : "opacity-0 pointer-events-none translate-3.5"}`}
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative container bg-surface w-100 border border-border rounded-lg md:w-185 max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - ثابت فوق */}
        <div className="header w-full flex-shrink-0">
          <div className="py-5 px-3 border-b border-border flex items-center justify-between">
            <div className="flex flex-col gap-1">
              {mode === "add" ? (
                <h2 className="text-2xl">Add New Project</h2>
              ) : (
                <h2 className="text-2xl">Edit Project</h2>
              )}
              <p>Enter the details of your latest work.</p>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="flex cursor-pointer items-center justify-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              <IoClose className="w-5.5 h-5.5 mr-2" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto scrollbar-none body w-full flex-1 py-5 px-3 gap-3.5 pb-24">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="title">Project Title</FieldLabel>
              <Input
                value={project?.title ?? ""}
                onChange={(e) => handleOnChangeInput("title", e.target.value)}
                id="title"
                autoComplete="off"
                placeholder="e.g., Quantum Portflio v2.0"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                onChange={(e) =>
                  handleOnChangeInput("description", e.target.value)
                }
                minLength={3}
                value={project?.description ?? ""}
                maxLength={1000}
                id="description"
                autoComplete="off"
                placeholder=" A brief description of the project, highlighting its key features and purpose."
              ></Textarea>
            </Field>
            <Field>
              <InputTags
                onChange={(tags) => handleOnChangeInput("tags", tags)}
                className="w-full"
                value={project?.tags ?? []}
                isRequired
                label="Technologies"
                placeholder="e.g., React, Node.js, Tailwind CSS"
              />
            </Field>

            <div className="flex flex-col md:flex-row w-full justify-between gap-2 ">
              <Field>
                <FieldLabel htmlFor="project-url">Project URL</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="project-url"
                    value={project?.live_url ?? ""}
                    placeholder="example.com"
                    onChange={(e) =>
                      handleOnChangeInput("live_url", e.target.value)
                    }
                  />
                  <InputGroupAddon>
                    <InputGroupText>https://</InputGroupText>
                  </InputGroupAddon>
                  <InputGroupAddon align="inline-end">
                    <InfoIcon />
                  </InputGroupAddon>
                </InputGroup>
              </Field>
              <Field>
                <FieldLabel htmlFor="github-url">GitHub URL</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    onChange={(e) =>
                      handleOnChangeInput("github_url", e.target.value)
                    }
                    id="github-url"
                    placeholder="example.com"
                    value={project?.github_url ?? ""}
                  />
                  <InputGroupAddon>
                    <InputGroupText>https://</InputGroupText>
                  </InputGroupAddon>
                  <InputGroupAddon align="inline-end">
                    <InfoIcon />
                  </InputGroupAddon>
                </InputGroup>
              </Field>
            </div>

            {project?.thumbnail ? (
              <ImagePreview
                img={project.thumbnail}
                onRemove={handleRemoveImage}
              />
            ) : (
              <AddThumbnail setImage={setImage} />
            )}
          </FieldGroup>
        </div>

        <div
          dir="rtl"
          className="text-md bottom border-t bg-surface py-5 px-3 w-full absolute left-0 bottom-0 flex items-center gap-5 flex-shrink-0 z-10"
        >
          <button
            onClick={handleSaveBtn}
            disabled={isLoading}
            className="text-white dark:text-gray-900 btn bg-primary transition-transform py-1.5 px-4 rounded-md cursor-pointer scale-100 hover:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2Icon className="w-4 h-4 animate-spin" />}
            Save Project
          </button>
          <button className="btn cursor-pointer" onClick={handleCancelBtn}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
