import React, { useState } from "react";
import MagnifyingGlass from "../Logos/IconMagnifyingGlass/MagnifyingGlass";
import axios from "axios";

function SearchBar() {
  const [searchItem, setSearcnItem] = useState("");
  const handleInputChange = (event) => {
    setSearcnItem(event.target.value);
  };
  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL + "/search"}`,
        {
          search_item: searchItem,
        }
      );
      if (Array.isArray(res.data.search_result)) {
        localStorage.setItem(
          "search_result",
          JSON.stringify(res.data.search_result)
        );
        alert(`Found ${res.data.search_result.length} result`);
        window.location.reload();
      } else {
        alert(`${res.data.search_result}`);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleResetSearchSubmit = () => {
    localStorage.removeItem("search_result");
    alert("The search is reset");
    window.location.reload();
  };

  return (
    <div className="inline-flex">
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
      <button className="button-primary ml-3" onClick={handleResetSearchSubmit}>
        Reset
      </button>
    </div>
  );
}

export default SearchBar;
