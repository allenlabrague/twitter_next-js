import Image from "next/image";
import Link from "next/link";

const UserCard = ({ post }) => {
  return (
    <div className="flex w-full p-4 transition-all">
      <div className="w-full">
        <div className="flex relative">
          <Link href="/profile">
            <Image
              src={post.image}
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
                  <h3 className="font-medium">{post.username}</h3>
                  <p className="text-sm text-gray-500">{post.email}</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
