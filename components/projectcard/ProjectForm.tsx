import { IoClose } from "react-icons/io5";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "@/components/ui/textarea";
import { InputTags } from "@/components/base/input/input-tags";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { InfoIcon } from "lucide-react";
import { Button } from "../ui/button";
import { HiPlus } from "react-icons/hi2";
import { MdOutlineCloudUpload } from "react-icons/md";

export default function ProjectForm({
  isOpen,
  setIsOpne: setIsOpen,
}: {
  isOpen: boolean;
  setIsOpne: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      className={`project-form py-5 px-3 w-full h-full flex items-center justify-center backdrop-blur-sm fixed top-0 left-0 z-100
          ${isOpen ? "opacity-100 pointer-events-auto translate-0" : "opacity-0 pointer-events-none translate-3.5"}`}
      onClick={() => setIsOpen(false)}
    >
      {/* 1. تحديد ارتفاع أقصى للكونتينر واستخدام Flexbox لإدارة العناصر بالداخل */}
      <div
        className="relative container bg-surface w-100 border border-border rounded-lg md:w-185 max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - ثابت فوق */}
        <div className="header w-full flex-shrink-0">
          <div className="py-5 px-3 border-b border-border flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl">Add New Project</h2>
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
                id="title"
                autoComplete="off"
                placeholder="e.g., Quantum Portflio v2.0"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                minLength={3}
                maxLength={1000}
                id="description"
                autoComplete="off"
                placeholder=" A brief description of the project, highlighting its key features and purpose."
              ></Textarea>
            </Field>
            <Field>
              <InputTags
                className="w-full"
                isRequired
                label="Technologies"
                placeholder="e.g., React, Node.js, Tailwind CSS"
              />
            </Field>

            <div className="flex flex-col md:flex-row w-full justify-between gap-2 ">
              <Field>
                <FieldLabel htmlFor="project-url">Project URL</FieldLabel>
                <InputGroup>
                  <InputGroupInput id="project-url" placeholder="example.com" />
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
                  <InputGroupInput id="github-url" placeholder="example.com" />
                  <InputGroupAddon>
                    <InputGroupText>https://</InputGroupText>
                  </InputGroupAddon>
                  <InputGroupAddon align="inline-end">
                    <InfoIcon />
                  </InputGroupAddon>
                </InputGroup>
              </Field>
            </div>

            <div className="relative cursor-pointer project-card border-2 border-dashed select-none !border-primary/30 cursor-pointer hover:!border-primary h-50 w-full rounded-md transition-colors">
              <div className="container h-full flex flex-col items-center justify-center gap-2 px-3">
                <MdOutlineCloudUpload className="w-12 h-12 text-primary p-2 rounded-full bg-primary/20" />
                <h2>Click to upload or drag and drop</h2>
                <p>PNG,JPG, or WEBP up To 5MB</p>
                <input
                  type="file"
                  className="absolute h-full opacity-0 w-full "
                />
              </div>
            </div>
          </FieldGroup>
        </div>

        <div
          dir="rtl"
          className="text-md bottom border-t bg-surface py-5 px-3 w-full absolute left-0 bottom-0 flex items-center gap-5 flex-shrink-0 z-10"
        >
          <button className="text-white dark:text-gray-900 btn bg-primary transition-transform py-1 px-4 rounded-md cursor-pointer scale-100 hover:scale-95">
            Save Project
          </button>
          <button
            className="btn cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
