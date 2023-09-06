"use client";

import { useState, useEffect } from "react";
import Feed from "@components/Feed";
import Image from "next/image";
import CreateTweet from "./create-tweet/page";
import { useTheme } from "next-themes";
import Link from "next/link";
import { getProviders, useSession } from "next-auth/react";

const Home = () => {
  const [providers, setProviders] = useState(null);
  const { theme, setTheme } = useTheme();

  const { data: session } = useSession();

  useEffect(() => {
    const setUpProviders = async () => {
      const res = await getProviders();

      setProviders(res);
    };

    setUpProviders();
  }, []);
  return (
    <section>
      <div className="flex items-center justify-center w-full p-4 bg-white dark:bg-[#121212]">
        {theme === "dark" ? (
          <Image
            src="/threadswhite.svg"
            width={25}
            height={25}
            alt="threads-icon"
          />
        ) : (
          <Image
            src="/threadsblack.svg"
            width={25}
            height={25}
            alt="threads-icon"
          />
        )}
      </div>
      <div>
        <Feed />
      </div>
    </section>
  );
};

export default Home;
