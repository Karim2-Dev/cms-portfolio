"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRef, useState } from "react";
import { LuUser } from "react-icons/lu";

export default function ImageProfile({
  defaultImg,
  isEditMode,
  onChange,
}: {
  defaultImg: string | null | undefined;
  isEditMode: boolean;
  onChange: (value: File) => void;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const url = URL.createObjectURL(file);

    setPreview(url);

    onChange(file);
  };

  const imageToShow = preview || defaultImg;
  return (
    <div
      className={cn(
        `w-full h-full bg-muted/50 border border-dashed relative`,
        ` border-border p-3 rounded-lg `,
        ` ${isEditMode ? "hover:!border-primary hover:!text-primary/20 cursor-pointer" : ""} transition-all`,
        `${isEditMode ? "opacity-100 " : "opacity-50"}`,
      )}
    >
      <div className="flex flex-col gap-2 justify-center items-center w-full h-full">
        <div className="relative w-[80px] h-[80px] rounded-full overflow-hidden bg-muted">
          {imageToShow ? (
            <Image
              src={imageToShow}
              alt="profile-image"
              fill
              sizes="80px"
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-muted-foreground">
              <LuUser size={32} />
            </div>
          )}
        </div>

        <span className="text-md font-semibold cursor-default">
          Upload photo
        </span>
      </div>

      <input
        ref={inputRef}
        onChange={handleFileChange}
        type="file"
        className={`opacity-0 absolute w-full h-full top-0 left-0 ${
          isEditMode ? "cursor-pointer" : "cursor-default"
        }`}
        disabled={!isEditMode}
      />
    </div>
  );
}
