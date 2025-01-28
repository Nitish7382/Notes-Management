import React, { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosinstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddEditNotes = ({ noteData, type, getAllNotes, handleClose }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  // Add Note 
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        getAllNotes();
        toast.success("Note added successfully!");
        handleClose();  // Fix: Was incorrectly written as onclose()
      }
    } catch (error) {
      const errorMessage = error.response?.data?.messege || "Something went wrong!";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  // Edit Note
  const editNote = async () => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put(`/edit-note/${noteId}`, {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        getAllNotes();
        toast.success("Note updated successfully!");
        handleClose();  // Fix: Was incorrectly written as onclose()
      }
    } catch (error) {
      const errorMessage = error.response?.data?.messege || "Something went wrong!";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please Enter The Title");
      toast.error("Please Enter The Title");
      return;
    }
    if (!content) {
      setError("Please Enter The Content");
      toast.error("Please Enter The Content");
      return;
    }
    setError(null);

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="relative">
      <button
        className="flex p-[1px] items-center justify-center absolute -top-4 -right-4"
        onClick={handleClose}
      >
        <MdClose className="text-xl text-slate-400 hover:text-black hover:scale-110" />
      </button>

      <div className="flex flex-col gap-2">
        <label className="input-label">Title</label>
        <input
          type="text"
          className="text-2xl text-slate-950 bg-slate-50 rounded-lg p-1 outline-none"
          placeholder="Go to Read the Book"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div className="flex flex-col mt-8">
        <label className="input-label">Content</label>
        <textarea
          type="text"
          className="text-base text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="Write your content Here"
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      <div className="mt-3">
        <label className="input-label">Tags</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      
      <button
        className="btn-primary rounded-full font-medium mt-5 p-3"
        onClick={handleAddNote}
      >
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
};

export default AddEditNotes;
