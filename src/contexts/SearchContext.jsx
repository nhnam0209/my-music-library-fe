import React, { createContext, useState } from "react";
export const CurrentSearchContext = createContext();

const SearchContext = (props) => {
  const [searchResult, setSearchResult] = useState(null);
  return (
    <CurrentSearchContext.Provider value={{ searchResult, setSearchResult }}>
      {props.children}
    </CurrentSearchContext.Provider>
  );
};

export default SearchContext;
