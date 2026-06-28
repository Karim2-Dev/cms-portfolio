import ModeToggle from "@/components/DarkModeSwitcher";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full">
      <Navbar />
      <ModeToggle />
    </div>
  );
}
