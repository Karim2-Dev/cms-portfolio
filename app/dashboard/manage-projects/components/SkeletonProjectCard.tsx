import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonProjectCard() {
  return (
    <div className="project-card bg-surface border border-border w-full flex flex-col justify-between min-h-[460px] rounded-md overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-background-secondary dark:bg-background-secondary-dark">
      {/* 📸 جزء الصورة بعد فك التعليق وتعديل الـ Classes */}
      <div className="img-wrapper border-b-2 border-border relative h-56 w-full overflow-hidden bg-muted">
        <Skeleton className="aspect-video w-full" />
      </div>

      {/* 📝 محتوى الكارت */}
      <div className="px-3 py-5 flex flex-col gap-5 flex-grow justify-between">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-2/3" />
            <div className="icons flex items-center gap-2 text-gray-800 dark:text-white cursor-pointer mr-1">
              <Skeleton className="h-4 w-5" />
              <Skeleton className="h-4 w-5" />
            </div>
          </div>

          <Skeleton className="h-4 w-1/2" />
        </div>

        <div className="space-y-4">
          {/* الـ Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          {/* زر الـ Link */}
          <div className="view-project pt-3 border-t border-border">
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    </div>
  );
}
