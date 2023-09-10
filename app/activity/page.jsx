"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { AiOutlineLink } from "react-icons/ai";

const Home = () => {
  const { data: session } = useSession();
  const [activeFilter, setActiveFilter] = useState("All");

  if (!session?.user) {
    redirect("/");
  }

  return (
    <section className="p-2">
      <h1 className="text-3xl font-semibold my-1">Activity</h1>
      <div className="flex items-center gap-2 mt-2 overflow-x-auto">
        {[
          "All",
          "Follows",
          "Replies",
          "Mentions",
          "Quotes",
          "Reposts",
          "Verified",
        ].map((item) => (
          <div
            key={`Section ${item}`}
            onClick={() => setActiveFilter(item)}
            className={`px-5 py-2 rounded-lg border-[1px] h-auto border-gray-200 text-center text-black dark:text-white w-full dark:border-[#1E1E1E] ${
              activeFilter === item
                ? "bg-black text-white border-none dark:bg-white dark:text-black"
                : ""
            }`}
          >
            <button className="w-[100px] font-medium">{item}</button>
          </div>
        ))}
      </div>

      <div className="p-2 border-[1px] border-gray-200 rounded-lg my-4 dark:border-[#1E1E1E]">
        <h2 className=" leading-relaxed">
          Sorry, the Notifications feature is not fully functional on this page.
          It is intended for viewing only. However, I'm going to showcase the
          'What's New' feature that I'll be adding to this Threads Clone!
        </h2>
      </div>
      <Link href="/activity/update">
        <div className="p-2 border-[1px] border-gray-200 rounded-lg my-4 flex items-center w-full justify-between dark:border-[#1E1E1E]">
          <h2 className=" leading-relaxed">Wanna see what's going on?</h2>
          <div className="p-2 border-[1px] border-gray-200 rounded-full mr-3 dark:border-[#1E1E1E]">
            <AiOutlineLink fontSize={20} />
          </div>
        </div>
      </Link>
      <Link href="/activity/next-update">
        <div className="p-2 border-[1px] border-gray-200 rounded-lg my-4 flex items-center w-full justify-between gap-10 dark:border-[#1E1E1E]">
          <h2 className=" leading-relaxed">
            Would you like to preview what I have planned for the next update?
          </h2>
          <div className="p-2 border-[1px] border-gray-200 rounded-full mr-3 dark:border-[#1E1E1E]">
            <AiOutlineLink fontSize={20} />
          </div>
        </div>
      </Link>
    </section>
  );
};

export default Home;
