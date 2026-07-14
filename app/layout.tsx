import {ClerkProvider} from "@clerk/nextjs";
import type { Metadata } from "next";
import { Hanken_Grotesk, JetBrains_Mono, Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import ModeToggle from "@/components/DarkModeSwitcher";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CMS",
  description: "Manage my work in my portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        hankenGrotesk.variable,
        jetbrainsMono.variable,
        "font-sans",
        geist.variable,
      )}
      suppressHydrationWarning
    >
      <body className="relative min-h-full flex flex-col">
        <ClerkProvider>
          <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          >
          {children}
          <ModeToggle />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}