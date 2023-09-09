"use client";

import UserFeed from "@components/UserFeed";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const page = () => {
  const { data: session } = useSession();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div>
      <UserFeed />
    </div>
  );
};

export default page;
