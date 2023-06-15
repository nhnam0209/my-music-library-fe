import React, { useState } from "react";
import "./addmusicform.css";
import axios from "axios";
import { Input } from "antd";

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
    release_year: "",
    imageFile: imageFileURL,
    audioFile: audioFileURL,
  });

  const generateID = () => {
    return Math.floor(Math.random() * 1000000);
  };

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

  const handleAddMusic = async (event) => {
    event.preventDefault();
    formData.id = generateID();
    formData.audioFile = audioFile;
    formData.imageFile = imageFile;
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL + "/add"}`,
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
            <span className="m-4 text-xl font-bold">Add Music</span>

            <div className="modal-content flex-col p-5">
              <form onSubmit={handleAddMusic}>
                <div className="form-row">
                  <label className="form-label">Title</label>
                  <Input
                    className="form-input"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <label className="form-label">Artist</label>
                  <Input
                    className="form-input"
                    type="text"
                    name="artist"
                    value={formData.artist}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <label className="form-label">Album</label>
                  <Input
                    className="form-input"
                    type="text"
                    name="album"
                    value={formData.album}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <label className="form-label">Genre</label>
                  <Input
                    className="form-input"
                    type="text"
                    name="genre"
                    value={formData.genre}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <label className="form-label">Release Year</label>
                  <Input
                    className="form-input"
                    type="text"
                    name="release_year"
                    value={formData.release_year}
                    onChange={handleInputChange}
                    required
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
                    required
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
                    required
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
