import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import Image from "next/image";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  const { data: session } = useSession();
  return (
    <section className="w-full flex ">
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
        <h2 className="text-black dark:text-white font-bold">
          {session?.user.name}
        </h2>
        <textarea
          value={post.tweet}
          onChange={(e) => setPost({ ...post, tweet: e.target.value })}
          placeholder="Start a thread..."
          required
          className="w-full outline-none text-black dark:text-white overflow-hidden resize-none"
          rows={10}
        />
        {post.tweet ? (
          <Button auto type="submit" disabled={submitting}>
            {submitting ? (
              // <Loading type="points" color="currentColor" size="sm" />
              <p>Loading...</p>
            ) : (
              <p>Post</p>
            )}
          </Button>
        ) : (
          <Button disabled>Post</Button>
        )}
      </form>
    </section>
  );
};

export default Form;
