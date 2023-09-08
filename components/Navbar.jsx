"use client";

import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineUpload,
  AiOutlineSearch,
  AiOutlineHeart,
} from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    if (session?.user) {
      router.push("/");
    }

    setUpProviders();
  }, []);
  return (
    <nav className="fixed bottom-0 flex items-center justify-around w-full bg-white z-10 dark:bg-[#121212]">
      {session?.user ? (
        <div className="flex items-center justify-around w-full p-5">
          <Link href="/">
            <AiOutlineHome fontSize={25} />
          </Link>
          <Link href="/search">
            <AiOutlineSearch fontSize={25} />
          </Link>
          <Link href="/create-tweet">
            <AiOutlineUpload fontSize={25} />
          </Link>
          <Link href="/activity">
            <AiOutlineHeart fontSize={25} />
          </Link>
          <Link href="/profile">
            <AiOutlineUser fontSize={25} />
          </Link>
        </div>
      ) : (
        <>
          <div className="fixed bottom-0 flex items-center justify-around w-full bg-white z-10 dark:bg-[#121212]">
            <div className="relative w-full h-screen">
              <Image
                src="/bgThreads.svg"
                fill
                alt="threads"
                className="absolute top-0 bottom-0 left-0 right-0 mx-auto"
              />
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="absolute bottom-24 z-10 left-0 right-0 mx-auto w-[90%] bg-white rounded-xl p-5 flex items-center justify-between shadow-xl dark:bg-[#2C2C2C]"
                  >
                    Continue with {provider.name}
                    <Image
                      src="/google.svg"
                      width={30}
                      height={30}
                      alt="home-icon"
                    />
                  </button>
                ))}
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
