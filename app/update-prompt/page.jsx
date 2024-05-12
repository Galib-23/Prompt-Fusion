"use client"
import Form from "@components/Form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditPrompt = () => {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState({});
  const [promptId, setPromptId] = useState(null);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchParams(params);
    setPromptId(params.get("id"));
  }, []);

  const getPromptDetails = async () => {
    if (!promptId) return;

    const response = await fetch(`/api/prompt/${promptId}`);
    const data = await response.json();
    setPost({
      prompt: data.prompt,
      tag: data.tag,
    });
  };

  useEffect(() => {
    getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) {
      alert("Prompt id not found");
      return;
    }

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
        setTimeout(() => {
          alert("Prompt updated successfully");
        }, 1000);
      }
    } catch (error) {
      console.log("error in editing prompt: ", error);
      alert("error in editing prompt");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {promptId ? (
        <Form
          type="Edit"
          post={post}
          setPost={setPost}
          submitting={submitting}
          handleSubmit={updatePrompt}
        />
      ) : (
        <p>Loading prompt details...</p>
      )}
    </div>
  );
};

export default EditPrompt;
