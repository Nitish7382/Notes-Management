import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeydown = (e) => {
    if (e.key == "Enter") {
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      {tags?.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mt-2">
          {tags.map((tag, index) => (
            <span key={index} className="flex items-center justify-center gap-1 p-1 bg-slate-200 rounded-full">
              # {tag}
              <button onClick={() => handleRemoveTag(tag)}>
                <MdClose className="text-red-600 hover:scale-125" />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center gap-3 mt-3">
        <input
          type="text"
          className="text-sm bg-transparent border px-3 py-2 rounded-3xl outline-none"
          placeholder="Add Tags"
          onChange={handleInputChange}
          onKeyDown={handleKeydown}
        />

        <button
          className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 hover:scale-110 hover:bg-primary"
          onClick={() => {
            addNewTag();
          }}
        >
          <MdAdd className="text-2xl text-primary hover:text-white " />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
