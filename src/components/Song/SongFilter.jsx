import React from "react";
import { useState } from "react";
import { FindBand } from "../../api/FindBands";
import "./SongFilter.css";

function SongFilter({ onChangeFilter }) {
  const [band, setBand] = useState("");

  const onChangeHandler = (event) => {
    setBand(event.target.value);
  };

  const onClickHandler = async () => {
    let data = await FindBand(band, 5);
    onChangeFilter(data);
  };

  return (
    <div className="song-filter">
      <div className="song-filter__control">
        <input
          type="text"
          placeholder="Search Band"
          onChange={onChangeHandler}
        ></input>
        <button onClick={onClickHandler}>Call</button>
      </div>
    </div>
  );
}

export default SongFilter;
