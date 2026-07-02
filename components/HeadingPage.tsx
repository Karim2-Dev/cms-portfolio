import { HeadingPageProps } from "@/src/types/tsDashboard";

export default function HeadingPage({ title, subtitle }: HeadingPageProps) {
  return (
    <div className="flex flex-col items-start justify-start gap-2 mb-7">
      <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
        {title}
      </h1>
      <p className="text-md ">{subtitle}</p>
    </div>
  );
}
