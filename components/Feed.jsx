"use client";

import { useState, useEffect } from "react";
import TweetCard from "./TweetCard";

const TweetCardList = ({ data }) => {
  return (
    <div className="flex flex-col-reverse">
      <div className="w-full h-[65px]" />
      {data.map((post) => (
        <TweetCard key={post._id} post={post} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/tweet");
      const data = await res.json();

      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <section>
      <form>
        <TweetCardList data={posts} />
      </form>
    </section>
  );
};

export default Feed;
