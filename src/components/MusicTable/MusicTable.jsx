import React, { useEffect } from "react";
import "./musictable.css";
import EditIcon from "../Logos/IconEdit/Edit";
import DeleteIcon from "../Logos/IconDelete/Delete";
import EditMusicForm from "../EditMusicForm/EditMusicForm";
import { useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";

function MusicTable() {
  const [isOpen, setIsOpen] = useState(false);
  const [musicData, setMusicData] = useState(null);
  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_URL + "/query_all"}`)
        .then((response) => {
          setMusicData(response.data.list_music);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const handleDeleteMusic = async (item) => {
    console.log("delete");
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL + "/delete"}`,
        {
          data: {
            id: item.id,
          },
        }
      );
      alert(res.data.msg);
      setTimeout(window.location.reload(), 100);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditMusic = () => {
    handleOpenModal();
  };

  return (
    <div className="m-4">
      <table className="w-full overflow-auto">
        <thead>
          <tr className="text-center">
            <th className="text-center">ID</th>
            <th className="text-center">Cover Image</th>
            <th className="text-center">Title</th>
            <th className="text-center">Artist</th>
            <th className="text-center">Album</th>
            <th className="text-center">Genre</th>
            <th className="text-center">Release Year</th>
            <th className="text-center">Duration</th>
            <th className="text-center">More Option</th>
          </tr>
        </thead>
        <tbody>
          {musicData === null ? (
            <tr>
              <td className="text-slate-400 h-[200px]" colSpan="9">
                <div className="text-center text-xl md:text-5xl flex justify-center items-center">
                  <span className="flex self-center text-[20px] font-bold">
                    Add new songs
                  </span>
                </div>{" "}
              </td>
            </tr>
          ) : (
            musicData.map((item) => {
              const imageURL = Buffer.from(item.image);
              const base64Image = `data:image/jpeg;base64, ${imageURL.toString(
                "base64"
              )}`;
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td className="flex justify-center">
                    <img
                      className="w-24 h-24"
                      src={base64Image}
                      alt="cover_image"
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.artist}</td>
                  <td>{item.album}</td>
                  <td>{item.genre}</td>
                  <td>{item.release_year}</td>
                  <td>3:12</td>
                  <td>
                    <div className="flex justify-center">
                      <div className="inline-flex align-middle mx-auto">
                        <span
                          className="cursor-pointer mx-2"
                          onClick={handleEditMusic}
                        >
                          {" "}
                          <EditIcon props={{ fillColor: "black" }}></EditIcon>
                        </span>

                        <span
                          className="cursor-pointer mx-2"
                          onClick={() => handleDeleteMusic(item)}
                        >
                          <DeleteIcon props={{ fillColor: "red" }}></DeleteIcon>
                        </span>
                      </div>
                    </div>
                    <div>
                      {isOpen && (
                        <EditMusicForm
                          props={{ isOpen: isOpen, data: item }}
                          onClose={handleCloseModal}
                        ></EditMusicForm>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MusicTable;
