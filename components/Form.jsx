import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import Image from "next/image";
import { AiOutlineReload, AiOutlineClose } from "react-icons/ai";
import { IoChevronBack } from "react-icons/io5";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  const { data: session } = useSession();

  return (
    <section className="w-full h-screen p-5 relative flex items-center justify-center">
      <div className="flex justify-center w-full">
        <h1 className="absolute top-5 text-center mx-auto font-medium text-xl">
          {type} thread.
        </h1>
        <Link
          href="/"
          className="flex items-center gap-2 absolute top-5 left-5"
        >
          <IoChevronBack fontSize={20} />
          <p className="text-lg">Cancel</p>
        </Link>
        <div className="mr-3">
          <Image
            src={session?.user.image}
            width={40}
            height={40}
            alt={`User ${session?.user.name}`}
            className="rounded-full"
          />
        </div>
        <form
          className="flex flex-col items-start justify-start w-full"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center w-full justify-between">
            <div>
              <h2 className="text-black dark:text-white font-semibold">
                {session?.user.name}
              </h2>
            </div>
            <div>
              {post.tweet ? (
                <button
                  onClick={(e) => setPost({ tweet: (e.target.value = "") })}
                >
                  <AiOutlineClose className="text-black dark:text-white" />
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
          <textarea
            value={post.tweet}
            onChange={(e) => setPost({ ...post, tweet: e.target.value })}
            placeholder={`${type} a thread...`}
            required
            className="w-full outline-none text-black dark:text-white overflow-hidden resize-none relative p-2 rounded-xl my-4 bg-gray-200 dark:bg-[#383838]"
            rows={10}
          />
          <Button
            className="w-full bg-black dark:bg-white"
            type="submit"
            disabled={submitting}
          >
            {submitting ? (
              <Button disabled className="w-full bg-black dark:bg-white">
                <AiOutlineReload className="mr-2 h-4 w-4 animate-spin" />
                {type}ing...
              </Button>
            ) : (
              <p>{type}</p>
            )}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Form;
