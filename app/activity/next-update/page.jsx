"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { IoChevronBack } from "react-icons/io5";

const Home = () => {
  const { data: session } = useSession();

  if (!session?.user) {
    redirect("/");
  }

  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  let greeting = "";

  if (currentHour >= 5 && currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }
  return (
    <section className="p-2 mb-16">
      <div className="p-4 bg-white dark:bg-[#121212]">
        <Link href="/activity" className="flex items-center gap-2">
          <IoChevronBack fontSize={20} />
          <p>Back</p>
        </Link>
      </div>
      <div>
        <h1 className="my-5 text-xl font-bold">
          Hello,{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-extrabold">
            {session?.user.name}.
          </span>{" "}
          {greeting}, Let's talk about the next update I wanted to do in this
          Threads Clone.
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-[40px] h-[3px] rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400" />
        <h3 className="my-2 text-sm bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-medium">
          Image
        </h3>
      </div>
      <div className="w-full">
        <h2 className="my-4">
          The first thing I want to do is not only allow text posts; I also want
          users to be able to post images, as shown in the example below :
        </h2>
        <Image
          src={"/preview.png"}
          width={300}
          height={300}
          alt="Image"
          className="mx-auto"
        />
      </div>
      <div className="my-4">
        <div className="flex items-center gap-4">
          <div className="w-[40px] h-[3px] rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400" />
          <h3 className="text-sm bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-medium">
            Bio
          </h3>
        </div>
        <h2 className="my-4">
          I plan to allow users to add a bio to their profiles for a more
          personal touch.
        </h2>
      </div>

      <div className="my-4">
        <div className="flex items-center gap-4">
          <div className="w-[40px] h-[3px] rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400" />
          <h3 className="text-sm bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-medium">
            Custom Name
          </h3>
        </div>
        <h2 className="my-4">
          I also plan to let users set a custom display name to enhance their
          profiles.
        </h2>
      </div>

      <div className="my-4">
        <div className="flex items-center gap-4">
          <div className="w-[40px] h-[3px] rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400" />
          <h3 className="text-sm bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-medium">
            Custom Account
          </h3>
        </div>
        <h2 className="my-4">
          Another feature I'm working on is custom accounts, allowing users to
          sign up with temporary email and password, exclusively for Threads
          Clone.
        </h2>
      </div>
      <div className="my-4">
        <div className="flex items-center gap-4">
          <div className="w-[40px] h-[3px] rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400" />
          <h3 className="text-sm bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-medium">
            Delete Account
          </h3>
        </div>
        <h2 className="my-4">
          I'm also planning to implement a feature to delete user accounts,
          which will remove all posts and account data.
        </h2>
      </div>
      <h2 className="my-10 text-sm text-center text-gray-500 dark:text-white">
        That's all, folks! Thank you for reading. I hope you enjoy using this
        Threads Clone. Stay updated with this project! ❤️🥰
      </h2>
    </section>
  );
};

export default Home;
