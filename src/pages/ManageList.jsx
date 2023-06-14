import React, { useState } from "react";
import MusicTable from "../components/MusicTable/MusicTable";
import AddMusicForm from "../components/AddMusicForm/AddMusicForm";

function ManageList() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div className="flex flex-col">
        <span className="text-xl font-bold">Manage Music List</span>
        <button
          className="mx-4 w-32 font-semibold button-primary"
          onClick={handleOpenModal}
        >
          Add Music
        </button>
      </div>

      <MusicTable />
      {isOpen && (
        <AddMusicForm props={{ isOpen: isOpen }} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default ManageList;
