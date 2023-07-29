import { signOut, useSession } from "next-auth/react";
import TweetCard from "./TweetCard";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@nextui-org/react";
import { BiArrowBack } from "react-icons/bi";
import { GoSignOut } from "react-icons/go";
import { MdVerified } from "react-icons/md";

const Profile = ({ name, email, data, handleDelete }) => {
  const { data: session } = useSession();

  return (
    <section className="w-[900px] h-screen flex-center flex-col border-[#2F3336] border-l-[1px] border-r-[1px] overflow-y-auto z-10">
      <div className="flex items-center gap-4 p-2 bg-black/30 backdrop-blur-sm border-b-[1px] border-[#2F3336] fixed w-[56%] z-50">
        <div className="p-2 rounded-full hover:bg-[#171818]">
          <Link href="/">
            <BiArrowBack fontSize={20} />
          </Link>
        </div>
        <h1 className="text-base font-bold">{name}</h1>
      </div>
      <div className="border-b-[1px] border-t-[1px] border-[#2F3336]">
        <div className="h-[200px] bg-[#323639] mt-[3.25rem]" />
        <div className="p-4  relative -top-20 h-[150px]">
          <div className="flex items-end justify-between">
            <Image
              src={session?.user.image}
              width={120}
              height={120}
              alt="user-profile"
              className="rounded-full border-4 border-black hover:opacity-90 transition-all cursor-pointer"
            />
            <Button auto icon={<GoSignOut />} onClick={signOut}>
              Sign Out
            </Button>
          </div>
          <div className="mt-3">
            <div className="flex items-center gap-1">
              <h2 className="text-xl font-bold">{session?.user.name}</h2>
              <MdVerified color="rgb(29, 155, 240)" />
            </div>
            <p className="text-sm text-gray-400">{session?.user.email}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse">
        {data.map((post) => (
          <TweetCard
            key={post._id}
            post={post}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
