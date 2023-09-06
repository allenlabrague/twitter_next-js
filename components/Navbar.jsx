"use client";

import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CreateTweet from "@app/create-tweet/page";
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineUpload,
  AiOutlineSearch,
  AiOutlineHeart,
} from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import { signIn, useSession, getProviders } from "next-auth/react";

const Navbar = () => {
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
    <nav className="fixed bottom-0 flex items-center justify-around w-full bg-white z-10 dark:bg-[#121212]">
      {session?.user ? (
        <>
          <div className="flex items-center justify-around w-full p-5">
            <Link href="/">
              <AiOutlineHome fontSize={25} />
            </Link>
            <Link href="/search">
              <AiOutlineSearch fontSize={25} />
            </Link>
            <Sheet>
              <SheetTrigger>
                <button className="flex items-center justify-center">
                  <AiOutlineUpload fontSize={25} />
                </button>
              </SheetTrigger>
              <SheetContent
                side="bottom"
                className="w-full h-auto dark:bg-[#121212] rounded-t-3xl border-t border-gray-200 dark:border-none"
              >
                <SheetHeader>
                  <SheetTitle className="mb-2 font-medium">
                    New thread
                  </SheetTitle>
                  <SheetDescription>
                    <CreateTweet />
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
            <Link href="/activity">
              <AiOutlineHeart fontSize={25} />
            </Link>
            <Link href="/profile">
              <AiOutlineUser fontSize={25} />
            </Link>
          </div>
        </>
      ) : (
        <>
          {providers &&
            Object.values(providers).map((provider) => (
              <div className="relative w-full h-screen">
                <Image
                  src="/bgThreads.svg"
                  fill
                  alt="threads"
                  className="absolute top-0 bottom-0 left-0 right-0 mx-auto"
                />
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="absolute bottom-24 z-10 left-0 right-0 mx-auto w-[90%] bg-white rounded-xl p-5 flex items-center justify-between shadow-xl dark:bg-[#2C2C2C]"
                >
                  <h2 className="text-black dark:text-white text-sm">
                    Continue with Google
                  </h2>
                  <Image
                    src="/google.svg"
                    width={30}
                    height={30}
                    alt="home-icon"
                  />
                </button>
              </div>
            ))}
        </>
      )}
    </nav>
  );
};

export default Navbar;
