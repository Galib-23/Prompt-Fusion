"use client";
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick, searchText }) => {
  return <div className="mt-16 prompt_layout">
    {
      data.map((post) => (
        <PromptCard searchText={searchText} post={post} handleTagClick={handleTagClick} />
      ))
    }
  </div>;
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  console.log(searchText)

  useEffect(() => {
    const fetchPosts = async () => {
      // const urlParams =  new URLSearchParams();
      // urlParams.set('searchTerm', searchText);
      // const searchQuery = urlParams.toString();
      const response = await fetch(`/api/prompt?searchTerm=${searchText}`);
      const data = await response.json();
      setPosts(data);
    }
    fetchPosts();
  }, [searchText])


  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList searchText={searchText} data={posts} handleTagClick={setSearchText} />
    </section>
  );
};

export default Feed;
