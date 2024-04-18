"use client";

import Profile from "@components/Profile";
import PromptCard from "@components/PromptCard";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const UserProfile = () => {
  
    const params = useParams();

  const [user, setUser] = useState(null);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    if (params?.id) fetchPosts();
  }, [params?.id]);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/users/${params?.id}`);
      const data = await response.json();
      setUser(data);
    };
    if (params?.id) fetchUser();
  }, [params?.id]);

  return (
    <section className="w-full">
      <Image src={user?.image} width={100} height={100} className="rounded-lg mt-2" />
      <h1 className="blue_gradient text-left font-bold text-2xl md:text-4xl">{user?.username}</h1>
      <p className="desc text-left">Welcome to {user?.username}'s personalized profile</p>
      <h3 className="mt-16 mb-4 text-xl font-semibold text-black">Posts:</h3>
      <div className="prompt_layout">
        {posts.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
          />
        ))}
      </div>
    </section>
  );
};

export default UserProfile;

