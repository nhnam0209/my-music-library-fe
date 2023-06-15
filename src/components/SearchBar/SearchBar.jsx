import React, { useState } from "react";
import MagnifyingGlass from "../Logos/IconMagnifyingGlass/MagnifyingGlass";

function SearchBar() {
  const [searchItem, setSearcnItem] = useState("");
  const handleInputChange = (event) => {
    setSearcnItem(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log(searchItem);
  };

  return (
    <div>
      {" "}
      <form className="" onSubmit={handleSearchSubmit}>
        <div className="bg-slate-50 dark:bg-slate-800 flex w-[500px] items-center self-center space-x-1.5 px-4 h-full rounded py-3 xl:px-5  ">
          <MagnifyingGlass props={{ fillColor: "black" }} />
          <input
            type="search"
            onChange={handleInputChange}
            value={searchItem}
            className="border-none bg-transparent focus:outline-none focus:ring-0 w-full text-base"
            placeholder="What are you looking for?"
          />
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
