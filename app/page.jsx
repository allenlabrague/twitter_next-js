"use client";

import { useState, useEffect } from "react";
import Feed from "@components/Feed";
import Image from "next/image";
import CreateTweet from "./create-tweet/page";

import Link from "next/link";
import { getProviders, useSession } from "next-auth/react";

const Home = () => {
  const [providers, setProviders] = useState(null);

  const { data: session } = useSession();

  useEffect(() => {
    const setUpProviders = async () => {
      const res = await getProviders();

      setProviders(res);
    };

    setUpProviders();
  }, []);
  return (
    <section className="w-[900px] h-screen flex-center flex-col border-[#2F3336] border-l-[1px] border-r-[1px] overflow-y-auto z-10">
      <div className="flex items-center justify-between p-4  bg-black/30 backdrop-blur-sm border-b-[1px] border-[#2F3336] fixed w-[56%] z-50">
        <h1 className="text-xl text-[#D9D9D9] font-bold">Home</h1>
        <Image src="/spark.svg" width={25} height={25} alt="spark-icon" />
      </div>
      <div className="mt-16">
        {session?.user ? (
          <div className="w-full">
            <div className="flex items-center gap-4 p-4 w-full">
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
        )}

        <Feed />
      </div>
    </section>
  );
};

export default Home;
