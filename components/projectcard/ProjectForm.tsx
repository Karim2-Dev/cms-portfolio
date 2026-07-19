/* eslint-disable react-hooks/incompatible-library */

"use client";
import { IoClose } from "react-icons/io5";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "@/components/ui/textarea";
import { InputTags } from "@/components/base/input/input-tags";
import { Controller } from "react-hook-form";
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
import { Project } from "@/src/types/tProjects";
import { ProjectFormProps } from "@/src/types/tsProjectForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectFormData, projectSchema } from "@/lib/schemas/project-schema";
import ErrorMsg from "@/components/ErrorMsg";
import { toast } from "sonner";

export default function ProjectForm({
  isOpen,
  setIsOpen: setIsOpen,
  initialData,
  mode,
}: ProjectFormProps) {
  const {
    addProject,
    editProject: editProjectStore,
    isLoading,
  } = useAdminStore();
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialData?.thumbnail ?? null,
  );

  const {
    getValues,
    formState: { errors },
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    reset,
  } = useForm<projectFormData>({
    resolver: zodResolver(projectSchema),
    mode: "onChange",
    defaultValues: {
      title: initialData?.title ?? "",
      description: initialData?.description ?? "",
      tags: initialData?.tags ?? [],
      "github-url": initialData?.github_url?.replace(/^https?:\/\//, "") ?? "",
      "live-url": initialData?.live_url?.replace(/^https?:\/\//, "") ?? "",
      image: undefined,
    },
  });
  const image = watch("image");

  // Handles
  const handleCancelBtn = () => {
    reset();
    setIsOpen(false);
  };
  const handleRemoveImage = () => {
    setValue("image", undefined);
    setPreviewUrl(null);
  };

  async function onSubmit(data: projectFormData) {
    if (!data?.title || data.title.trim() === "") {
      return;
    }

    const slug = data.title
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

    const imageFile = getValues("image");

    const payload: Omit<Project, "id" | "created_at" | "thumbnail"> = {
      title: data.title,
      slug,
      description: data.description,
      live_url: `https://${data["live-url"]?.replace(/^https?:\/\//, "") ?? ""}`,
      github_url: `https://${data["github-url"]?.replace(/^https?:\/\//, "") ?? ""}`,
      is_featured: initialData?.is_featured ?? false,
      tags: data.tags,
    };

    if (mode === "add") {
      const result = await addProject(payload, imageFile as File);
      if (result.success) {
        handleCancelBtn();
        toast.success("Project added successfully", {
          description: "The project has been added to the database.",
          position: "top-center",
        });
      } else {
        toast.error("Failed to add project", {
          description: "The project could not be added to the database.",
          position: "top-center",
        });
      }
    } else {
      const result = await editProjectStore(
        payload,
        imageFile as File,
        initialData?.id ?? "",
      );
      if (result.success) {
        handleCancelBtn();
        toast.success("Project edited successfully", {
          description: "The project has been updated in the database.",
          position: "top-center",
        });
      } else {
        toast.error("Failed to edit project", {
          description: "The project could not be updated in the database.",
          position: "top-center",
        });
      }
    }
  }

  //UseEffects
  useEffect(() => {
    if (isOpen) {
      reset({
        title: initialData?.title ?? "",
        description: initialData?.description ?? "",
        tags: initialData?.tags ?? [],
        "github-url":
          initialData?.github_url?.replace(/^https?:\/\//, "") ?? "",
        "live-url": initialData?.live_url?.replace(/^https?:\/\//, "") ?? "",
        image: undefined,
      });
      setPreviewUrl(initialData?.thumbnail ?? null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initialData?.id, reset]);

  useEffect(() => {
    if (image instanceof File) {
      const url = URL.createObjectURL(image);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [image]);

  return (
    <div
      className={`fixed inset-0 z-100 flex items-center justify-center py-5 px-3
        ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      {/* Backdrop - عنصر منفصل، أنيميشن fade بس */}
      <div
        onClick={() => setIsOpen(false)}
        className={`absolute inset-0 backdrop-blur-sm transition-opacity duration-300 ease-out
          ${isOpen ? "opacity-100" : "opacity-0"}`}
      />

      {/* Modal - عنصر منفصل، أنيميشن دخول حقيقي (scale + translate + opacity) */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`relative container bg-surface w-100 border border-border rounded-lg md:w-185 max-h-[85vh] flex flex-col
          transition-all duration-300 ease-out
          ${
            isOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-4 pointer-events-none"
          }`}
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
              type="button"
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
                aria-invalid={!!errors.title}
                {...register("title")}
                id="title"
                autoComplete="off"
                placeholder="e.g., Quantum Portflio v2.0"
              />
              <ErrorMsg message={errors.title?.message} />
            </Field>
            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                aria-invalid={!!errors.description}
                minLength={3}
                maxLength={1000}
                id="description"
                {...register("description")}
                autoComplete="off"
                placeholder=" A brief description of the project, highlighting its key features and purpose."
              ></Textarea>
              <ErrorMsg message={errors.description?.message} />
            </Field>
            <Field>
              <Controller
                name="tags"
                control={control}
                render={({ field, fieldState }) => (
                  <InputTags
                    className="w-full"
                    value={field.value ?? []}
                    onChange={field.onChange}
                    isRequired
                    label="Technologies"
                    placeholder="e.g., React, Node.js, Tailwind CSS"
                    isInvalid={!!fieldState.error}
                  />
                )}
              />
              <ErrorMsg message={errors.tags?.message} />
            </Field>

            <div className="flex flex-col md:flex-row w-full justify-between gap-2 ">
              <Field>
                <FieldLabel htmlFor="project-url">Project URL</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    aria-invalid={!!errors["live-url"]}
                    {...register("live-url")}
                    id="project-url"
                    placeholder="example.com"
                  />
                  <InputGroupAddon>
                    <InputGroupText>https://</InputGroupText>
                  </InputGroupAddon>
                  <InputGroupAddon align="inline-end">
                    <InfoIcon />
                  </InputGroupAddon>
                </InputGroup>
                <ErrorMsg message={errors["live-url"]?.message} />
              </Field>
              <Field>
                <FieldLabel htmlFor="github-url">GitHub URL</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    aria-invalid={!!errors["github-url"]}
                    {...register("github-url")}
                    id="github-url"
                    placeholder="example.com"
                  />
                  <InputGroupAddon>
                    <InputGroupText>https://</InputGroupText>
                  </InputGroupAddon>
                  <InputGroupAddon align="inline-end">
                    <InfoIcon />
                  </InputGroupAddon>
                </InputGroup>
                <ErrorMsg message={errors["github-url"]?.message} />
              </Field>
            </div>

            {previewUrl ? (
              <ImagePreview img={previewUrl} onRemove={handleRemoveImage} />
            ) : (
              <AddThumbnail
                setImage={(file) => setValue("image", file as File)}
              />
            )}
            <ErrorMsg message={errors.image?.message} />
          </FieldGroup>
        </div>

        <div
          dir="rtl"
          className="text-md bottom border-t bg-surface py-5 px-3 w-full absolute left-0 bottom-0 flex items-center gap-5 flex-shrink-0 z-10"
        >
          <button
            disabled={isLoading}
            type="submit"
            className="text-white dark:text-gray-900 btn bg-primary transition-transform py-1.5 px-4 rounded-md cursor-pointer scale-100 hover:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2Icon className="w-4 h-4 animate-spin" />}
            Save Project
          </button>
          <button
            disabled={isLoading}
            type="button"
            className="btn cursor-pointer"
            onClick={handleCancelBtn}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
