"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete, searchText }) => {
  const [copied, setCopied] = useState("");
  const {data: session } = useSession();
  const pathName = usePathname();
  const [highlightedPrompt, setHighlightedPrompt] = useState(null);

  useEffect(() => {
    const regex = new RegExp(searchText, "gi");
    const parts = post.prompt.split(regex);
    console.log('parts: ',parts)
    const highlightedParts = post.prompt.match(regex);
    console.log('highlited: ',highlightedParts)

    const merged = parts.map((part, index) => {
      if (index < parts.length - 1) {
        return (
          <React.Fragment key={index}>
            {part}
            <span className="underline text-yellow-500">{highlightedParts[index]}</span>
          </React.Fragment>
        );
      } else {
        return part;
      }
    });

    console.log('merged: ', merged);

    setHighlightedPrompt(merged);
  }, [post.prompt, searchText]);

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000)
  }

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex flex-1 justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="user image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-xs text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            height={12}
            width={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">
        {highlightedPrompt}
      </p>
      <p onClick={() => handleTagClick && handleTagClick(post.tag)} className="font-inter text-sm blue_gradient cursor-pointer">{post.tag}</p>
      {
        session?.user.id === post.creator._id && pathName ==='/profile' && (
          <div className="mt-5 flex-center gap-4 border-t border-gray-100">
            <p className="font-inter text-sm green_gradient cursor-pointer" onClick={handleEdit}>Edit</p>
            <p className="font-inter text-sm orange_gradient cursor-pointer" onClick={handleDelete}>Delete</p>
          </div>
        )
      }
    </div>
  );
};

export default PromptCard;
