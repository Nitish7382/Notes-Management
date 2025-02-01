import React, { useState } from "react";
import moment from "moment";
import Modal from "react-modal";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";

// Set the app element for accessibility
Modal.setAppElement("#root");

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  OnPinNote,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  // Functions to open and close modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="border rounded-xl bg-white p-4 hover:shadow-xl transition-all ease-in-out">
      <div>
        <div className="flex items-center justify-between">
          <h6 className="text-sm font-medium">{title}</h6>
          <MdOutlinePushPin
            className={`icon-btn ${
              isPinned ? "text-primary" : "text-slate-300"
            } cursor-pointer rotate-45`}
            onClick={OnPinNote}
          />
        </div>
        <span className="text-xs text-slate-500">
          {moment(date).format("Do MMM YYYY")}
        </span>
      </div>

      {/* Paragraph to open modal */}
      <p
        className="text-xs text-slate-600 mt-2 cursor-pointer"
        onClick={content.length > 60 ? openModal : null}
      >
        {content?.slice(0, 60)}
        {content.length > 60 && (
          <>
            ...<span className="text-primary ml-1">Read More</span>
          </>
        )}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {tags.map((item, index) => (
            <div
              key={index}
              className="text-xs text-slate-700 bg-slate-200 border rounded-full p-[6px] mt-1"
            >
              #{item}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <MdCreate
            className="icon-btn hover:text-green-600 hover:scale-110"
            onClick={onEdit}
          />
          <MdDelete
            className="icon-btn hover:text-red-600 hover:scale-110"
            onClick={onDelete}
          />
        </div>
      </div>

      {/* Modal Implementation */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Note Details"
        className="bg-white p-6 rounded-xl shadow-2xl max-w-lg mx-auto mt-20 relative"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <span className="text-xs text-slate-500">
          {moment(date).format("Do MMM YYYY")}
        </span>

        <p className="text-sm text-slate-700 mt-4">{content}</p>

        <div className="flex gap-2 mt-4">
          {tags.map((item, index) => (
            <span
              key={index}
              className="text-xs text-slate-700 bg-slate-200 border rounded-full p-[6px]"
            >
              #{item}
            </span>
          ))}
        </div>

        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-slate-500 hover:text-red-500"
        >
          ✖
        </button>
      </Modal>
    </div>
  );
};

export default NoteCard;
