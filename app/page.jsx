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
      <div className="flex items-center justify-center w-full p-4 bg-white dark:bg-black">
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
        {/* {session?.user ? (
          <div className="">
            <div className="">
              <Image
                src={session?.user.image}
                width={50}
                height={50}
                alt="user-profile"
                className="rounded-full"
              />
              <CreateTweet />
            </div>
          </div>
        ) : (
          <>
            <div>
              <h2 className="text-xl text-gray-400 text-center p-4">
                Sign in to tweet and update your friends
              </h2>
            </div>
          </>
        )} */}
        <Feed />
      </div>
    </section>
  );
};

export default Home;
