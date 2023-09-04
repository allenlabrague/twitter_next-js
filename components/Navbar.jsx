"use client";

import { useState, useEffect } from "react";
import CreateTweet from "@app/create-tweet/page";

import Link from "next/link";
import Image from "next/image";

import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import {
  Modal,
  useModal,
  Button,
  Tooltip,
  Popover,
  css,
} from "@nextui-org/react";

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

  const { setVisible, bindings } = useModal();

  return (
    <nav className="fixed bottom-5 flex items-center justify-around w-full">
      {session?.user ? (
        <>
          <div className="flex items-center justify-around w-full">
            <Link href="/" className="">
              <Image src="/home.svg" width={20} height={20} alt="home-icon" />
            </Link>
            <Link href="/profile" className="">
              <Image
                src="/profile.svg"
                width={20}
                height={20}
                alt="home-icon"
              />
            </Link>
            <button type="button" onClick={signOut} className="">
              <Image
                src="/signout.svg"
                width={20}
                height={20}
                alt="home-icon"
              />
            </button>
            <button onPress={() => setVisible(true)}>
              <Image src="/post.svg" width={20} height={20} alt="home-icon" />
            </button>
          </div>
          <div>
            <Modal
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
            </Modal>
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
