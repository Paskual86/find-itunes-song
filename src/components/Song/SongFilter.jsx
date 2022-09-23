import React from "react";
import { useState, useCallback, useEffect } from "react";
import { FindBand } from "../../api/FindBands";
import "./SongFilter.css";

function SongFilter({ onChangeFilter }) {
  const [band, setBand] = useState("");

  const fetchData = useCallback(async () => {
    const data = await FindBand(band, 5);
    onChangeFilter(data);
  }, [onChangeFilter, band]);

  const onChangeHandler = (event) => {
    setBand(event.target.value);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
