import React from "react";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";

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
  return (
    <div className="border rounded bg-white p-4 hover:shadow-xl transition-all ease-in-out">
      <div className="">
        <div className="flex items-center justify-between">
          <h6 className="text-sm font-medium">{title}</h6>
          <MdOutlinePushPin
            className={`icon-btn ${
              isPinned ? "text-primary" : "text-slate-300"
            } cursor-pointer rotate-45`}
            onClick={OnPinNote}
          />
        </div>
        <span className="text-xs text-slate-500">{date}</span>
      </div>

      <p className="text-xs text-slate-600 mt-2">{content?.slice(0, 60)}</p>

      <div className="flex items-center justify-between">
        <div className="text-xs text-slate-700 bg-slate-200 border rounded-full p-2 mt-1">
          {tags}
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
    </div>
  );
};

export default NoteCard;
