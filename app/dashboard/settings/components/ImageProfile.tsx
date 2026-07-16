import { cn } from "@/lib/utils";
import Image from "next/image";
import { LuUser } from "react-icons/lu";

export default function ImageProfile({
  defaultImg,
  isEditMode,
}: {
  defaultImg: string | null | undefined;
  isEditMode: boolean;
}) {
  return (
    <div
      className={cn(
        `w-full h-full bg-muted/50 border border-dashed`,
        ` border-border p-3 rounded-lg `,
        ` ${isEditMode ? "hover:!border-primary hover:!text-primary/20 cursor-pointer" : ""} transition-all`,
        `${isEditMode ? "opacity-100 " : "opacity-50"}`,
      )}
    >
      <div className="flex flex-col gap-2 justify-center items-center w-full h-full">
        {defaultImg ? (
          <Image
            src={defaultImg}
            alt="profile-image"
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-1 text-muted-foreground overflow-hidden rounded-full">
            <LuUser size={32} />
          </div>
        )}
        <span className="text-md font-semibold cursor-default">
          Upload photo
        </span>
      </div>
    </div>
  );
}
