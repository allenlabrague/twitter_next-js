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
import { ThemeSwitcher } from "./ThemeSwitcher";
import { AiOutlineHome, AiOutlineUser, AiOutlineUpload } from "react-icons/ai";
import { PiSignOutFill } from "react-icons/pi";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { Separator } from "./ui/separator";

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
    <nav className="fixed bottom-0 flex items-center justify-around w-full bg-white z-10 dark:bg-black">
      {session?.user ? (
        <>
          <div className="flex items-center justify-around w-full p-5">
            <Link href="/" className="">
              <AiOutlineHome fontSize={25} />
            </Link>
            <Link href="/profile" className="">
              <AiOutlineUser fontSize={25} />
            </Link>
            <Sheet>
              <SheetTrigger>
                <button className="flex items-center justify-center">
                  <AiOutlineUpload fontSize={25} />
                </button>
              </SheetTrigger>
              <SheetContent side="bottom" className="w-full h-auto">
                <SheetHeader>
                  <SheetTitle className="mb-2">New thread</SheetTitle>
                  <Separator />
                  <SheetDescription>
                    <CreateTweet />
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
            <ThemeSwitcher />
            <button type="button" onClick={signOut} className="">
              <PiSignOutFill fontSize={25} />
            </button>
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
                  <h2 className="text-gray-400 dark:text-white text-sm hover:text-black transition-colors">
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
