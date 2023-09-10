"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  AiOutlineHeart,
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineUpload,
  AiOutlineUser,
} from "react-icons/ai";
import { IoChevronBack } from "react-icons/io5";
import { Badge } from "@components/ui/badge";
import { BsThreeDots } from "react-icons/bs";

const DynamicIcons = ({ icon }) => {
  return (
    <Badge className="mx-2" variant="secondary">
      {icon}
    </Badge>
  );
};

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
          {greeting}, Let's talk about this Threads Clone I'm building. Here,
          you will see how it actually works.
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-[40px] h-[3px] rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400" />
        <h3 className="my-2 text-sm bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-medium">
          Navigation
        </h3>
      </div>
      <ul className="list-disc px-12 my-3 marker:text-black dark:marker:text-white flex flex-col gap-2">
        <li className="text-gray-400 leading-relaxed dark:text-white">
          You'll first encounter the Home icon
          <DynamicIcons icon={<AiOutlineHome />} />, where all Threads' posts
          are created.
        </li>
        <li className="text-gray-400 leading-relaxed dark:text-white">
          Next, there's the Search icon
          <DynamicIcons icon={<AiOutlineSearch />} />, where all users are
          listed.
        </li>
        <li className="text-gray-400 leading-relaxed dark:text-white">
          Thirdly, you can post your Threads via the Upload icon
          <DynamicIcons icon={<AiOutlineUpload />} />.
        </li>
        <li className="text-gray-400 leading-relaxed dark:text-white">
          Fourthly, there's the Notifications icon
          <DynamicIcons icon={<AiOutlineHeart />} />, although this page is not
          fully functional yet.
        </li>
        <li className="text-gray-400 leading-relaxed dark:text-white">
          Finally, you'll find the Profile icon
          <DynamicIcons icon={<AiOutlineUser />} />, where you can view your
          posts and personal information.
        </li>
      </ul>
      <div className="flex items-center gap-4">
        <div className="w-[40px] h-[3px] rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400" />
        <h3 className="my-2 text-sm bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-medium">
          Search User
        </h3>
      </div>
      <ul className="list-disc px-12 my-3 marker:text-black dark:marker:text-white flex flex-col gap-2">
        <li className="text-gray-400 leading-relaxed dark:text-white">
          To search for a user in the list, click the
          <DynamicIcons icon={<AiOutlineSearch />} />, then use the search input
          and type to find the user you want to see.
        </li>
      </ul>
      <div className="flex items-center gap-4">
        <div className="w-[40px] h-[3px] rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400" />
        <h3 className="my-2 text-sm bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-medium">
          Edit & Delete
        </h3>
      </div>
      <ul className="list-disc px-12 my-3 marker:text-black dark:marker:text-white flex flex-col gap-2">
        <li className="text-gray-400 dark:text-white leading-relaxed ">
          To delete or edit your Threads post, click the Profile icon
          <DynamicIcons icon={<AiOutlineUser />} />, then view all your Threads
          posts and click the
          <DynamicIcons icon={<BsThreeDots />} /> icon. Once you click it, you
          will see the Delete & Edit buttons.
        </li>
      </ul>
      <div className="flex items-center gap-4">
        <div className="w-[40px] h-[3px] rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400" />
        <h3 className="my-2 text-sm bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-medium">
          Settings
        </h3>
      </div>
      <ul className="list-disc px-12 my-3 marker:text-black dark:marker:text-white flex flex-col gap-2">
        <li className="text-gray-400 leading-relaxed dark:text-white">
          To change your theme, click the settings button and navigate to the
          dark mode settings to switch themes.
        </li>
        <li className="text-gray-400 leading-relaxed dark:text-white">
          To log out of your account, simply click the settings button.
        </li>
      </ul>
    </section>
  );
};

export default Home;
