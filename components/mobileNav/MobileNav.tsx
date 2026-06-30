import { navLinks } from "@/lib/links";
import Link from "next/link";
import { HiMiniPlusSmall, HiPlus } from "react-icons/hi2";
export default function MobileNav() {
  return (
    <div className="flex md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t h-17 w-full">
      <div className="container flex items-center justify-center gap-7 py-2 px-2 ">
        {navLinks.map(({ href, label, segment, icon: Icon }) => (
          <Link
            href={href}
            key={segment}
            className="flex flex-col items-center justify-center gap-1 text-sm hover:text-primary transition-colors"
          >
            <Icon className="w-5 h-5" />
            {label}
          </Link>
        ))}
        <button className="flex items-center justify-center p-2 rounded-full bg-primary text-background hover:bg-primary/90 transition-colors">
          <HiPlus className="w-5 h-5 shrink-0" />
        </button>
      </div>
    </div>
  );
}
