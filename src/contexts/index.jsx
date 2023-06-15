import React, { createContext, useState } from "react";
export const MusicContext = createContext(null);

const ContextIndex = (props) => {
  const [musicData, setMusicData] = useState(null);
  const [searchResult, setSearchResult] = useState(null);

  return (
    <MusicContext.Provider
      value={{ musicData, setMusicData, searchResult, setSearchResult }}
    >
      {props.children}
    </MusicContext.Provider>
  );
};

export default ContextIndex;
