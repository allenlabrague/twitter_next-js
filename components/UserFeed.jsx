"use client";

import { useState, useEffect } from "react";

import UserCard from "./UserCard";
import { AiOutlineSearch } from "react-icons/ai";

const UserCardList = ({ data }) => {
  return (
    <div className="flex flex-col-reverse">
      <div className="w-full h-[65px]" />
      {data.map((post) => (
        <UserCard key={post._id} post={post} />
      ))}
    </div>
  );
};

const UserFeed = () => {
  const [posts, setPosts] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const [noResultsFound, setNoResultsFound] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/users");
      const data = await res.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return posts.filter((item) => regex.test(item.username));
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        if (searchResult.length === 0) {
          setNoResultsFound(true); // Set to true when no results are found
        } else {
          setNoResultsFound(false); // Set to false when results are found
        }
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (
    <section className="p-2">
      <h1 className="text-3xl font-semibold my-1">Search</h1>
      <input
        type="text"
        placeholder="Search for a name"
        value={searchText}
        onChange={handleSearchChange}
        required
        className="w-full p-2 my-2 rounded-lg bg-gray-200 outline-none dark:bg-[#383838]"
      />
      {noResultsFound ? ( // Check if no results were found
        <>
          <p>No result found for "{searchText}"</p>
        </>
      ) : searchText ? (
        <UserCardList data={searchedResults} />
      ) : (
        <UserCardList data={posts} />
      )}
    </section>
  );
};

export default UserFeed;
