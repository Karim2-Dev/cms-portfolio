import React from "react";
import { MdOutlineCloudUpload } from "react-icons/md";

export default function AddThumbnail({
  setImage,
}: {
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
}) {
  return (
    <div className="relative cursor-pointer project-card border-2 border-dashed select-none !border-primary/30 cursor-pointer hover:!border-primary h-50 w-full rounded-md transition-colors">
      <div className="container h-full flex flex-col items-center justify-center gap-2 px-3">
        <MdOutlineCloudUpload className="w-12 h-12 text-primary p-2 rounded-full bg-primary/20" />
        <h2>Click to upload or drag and drop</h2>
        <p>PNG,JPG, or WEBP up To 5MB</p>
        <input
          type="file"
          className="absolute h-full opacity-0 w-full "
          onChange={(e) => {
            const file = e.target.files?.item(0) ?? null;
            setImage(file);
          }}
        />
      </div>
    </div>
  );
}
