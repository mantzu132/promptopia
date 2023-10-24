"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { debounce } from "lodash";

import PromptCard from "@components/PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  const [copiedPrompt, setCopiedPrompt] = useState("");

  return (
    <div className="mt-16 prompt_layout">
      {data.map((prompt) => (
        <PromptCard
          key={prompt._id}
          prompt={prompt}
          handleTagClick={handleTagClick}
          setCopiedPrompt={setCopiedPrompt}
          copiedPrompt={copiedPrompt}
        />
      ))}
    </div>
  );
};
const Feed = () => {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState([]);

  const fetchData = async (query) => {
    try {
      const res = await fetch(`/api/prompt?search=${query}`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error("Something went wrong", error);
    }
  };

  useEffect(() => {
    fetchData(inputValue); // fetch data whenever inputValue changes
  }, []);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setInputValue(query);
    fetchData(query);
  };

  const handleTagClick = (passedTag) => {
    setInputValue(passedTag);
    fetchData(passedTag);
  };

  const debouncedHandleInputChange = useCallback(
    debounce(handleInputChange, 350),
    [],
  );

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          placeholder="Search for a tag or prompt"
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            debouncedHandleInputChange(e);
          }}
          className="search_input "
        />
      </form>

      <PromptCardList data={data} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
