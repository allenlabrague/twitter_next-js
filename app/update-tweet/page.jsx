"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, redirect } from "next/navigation";

import Form from "@components/Form";
import { useSession } from "next-auth/react";

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const PromptId = searchParams.get("id");
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    tweet: "",
  });

  if (!session?.user) {
    redirect("/");
  }

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/tweet/${PromptId}`);
      const data = await response.json();

      setPost({
        tweet: data.tweet,
      });
    };

    if (PromptId) getPromptDetails();
  }, [PromptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!PromptId) return alert("Prompt ID not found");

    try {
      const response = await fetch(`/api/tweet/${PromptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          tweet: post.tweet,
        }),
      });

      if (response.ok) {
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
