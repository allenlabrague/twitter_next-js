"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, redirect } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [posts, setPosts] = useState([]);

  if (!session?.user) {
    redirect("/");
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, []);

  const handleEdit = (post) => {
    router.push(`/update-tweet?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    try {
      await fetch(`/api/tweet/${post._id.toString()}`, {
        method: "DELETE",
      });

      const filteredPosts = posts.filter((p) => p._id !== post._id);

      setPosts(filteredPosts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Profile
      name={session?.user.name}
      email={session?.user.email}
      image={session?.user.image}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
