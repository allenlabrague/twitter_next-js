"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { MdVerified } from "react-icons/md";
import { BsThreeDots, BsFillTrashFill } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineRetweet, AiOutlineHeart } from "react-icons/ai";
import { FiBarChart2, FiShare } from "react-icons/fi";

import { Tooltip, Button, css, Popover } from "@nextui-org/react";

import moment from "moment/moment";

const boxShadow = {
  boxShadow: "0px 0px 8px 0px rgba(255,255,255,0.33)",
  borderRadius: "5px",
};

const TweetCard = ({ post, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const createdAt = moment(post.createdAt).format("h[h]");
  const formattedDateTime = moment(post.createdAt).format(
    "MMMM Do, YYYY h:mm:ss a"
  );

  const ProfileTooltip = () => {
    const [togglebtn, setTogglebtn] = useState(false);

    const handleClick = () => {
      setTogglebtn(!togglebtn);
    };

    return (
      <>
        <div className="flex flex-col gap-1 cursor-pointer py-2 px-1 w-[250px]">
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
    <div className="flex w-full px-4 pt-3 pb-0 border-b-[1px] border-t-[1px] border-[#2F3336] hover:bg-[#080808] transition-all">
      <div className="w-full">
        <div className="flex relative">
          <Link href="/profile">
            <Image
              src={post.creator.image}
              alt="user-image"
              width={50}
              height={50}
              className="rounded-full object-contain mr-3 absolute opacity-100 hover:opacity-80 transition-all"
            />
          </Link>
          <div className="flex gap-4 justify-between w-full">
            <div className="ml-[4rem] w-full">
              <div className="flex gap-1 items-center cursor-pointer">
                <Tooltip
                  content={<ProfileTooltip />}
                  placement="bottom"
                  color="invert"
                  css={boxShadow}
                >
                  <Link href="/profile">
                    <h3 className="font-bold hover:underline">
                      {post.creator.username}
                    </h3>
                  </Link>
                </Tooltip>
                <MdVerified color="rgb(29, 155, 240)" />
                <Tooltip
                  content={<ProfileTooltip />}
                  placement="bottom"
                  color="invert"
                  css={boxShadow}
                >
                  <p className="text-sm text-gray-400">{post.creator.email} </p>
                </Tooltip>
                <span className="font-semibold text-gray-400">&#183;</span>{" "}
                <Tooltip
                  content={formattedDateTime}
                  placement="bottom"
                  color="invert"
                  css={boxShadow}
                >
                  <p className="text-xs text-gray-400 hover:underline">
                    {createdAt}
                  </p>
                </Tooltip>
              </div>
              <div className="-z-10">
                <p className="text-base -z-10">{post.tweet}</p>
                <div className="flex items-center justify-between w-[80%] relative left-[-0.6rem]">
                  <Tooltip
                    color="invert"
                    content="Reply"
                    placement="bottom"
                    css={boxShadow}
                  >
                    <div className="hover:bg-[#071720] hover:text-[#018AD2] p-3 rounded-full transition-all">
                      <FaRegComment />
                    </div>
                  </Tooltip>
                  <Tooltip
                    color="invert"
                    content="Retweet"
                    placement="bottom"
                    css={boxShadow}
                  >
                    <div className="hover:bg-[#071A14] hover:text-[#17C964] p-3 rounded-full transition-all">
                      <AiOutlineRetweet />
                    </div>
                  </Tooltip>
                  <Tooltip
                    color="invert"
                    content="Like"
                    placement="bottom"
                    css={boxShadow}
                  >
                    <div className="hover:bg-[#230713] hover:text-[#F31260] p-3 rounded-full transition-all">
                      <AiOutlineHeart />
                    </div>
                  </Tooltip>
                  <Tooltip
                    color="invert"
                    content="View"
                    placement="bottom"
                    css={boxShadow}
                  >
                    <div className="hover:bg-[#071720] hover:text-[#018AD2] p-3 rounded-full transition-all">
                      <FiBarChart2 />
                    </div>
                  </Tooltip>
                  <Tooltip
                    color="invert"
                    content="Share"
                    placement="bottom"
                    css={boxShadow}
                  >
                    <div className="hover:bg-[#071720] hover:text-[#018AD2] p-3 rounded-full transition-all">
                      <FiShare />
                    </div>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div>
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
            </Popover.Content>
          </Popover>
        </div>
      )}
    </div>
  );
};

export default TweetCard;
