"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose, IoSearch } from "react-icons/io5";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRef } from "react";

export default function MobileNavSearch() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const handleReset = () => {
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
      searchInputRef.current.focus();
    }
  };
  return (
    <>
      <Button
        variant={"default"}
        className="lg:hidden cursor-pointer"
        onClick={() => setIsSearchOpen((prev) => !prev)}
      >
        <IoSearch className="w-5 h-5" />
      </Button>
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 10, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute bottom-[-45px] h-12 left-5 right-5 rounded-full bg-accent border-border search-bar-mobile lg:hidden"
          >
            <div className="container h-full w-full mx-auto flex items-center gap-2 px-4 py-2">
              <input
                type="text"
                placeholder="Search..."
                ref={searchInputRef}
                autoFocus
                className="w-full bg-transparent outline-none text-sm placeholder:text-muted-foreground"
              />

              <div className="flex items-center gap-2">
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="lg:hidden cursor-pointer"
                  onClick={() => {
                    handleReset();
                  }}
                >
                  <IoClose className="w-5 h-5" />
                </Button>
                <Link
                  href={`/search`}
                  className="lg:hidden cursor-pointer p-1.5 hover:bg-primary/80 bg-primary text-primary-foreground  transition-all rounded-md "
                >
                  <IoSearch className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
