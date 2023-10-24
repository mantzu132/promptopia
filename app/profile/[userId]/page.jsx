"use client";
import Profile from "@components/Profile";
import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const MyProfileNew = ({ params }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [userPosts, setUserPosts] = useState();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!session || !session.user || !session.user.id) {
        return;
      }

      try {
        const res = await fetch(`/api/users/${params.userId}/posts`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const { userData } = await res.json();

        setUserPosts(userData);

        setUserName(userData[0].creator.username);
      } catch (error) {
        throw new Error("Something went wrong");
      }
    };

    if (session?.user) {
      fetchData();
    } else {
      signIn("google");
    }
  }, [session]);

  const handleEdit = (postData) => {
    router.push(`/update-prompt?id=${postData._id}`);
  };

  const handleDelete = async (postData) => {
    try {
      const url = `/api/prompt/${postData._id}`;

      const response = await fetch(url, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to delete prompt: ${errorData.error}`);
      }

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Profile
      userPosts={userPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      currentUser={{ id: params.userId, name: userName }}
    />
  );
};

export default MyProfileNew;
