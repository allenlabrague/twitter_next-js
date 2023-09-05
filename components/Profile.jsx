import { signOut, useSession } from "next-auth/react";
import TweetCard from "./TweetCard";
import Link from "next/link";
import Image from "next/image";

import { BiArrowBack } from "react-icons/bi";
import { GoSignOut } from "react-icons/go";
import { MdVerified } from "react-icons/md";

const Profile = ({ name, email, data, handleDelete }) => {
  const { data: session } = useSession();

  return (
    <section className="h-screen flex-center flex-col">
      <div className="p-4 bg-white dark:bg-black">
        <Link href="/">
          <BiArrowBack fontSize={20} />
        </Link>
      </div>
      <div>
        <div className="p-4 flex items-center justify-between w-full">
          <div>
            <div>
              <h2 className="text-xl font-bold">{session?.user.name}</h2>
            </div>
            <p className="text-sm text-gray-400">{session?.user.email}</p>
          </div>
          <Image
            src={session?.user.image}
            width={60}
            height={60}
            alt="user-profile"
            className="rounded-full"
          />
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
