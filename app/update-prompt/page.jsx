"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";
import { useSearchParams } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

const UpdatePrompt = () => {
  const [submitting, setSubmitting] = useState(false); //is the form being submitted
  const [inputValue, setInputValue] = useState({ prompt: "", tag: "" }); // current form input value
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch(`/api/prompt/${searchParams.get("id")}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: inputValue.prompt,
          tag: inputValue.tag,
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/prompt/${searchParams.get("id")}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await res.json();
        setInputValue({ prompt: result.prompt, tag: result.tag });
      } catch (error) {
        throw new Error("Something went wrong");
      }
    };

    if (session?.user) {
      fetchData();
    } else {
      signIn("google"); // Redirects to Google Auth if there's no session
    }
  }, [searchParams.get("id")]);

  return session?.user ? (
    <Form
      type="Edit"
      inputValue={inputValue}
      setInputValue={setInputValue}
      submitting={submitting}
      handleSubmit={handleSubmit}
    />
  ) : null;
};

export default UpdatePrompt;
