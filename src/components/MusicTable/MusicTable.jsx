import React from "react";
import "./musictable.css";

function MusicTable() {
  const tableItems = [];

  return (
    <div className="m-4">
      <table className="w-full overflow-auto">
        <thead>
          <tr className="text-center">
            <th>ID</th>
            <th>Cover Image</th>
            <th>Title</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Genre</th>
            <th>Release Year</th>
            <th>Duration</th>
            <th>More Option</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {tableItems.length === 0 ? (
              <td className="text-slate-400 h-[200px]" colSpan="9">
                <div className="text-center text-xl md:text-5xl flex justify-center items-center">
                  <span className="flex self-center text-[20px] font-bold">
                    Add new songs
                  </span>
                </div>{" "}
              </td>
            ) : (
              <>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default MusicTable;
