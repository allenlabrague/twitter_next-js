"use client";

import { useState, useEffect } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";

const RightNavbar = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {};

  return (
    <section>
      <form className="flex items-center justify-center relative">
        <input
          type="text"
          placeholder="Search Twitter"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="bg-[#1F2327] p-2 rounded-full w-[300px] placeholder:text-[#5E6569] pl-14 relative focus:outline-none focus:shadow-outline"
        />
        <HiMagnifyingGlass
          color="#5E6569"
          fontSize={20}
          className="absolute left-5"
        />
      </form>
    </section>
  );
};

export default RightNavbar;
