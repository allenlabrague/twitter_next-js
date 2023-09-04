"use client";

import { useState, useEffect } from "react";
import CreateTweet from "@app/create-tweet/page";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { AiOutlineHome, AiOutlineUser, AiOutlineUpload } from "react-icons/ai";
import { PiSignOutFill } from "react-icons/pi";

import Link from "next/link";
import Image from "next/image";

import { signIn, signOut, useSession, getProviders } from "next-auth/react";

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
            <button onPress={() => setVisible(true)}>
              <AiOutlineUpload fontSize={25} />
            </button>
            <button type="button" onClick={signOut} className="">
              <PiSignOutFill fontSize={25} />
            </button>
            <ThemeSwitcher />
          </div>
          <div>
            {/* <Modal
              width="700px"
              preventClose
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
              {...bindings}
              style={{ backgroundColor: "black", color: "white" }}
            >
              <Modal.Header className="w-[90px]">
                <Button auto onPress={() => setVisible(false)}>
                  <div className="hover:bg-[#171818] z-10 p-2 rounded-full">
                    close
                  </div>
                </Button>
              </Modal.Header>
              <Modal.Body>
                <div className="flex items-center gap-4 pb-4">
                  <Image
                    src={session?.user.image}
                    width={50}
                    height={50}
                    alt="user-profile"
                    className="rounded-full"
                  />
                  <CreateTweet />
                </div>
              </Modal.Body>
            </Modal> */}
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
                  className="absolute top left-0 right-0 mx-auto"
                />
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="absolute bottom-24 z-10 left-0 right-0 mx-auto w-[90%] bg-white rounded-xl p-5 flex items-center justify-between shadow-xl"
                >
                  <h2 className="text-gray-400 text-sm hover:text-black transition-colors">
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
