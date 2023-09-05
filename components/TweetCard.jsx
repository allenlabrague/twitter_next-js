"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { AiOutlineReload } from "react-icons/ai";
import { BsThreeDots, BsFillTrashFill } from "react-icons/bs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

const TweetCard = ({ post, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = async () => {
    try {
      // Set isDeleting to true to show loading text
      setIsDeleting(true);

      // Perform the delete action
      await handleDelete();

      // Set isDeleting back to false when the delete action is complete
      setIsDeleting(false);
    } catch (error) {
      // Handle any errors here
      console.error("Error deleting post", error);

      // Set isDeleting back to false in case of an error
      setIsDeleting(false);
    }
  };

  const ProfileTooltip = () => {
    return (
      <>
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between mb-2">
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
        </div>
      </>
    );
  };

  return (
    <div className="flex w-full p-4 transition-all border-b-[1px] border-gray-400">
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
          <Sheet>
            <SheetTrigger>
              <button className="xl:bg-transparent focus:outline-none focus:shadow-outline">
                <BsThreeDots />
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="w-full h-auto">
              <SheetHeader>
                <SheetDescription>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive" className="w-full mt-3">
                        Delete
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] w-[350px] rounded-2xl">
                      <DialogHeader>
                        <DialogTitle>Delete post?</DialogTitle>
                        <DialogDescription>
                          if you delete this post, you won't be able to restore
                          it.
                        </DialogDescription>
                      </DialogHeader>
                      <Button
                        variant="destructive"
                        onClick={handleDeleteClick}
                        className="w-full mt-3"
                      >
                        {isDeleting ? (
                          <Button
                            disabled
                            variant="destructive"
                            className="w-full"
                          >
                            <AiOutlineReload className="mr-2 h-4 w-4 animate-spin" />
                            Deleting...
                          </Button>
                        ) : (
                          "Delete"
                        )}
                      </Button>
                    </DialogContent>
                  </Dialog>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      )}
    </div>
  );
};

export default TweetCard;
