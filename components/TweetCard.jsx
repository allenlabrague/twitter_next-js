"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { AiOutlineReload } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import moment from "moment/moment";

const TweetCard = ({ post, handleDelete, handleEdit }) => {
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

  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const updateRelativeTime = () => {
      const now = moment();
      const postTime = moment(post.createdAt);
      const duration = moment.duration(now.diff(postTime));

      if (duration.asSeconds() < 60) {
        setTimeAgo(`${Math.floor(duration.asSeconds())}s`);
      } else if (duration.asMinutes() < 60) {
        setTimeAgo(`${Math.floor(duration.asMinutes())}m`);
      } else if (duration.asHours() < 24) {
        setTimeAgo(`${Math.floor(duration.asHours())}h`);
      } else {
        setTimeAgo(`${Math.floor(duration.asDays())}d`);
      }
    };

    const interval = setInterval(updateRelativeTime, 1000); // Update every second
    updateRelativeTime(); // Initialize the time
    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [post.createdAt]);

  return (
    <div className="flex w-full p-4 py-5 transition-all border-b dark:border-[#1E1E1E] border-gray-200">
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
              <div className="flex items-center w-full justify-between">
                <Link href="/profile" className="cursor-pointer">
                  <h3 className="font-medium">{post.creator.username}</h3>
                </Link>
                <p className="text-gray-400 text-sm">{timeAgo}</p>
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
            <SheetTrigger asChild>
              <button className="xl:bg-transparent focus:outline-none focus:shadow-outline relative top-[0.2rem] ml-[1rem]">
                <BsThreeDots />
              </button>
            </SheetTrigger>
            <SheetContent
              side="bottom"
              className="w-full h-auto dark:bg-[#121212] rounded-t-3xl border-t border-gray-200 dark:border-none"
            >
              <Button onClick={handleEdit} className="w-full mt-3">
                Edit
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive" className="w-full mt-3">
                    Delete
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] w-[350px] rounded-2xl dark:bg-[#121212] rounded-t-3xl border-t border-gray-200 dark:border-none">
                  <DialogHeader>
                    <DialogTitle>Delete post?</DialogTitle>
                    <DialogDescription>
                      if you delete this post, you won't be able to restore it.
                    </DialogDescription>
                  </DialogHeader>
                  <Button
                    variant="destructive"
                    onClick={handleDeleteClick}
                    className="w-full mt-3"
                  >
                    {isDeleting ? (
                      <Button disabled variant="destructive" className="w-full">
                        <AiOutlineReload className="mr-2 h-4 w-4 animate-spin" />
                        Deleting...
                      </Button>
                    ) : (
                      "Delete"
                    )}
                  </Button>
                </DialogContent>
              </Dialog>
            </SheetContent>
          </Sheet>
        </div>
      )}
    </div>
  );
};

export default TweetCard;
