import React, { useState } from "react";
import "./editmusicform.css";
import { Input } from "antd";
import axios from "axios";

function AddMusicForm({ props, onClose }) {
  const [audioFile, setAudioFile] = useState(null);
  const [audioFileURL, setAudioFileURL] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileURL, setImageFileURL] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    artist: "",
    album: "",
    genre: "",
    releaseYear: "",
    audioFile: audioFileURL,
    imageFile: imageFileURL,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAudioUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setAudioFile(event.target.result);
      setAudioFileURL(URL.createObjectURL(file));
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageFile(event.target.result);
      setImageFileURL(URL.createObjectURL(file));
    };
    reader.readAsDataURL(file);
  };

  const handleEditMusic = async (event) => {
    event.preventDefault();
    formData.id = props.data.id;
    formData.audioFile = audioFile;
    formData.imageFile = imageFile;
    console.log(formData);
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL + "/edit"}`,
        formData
      );
      alert(res.data.msg);
      onClose();
      setTimeout(window.location.reload(), 100);
    } catch (error) {
      alert("Something wrong!!");
    }
  };

  return (
    <>
      {props.isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="modal-close-button" onClick={onClose}>
              X
            </button>
            <span className="m-4 text-xl font-bold">Edit Music</span>

            <div className="modal-content flex-col p-5">
              <form onSubmit={handleEditMusic}>
                <div className="form-row">
                  <label className="form-label">Title</label>
                  <Input
                    className="form-input"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder={props.data.title}
                  />
                </div>
                <div className="form-row">
                  <label className="form-label">Artist</label>
                  <Input
                    className="form-input"
                    type="text"
                    name="artist"
                    value={formData.artist}
                    placeholder={props.data.artist}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-row">
                  <label className="form-label">Album</label>
                  <Input
                    className="form-input"
                    type="text"
                    name="album"
                    value={formData.album}
                    placeholder={props.data.album}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-row">
                  <label className="form-label">Genre</label>
                  <Input
                    className="form-input"
                    type="text"
                    name="genre"
                    value={formData.genre}
                    placeholder={props.data.genre}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-row">
                  <label className="form-label">Release Year</label>
                  <Input
                    className="form-input"
                    type="text"
                    name="releaseYear"
                    value={formData.release_year}
                    placeholder={props.data.release_year}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-row">
                  <label className="form-label">Choose image file:</label>
                  <Input
                    className="form-input"
                    type="file"
                    name="imageFile"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
                <div className="form-row">
                  <label className="form-label">Choose audio file:</label>
                  <Input
                    className="form-input"
                    type="file"
                    name="audioFile"
                    accept="audio/*"
                    onChange={handleAudioUpload}
                  />
                </div>
                <button
                  className="bg-blue-600 p-2 rounded-md text-white hover:bg-blue-500"
                  type="submit"
                >
                  Upload
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddMusicForm;
