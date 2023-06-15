import React, { useState } from "react";
import "./musicplayerbar.css";
// import useSound from "use-sound";

function MusicPlayerBar({ props }) {
  const [isPlaying, setIsPlaying] = useState(false);
  //   const [play, { pause, duration, sound }] = useSound(props.music);

  const playingButton = () => {
    if (isPlaying) {
      //   pause();
      setIsPlaying(false);
    } else {
      //   play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="component">
      <div className="flex flex-row ">
        <div className="inline-block align-middle">
          {/* <img src={props.music.img} alt="" /> */}
          <img className="h-10 w-10" src="./logo512.png" alt="" />
        </div>
        <div className="">
          <h3 className="title">title</h3>
          <p className="subTitle">subtitle</p>
        </div>
      </div>

      <div>
        {!isPlaying ? (
          <button className="playButton" onClick={playingButton}>
            {/* <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
              <AiFillPlayCircle />
            </IconContext.Provider> */}
            Play
          </button>
        ) : (
          <button className="playButton" onClick={playingButton}>
            {/* <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
              <AiFillPauseCircle />
            </IconContext.Provider> */}
            Pause
          </button>
        )}{" "}
      </div>
    </div>
  );
}

export default MusicPlayerBar;
