import { signOut } from "next-auth/react";
import TweetCard from "./TweetCard";
import Link from "next/link";
import Image from "next/image";
import { IoChevronBack } from "react-icons/io5";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ThemeSwitcher } from "./ThemeSwitcher";

const Profile = ({ name, email, image, handleEdit, data, handleDelete }) => {
  return (
    <section className="h-screen flex-center flex-col">
      <div className="p-4 bg-white dark:bg-[#121212]">
        <Link href="/" className="flex items-center gap-2">
          <IoChevronBack fontSize={20} />
          <p className="text-lg">Back</p>
        </Link>
      </div>
      <div>
        <div className="p-4 flex items-center justify-between w-full">
          <div>
            <div>
              <h2 className="text-2xl font-semibold">{name}</h2>
            </div>
            <p className="text-sm">{email}</p>
          </div>
          <Image
            src={image}
            width={60}
            height={60}
            alt="user-profile"
            className="rounded-full"
          />
        </div>
      </div>
      <div className="flex items-center justify-center w-full gap-3 px-4 my-4">
        <Button className="w-full">Edit Profile</Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full">Settings</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] w-[350px] rounded-2xl dark:bg-[#121212] rounded-t-3xl border-t border-gray-200 dark:border-none">
            <DialogHeader>Settings</DialogHeader>
            <ThemeSwitcher />
            <Button
              variant="destructive"
              type="button"
              onClick={signOut}
              className="w-full"
            >
              Sign out
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      <div className="p-2 pt-4 flex items-center justify-center border-b-[2px] mx-4 border-black dark:border-white ">
        <h3 className="text-center font-medium">Threads</h3>
      </div>
      <div className="flex flex-col-reverse">
        <div className="w-full h-[65px]" />
        {data.length === 0 ? (
          <p className="text-center mt-5">Create a post</p>
        ) : (
          <>
            {data.map((post) => (
              <TweetCard
                key={post._id}
                post={post}
                handleEdit={() => handleEdit && handleEdit(post)}
                handleDelete={() => handleDelete && handleDelete(post)}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default Profile;
