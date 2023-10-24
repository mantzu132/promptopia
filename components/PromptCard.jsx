"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const PromptCard = ({
  prompt,
  handleTagClick,
  setCopiedPrompt,
  copiedPrompt,
  handleEdit,
  handleDelete,
}) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const tagsArray = prompt.tag.split(" ");

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(prompt.prompt)
      .then(() => {
        setCopiedPrompt(prompt._id);
        setTimeout(() => {
          setCopiedPrompt("");
        }, 3000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };
  return (
    <div className="prompt_card">
      <div className="max-w-sm rounded overflow-hidden px-6 py-4 ">
        <div className={"flex gap-3 s-center"}>
          <Image
            src={prompt.creator.image}
            alt={"profile picture"}
            width={30}
            height={30}
            className={"object-contain"}
          />
          <div className={""}>
            <Link href={`/profile/${prompt.creator._id}`}>
              <h3 className={"font-satoshi font-semibold text-gray-900"}>
                {prompt.creator.username}
              </h3>
            </Link>
            <p className={"font-inter text-sm text-gray-500"}>
              {"someemail@gmail.com"}
            </p>
          </div>

          <div className={"flex gap-1"}>
            <div className={"copy_btn"} onClick={handleCopyClick}>
              {copiedPrompt === prompt._id ? (
                <Image
                  src="/assets/icons/tick.svg"
                  alt="Copied"
                  width={12}
                  height={12}
                />
              ) : (
                <Image
                  src="/assets/icons/copy.svg"
                  alt="Copy"
                  width={12}
                  height={12}
                />
              )}
            </div>

            {/*SHOW EDIT / DELETE ICONS ONLY IN PROFILE PAGE*/}
            {session?.user?.id === prompt.creator._id &&
              pathName.startsWith("/profile/") && (
                <>
                  <div className="copy_btn" onClick={() => handleEdit(prompt)}>
                    <Image
                      src="/assets/icons/edit.svg"
                      alt="Edit"
                      width={12}
                      height={12}
                    />
                  </div>

                  <div
                    className="copy_btn"
                    onClick={() => handleDelete(prompt)}
                  >
                    <Image
                      src="/assets/icons/delete.svg"
                      alt="Delete"
                      width={12}
                      height={12}
                    />
                  </div>
                </>
              )}
          </div>
        </div>

        <p className="text-gray-700 text-base line-clamp-[10] py-5 ">
          {prompt.prompt}
        </p>

        {/*------------------------TAGS----------------------*/}
        <div className="px-6 pt-4 pb-2 flex gap-1 flex-wrap">
          {
            // Map over the tagsArray to render each tag
            tagsArray.map((tag, index) => (
              <span
                key={index}
                className="tag"
                onClick={() => pathName === "/" && handleTagClick(tag)}
              >
                #{tag}
              </span>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default PromptCard;
