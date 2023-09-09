"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Home = () => {
  const { data: session } = useSession();

  if (!session?.user) {
    redirect("/");
  }
  return <div>Home</div>;
};

export default Home;
