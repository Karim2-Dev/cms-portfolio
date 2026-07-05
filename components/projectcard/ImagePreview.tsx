/* eslint-disable react-hooks/set-state-in-effect */
import Image from "next/image";

export default function ImagePreview({ img = "" }: { img: string }) {
  if (!img) return null;
  return (
    <div className="flex flex-col gap-2 w-full h-100 overflow-hidden">
      <p className="text-sm">Project Thumbnail</p>

      <div className="img-wrapper relative w-full h-full border-1 rounded-md overflow-hidden">
        <Image
          src={img}
          alt="Project thumbnail"
          fill
          className="object-cover h-full "
        />
        <div className="btns"></div>
      </div>
    </div>
  );
}
