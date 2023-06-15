import React from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import ResultList from "../components/ResultList/ResultList";

function SearchPage() {
  return (
    <div className="flex flex-col justify-center">
      <div className="self-center">
        <SearchBar></SearchBar>
      </div>
      <div className="my-4">
        <ResultList></ResultList>
      </div>
    </div>
  );
}

export default SearchPage;
