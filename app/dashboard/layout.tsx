import Navbar from "@/components/navbar/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/Sidebar";
import "./layout.css";
import MobileNav from "@/components/mobileNav/MobileNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="relative w-full ">
        <Navbar />

        <section className="pt-17">{children}</section>
      </main>
      <MobileNav />
    </SidebarProvider>
  );
}
