import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FindBand } from "../../api/FindBands";
import "./SongFilter.css";

function SongFilter({ onChangeFilter }) {
  const [band, setBand] = useState("");
  const [bandList, setBandList] = useState([]);

  const onChangeHandler = (event) => {
    setBand(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await FindBand(band, 5);
      setBandList(data);
    };

    fetchData();
  }, [band]);

  useEffect(() => {
    onChangeFilter(bandList);
  }, [bandList, onChangeFilter]);

  return (
    <div className="song-filter">
      <div className="song-filter__control">
        <input
          type="text"
          placeholder="Search Band"
          onChange={onChangeHandler}
        ></input>
      </div>
    </div>
  );
}

export default SongFilter;
