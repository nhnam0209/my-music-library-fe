import React from "react";
import "./resultlist.css";
function ResultList() {
  const resultItems = [
    {
      id: 1,
      title: "Animals",
      artist: "Martin Garrix",
      genre: "EDM",
      release_year: "2012",
      album: "Animals",
    },
    {
      id: 2,
      title: "Levels",
      artist: "Avicii",
      genre: "EDM",
      release_year: "2012",
      album: "Animals",
    },
    {
      id: 3,
      title: "Believer",
      artist: "Imagine Dragon",
      genre: "Rock",
      release_year: "2012",
      album: "Believer",
    },
  ];
  const resultItem = resultItems.map((item) => {
    return (
      <div className="music-card text-left" key={item.id}>
        <img src="/test.jpg" alt={item.title} />
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
          <button>Play</button>
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
