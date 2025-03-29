import React from "react";

const DeleteModal = ({ isOpen, onClose, handleDelete }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 w-full bg-black/50 h-screen flex items-center justify-center top-0 left-0">
      <div className="p-8 bg-white flex items-center justify-center flex-col gap-8 rounded-md">
        <h3 className="font-semibold">Are you really want to delete ?</h3>
        <div className="flex gap-x-8 ">
          <button
            onClick={onClose}
            className="px-4 cursor-pointer py-2 bg-yellow-400 rounded-md"
          >
            {" "}
            No
          </button>
          <button
            onClick={handleDelete}
            className="cursor-pointer px-3 py-2 bg-red-400 text-white rounded-md"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
