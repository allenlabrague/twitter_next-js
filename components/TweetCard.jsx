"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { MdVerified } from "react-icons/md";
import { BsThreeDots, BsFillTrashFill } from "react-icons/bs";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";

const TweetCard = ({ post, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const ProfileTooltip = () => {
    const [togglebtn, setTogglebtn] = useState(false);

    const handleClick = () => {
      setTogglebtn(!togglebtn);
    };

    return (
      <>
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <Link href="/profile">
                <Image
                  src={post.creator.image}
                  alt="user-image"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </Link>
            </div>
            <div>
              <Button auto onClick={handleClick}>
                {togglebtn ? "Unfollow" : "Follow"}
              </Button>
            </div>
          </div>
          <div>
            <div className="flex items-center">
              <h3 className="font-bold hover:underline">
                {post.creator.username}
              </h3>
              <MdVerified color="rgb(29, 155, 240)" />
            </div>
            <p className="text-sm text-gray-400">{post.creator.email}</p>
          </div>
          <p className="mt-3">
            The Follow is Clickable but when you stop hovering and start hover
            again it will still show Follow I'm sorry I am still learning, But I
            hope you liked my Twitter Clone enjoy it❤️😁
          </p>
        </div>
      </>
    );
  };

  return (
    <div className="flex w-full px-4 pt-3 pb-0 transition-all">
      <div className="w-full">
        <div className="flex relative">
          <Link href="/profile">
            <Image
              src={post.creator.image}
              alt="user-image"
              width={50}
              height={50}
              className="rounded-full object-contain mr-3 absolute"
            />
          </Link>
          <div className="flex gap-4 justify-between w-full">
            <div className="ml-[4rem] w-full">
              <div className="flex gap-1 items-center cursor-pointer">
                <Link href="/profile">
                  <h3 className="font-bold hover:underline">
                    {post.creator.username}
                  </h3>
                </Link>
              </div>
              <div className="-z-10">
                <p className="text-base -z-10">{post.tweet}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div>
          <Popover>
            <PopoverTrigger>
              <button className="xl:bg-transparent focus:outline-none focus:shadow-outline">
                <BsThreeDots />
              </button>
            </PopoverTrigger>
            <PopoverContent
              css={{
                background: "Black",
              }}
            >
              <div className="p-3 flex items-center gap-3">
                <Button
                  auto
                  color="error"
                  onClick={handleDelete}
                  icon={<BsFillTrashFill />}
                >
                  Delete
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
};

export default TweetCard;
