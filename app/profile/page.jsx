"use client";

import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const MyProfile = () => {
  const { data: session } = useSession();
  console.log("This is session: ", session);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user?.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleEdit = () => {};

  const handleDelete = async () => {};
  if (!session) {
    return <p className="text-3xl font-semibold text-blue-600">Loading...</p>;
  }
  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
