"use client";

import Profile from "@components/Profile";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const UserProfile = () => {
  
    const params = useParams();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    if (params?.id) fetchPosts();
  }, [params?.id]);

  
  return (
    <Profile
      name="User"
      desc="Welcome to user's profile"
      data={posts}
    />
  );
};

export default UserProfile;

