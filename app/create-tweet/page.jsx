"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const CreateTweet = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    tweet: "",
  });

  const createTweet = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setPost({ ...post });
    setTimeout(() => {
      router.refresh();
    }, 2000);

    try {
      const res = await fetch("/api/tweet/new", {
        method: "POST",
        body: JSON.stringify({
          tweet: post.tweet,
          userId: session?.user.id,
        }),
      });

      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setSubmitting(false);
        window.location.reload();
      }, 4000);
    }
  };

  return (
    <div className="w-full">
      <Form
        type="Post"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createTweet}
      />
    </div>
  );
};

export default CreateTweet;
