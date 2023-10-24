"use client";
import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import Form from "@components/Form";

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState("false"); //is the form being submitted
  const [inputValue, setInputValue] = useState({ prompt: "", tag: "" }); // current form input value
  const { data: session } = useSession();
  const router = useRouter();

  if (!session || !session.user) {
    signIn("google");
  } else {
    const handleSubmit = async (event) => {
      event.preventDefault();
      setSubmitting(true);
      try {
        const response = await fetch("/api/prompt/new", {
          method: "POST",
          body: JSON.stringify({
            prompt: inputValue.prompt,
            tag: inputValue.tag,
            userId: session?.user.id,
          }),
        });
        if (response.ok) {
          router.push("/");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setSubmitting(false);
      }
    };

    return (
      <Form
        type="Create"
        inputValue={inputValue}
        setInputValue={setInputValue}
        submitting={submitting}
        handleSubmit={handleSubmit}
      />
    );
  }
};

export default CreatePrompt;
