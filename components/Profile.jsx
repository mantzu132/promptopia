"use client";
import PromptCard from "@components/PromptCard";
import { useSession } from "next-auth/react";

const Profile = ({ userPosts = [], handleEdit, handleDelete, currentUser }) => {
  const { data: session } = useSession();
  return (
    <section className={"feed w-full"}>
      <h1 className={"head_text"}>
        {session?.user?.id === currentUser.id ? "My" : currentUser.name}{" "}
        <span className="blue_gradient">Profile</span>
      </h1>
      <p className={"desc"}>Welcome to your personalized profile page</p>
      <div className="mt-10 prompt_layout">
        {userPosts.map((prompt) => (
          <PromptCard
            key={prompt._id}
            prompt={prompt}
            handleEdit={() => handleEdit(prompt)}
            handleDelete={() => handleDelete(prompt)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
