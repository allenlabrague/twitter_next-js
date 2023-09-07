"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [posts, setPosts] = useState([]);

  if (!session?.user) {
    router.push("/");
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await res.json();

      setPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, []);

  const handleDelete = async (post) => {
    const hasConfirmed = true;

    if (hasConfirmed) {
      try {
        await fetch(`/api/tweet/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((p) => p._id !== post._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name={session?.user.name}
      email={session?.user.email}
      data={posts}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
