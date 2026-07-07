import Image from "next/image";
import { Trash2Icon } from "lucide-react";

export default function ImagePreview({
  img = "",
  onRemove,
}: {
  img: string;
  onRemove?: () => void;
}) {
  if (!img) return null;
  return (
    <div className="flex flex-col gap-2 w-full h-100 overflow-hidden">
      <p className="text-sm">Project Thumbnail</p>

      <div className="img-wrapper relative w-full h-full border border-border rounded-md overflow-hidden group">
        <Image
          src={img}
          alt="Project thumbnail"
          fill
          className="object-cover h-full"
        />
        {onRemove && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              type="button"
              onClick={onRemove}
              className="bg-destructive text-white p-2.5 rounded-full transition-transform hover:scale-110 cursor-pointer shadow-lg flex items-center justify-center hover:bg-destructive/90"
              title="Remove image"
            >
              <Trash2Icon className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
