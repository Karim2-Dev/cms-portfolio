"use client";
import { IoIosSearch } from "react-icons/io";

import MobileNavSearch from "./SearchbarMobile";
export default function Search() {
  return (
    <>
      <div className="search hidden lg:w-88 h-9 lg:flex justify-center items-center gap-5 bg-accent px-3 py-1 rounded-sm outline-none ">
        <IoIosSearch />
        <input
          type="text"
          className=" h-full w-full cursor-pointer"
          placeholder="Search products..."
        />
      </div>

      <MobileNavSearch />
    </>
  );
}
