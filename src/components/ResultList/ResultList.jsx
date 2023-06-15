import React, { useEffect, useMemo, useState } from "react";
import "./resultlist.css";

function ResultList({ props }) {
  const [resultItems, setResultItems] = useState([]);
  const [isPlay, setIsPlay] = useState(false);
  // const [audioItem, setAudioItem] = useState("");

  useEffect(() => {
    if (localStorage.getItem("search_result")) {
      setResultItems(JSON.parse(localStorage.getItem("search_result")));
    }
  }, []);

  const handlePlay = (item) => {
    isPlay ? setIsPlay(false) : setIsPlay(true);
    const audio = new Audio(item.audio);
    if (isPlay) {
      audio.pause();
    } else {
      audio.pause();
    }
  };

  const resultItem = resultItems.map((item) => {
    return (
      <div className="music-card text-left" key={item.id}>
        <img src={item.image} alt={item.title} />
        <div className="music-details">
          <div className="grid grid-cols-2">
            <div>
              <h2>
                <strong>{item.title}</strong>
              </h2>
              <p>{item.artist}</p>
            </div>
            <div>
              <p>
                <strong>Genre:</strong> {item.genre}
              </p>
              <p>
                <strong>Year:</strong> {item.release_year}
              </p>
              <p>
                <strong>Album:</strong> {item.album}
              </p>
            </div>
          </div>
          <button onClick={() => handlePlay(item)}>
            {isPlay ? "Pause" : "Play"}
          </button>
        </div>
      </div>
    );
  });
  return (
    <div>
      {resultItems.length > 0 ? (
        resultItem
      ) : (
        <div className="h-[200px] md:h-[700px] flex justify-center text-slate-400">
          <div className="text-center text-xl md:text-5xl flex justify-center items-center">
            <span className="flex self-center text-[20px] font-bold">
              Start searching song/artist/album/genre
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResultList;
