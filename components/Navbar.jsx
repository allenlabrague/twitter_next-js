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

import { MdVerified } from "react-icons/md";
import { BsTwitter, BsThreeDots } from "react-icons/bs";
import { BiSolidHomeHeart } from "react-icons/bi";
import { GoSignOut, GoSignIn } from "react-icons/go";
import { AiOutlineClose } from "react-icons/ai";

const btnStyle = {
  background: "#1D9BF0",
  textAlign: "center",
  width: "270px",
  color: "white",
  padding: "1.5rem",
  borderRadius: "9999px",
  fontWeight: "bold",
  fontSize: 15,
};

const btn = {
  background: "none",
  width: 100,
};

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
    <nav className={"h-screen w-[320px] p-6"}>
      <div className="mb-12 w-min p-2 rounded-full hover:bg-[#171818]">
        <Link href="/">
          <BsTwitter fontSize={25} color="#D9D9D9" />
        </Link>
      </div>
      {/* Desktop Navigation */}
      <div className="flex items-start gap-8">
        {session?.user ? (
          <div>
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className="flex gap-3 text-lg font-semibold items-center text-[#D9D9D9] w-[130px] p-2 rounded-full hover:bg-[#171818]"
              >
                <BiSolidHomeHeart fontSize={25} />
                Home
              </Link>
              <Link
                href="/profile"
                className="flex gap-3 text-lg font-semibold text-[#D9D9D9] w-[130px] p-2 rounded-full hover:bg-[#171818]"
              >
                <Image
                  src="/profile.svg"
                  width={25}
                  height={25}
                  alt="profile-icon"
                />
                Profile
              </Link>
              <button
                type="button"
                onClick={signOut}
                className="flex gap-3 text-lg font-semibold items-center text-[#D9D9D9] w-[150px] p-2 rounded-full hover:bg-[#171818] mb-3"
              >
                <GoSignOut fontSize={25} />
                Sign Out
              </button>
              <div>
                <Button onPress={() => setVisible(true)} style={btnStyle}>
                  Tweet
                </Button>
                <Modal
                  width="700px"
                  preventClose
                  aria-labelledby="modal-title"
                  aria-describedby="modal-description"
                  {...bindings}
                  style={{ backgroundColor: "black", color: "white" }}
                >
                  <Modal.Header className="w-[90px]">
                    <Button style={btn} auto onPress={() => setVisible(false)}>
                      <div className="hover:bg-[#171818] z-10 p-2 rounded-full">
                        <AiOutlineClose fontSize={17} />
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
            </div>
            <div className="flex gap-2 items-center absolute bottom-4 p-2 rounded-full hover:bg-[#171818]">
              <div>
                <Image
                  src={session?.user.image}
                  width={50}
                  height={50}
                  alt="user-profile"
                  className="rounded-full"
                />
              </div>
              <div className="flex items-center justify-between w-full">
                <div className="mr-5">
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold">
                      {session?.user.name}
                    </h2>
                    <MdVerified color="rgb(29, 155, 240)" />
                  </div>
                  <p className="text-sm text-gray-400">{session?.user.email}</p>
                </div>
                <Popover>
                  <Popover.Trigger>
                    <button className="xl:bg-transparent focus:outline-none focus:shadow-outline">
                      <BsThreeDots />
                    </button>
                  </Popover.Trigger>
                  <Popover.Content
                    css={{
                      background: "Black",
                    }}
                  >
                    <div className="p-3">
                      <Link
                        href="/profile"
                        className="flex gap-3 text-lg font-semibold text-[#D9D9D9] p-2 rounded-full hover:bg-[#171818]"
                      >
                        <Image
                          src="/profile.svg"
                          width={25}
                          height={25}
                          alt="profile-icon"
                        />
                        Profile
                      </Link>
                      <button
                        type="button"
                        onClick={signOut}
                        className="flex gap-3 text-lg font-semibold items-center text-[#D9D9D9] p-2 rounded-full hover:bg-[#171818]"
                      >
                        <GoSignOut fontSize={25} />
                        Sign Out
                      </button>
                    </div>
                  </Popover.Content>
                </Popover>
              </div>
            </div>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="flex gap-3 text-lg font-semibold items-center text-[#D9D9D9] hover:text-white transition-all"
                >
                  <GoSignIn />
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;