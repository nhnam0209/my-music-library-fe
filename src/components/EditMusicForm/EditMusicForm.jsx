import React, { useState, useEffect } from "react";
import "./editmusicform.css";
import { Input } from "antd";
import axios from "axios";

function AddMusicForm({ props, onClose, onEdit }) {
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
    duration: "",
    audioFile: audioFileURL,
    imageFile: imageFileURL,
  });

  const [duration, setDuration] = useState(0);
  useEffect(() => {
    if (audioFileURL != null) {
      const audio = new Audio();
      audio.src = audioFileURL;
      audio.addEventListener("loadedmetadata", () => {
        setDuration(Math.floor(audio.duration));
      });
      audio.addEventListener("error", () => {
        console.error("Error loading audio file");
      });
    }
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
      const base64Audio = btoa(event.target.result);
      setAudioFile(base64Audio);
      setAudioFileURL(URL.createObjectURL(file));
    };
    reader.readAsBinaryString(file);
    console.log(duration);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const img = new Image();
    setImageFile(file);
    img.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const MAX_WIDTH = 800;
      const MAX_HEIGHT = 600;
      let width = img.width;
      let height = img.height;
      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
      setImageFileURL(dataUrl);
    };
    img.src = URL.createObjectURL(file);
  };

  const handleEditMusic = async (event) => {
    event.preventDefault();
    formData.id = props.data.id;
    formData.audioFile = audioFileURL;
    formData.imageFile = imageFileURL;
    formData.duration = duration;
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
                    name="release_year"
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
                <div className="form-row">
                  <label className="form-label">Duration</label>
                  <Input
                    className="form-input"
                    type="text"
                    value={
                      !duration !== 0
                        ? duration + "s"
                        : props.data.duration + "s"
                    }
                    name="duration"
                    readOnly={true}
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
