import React from "react";
import { useCallback } from "react";
import { useState, useEffect } from "react";
import { FindBand } from "../../api/FindBands";
import Card from "../UI/Card";
import SongFilter from "./SongFilter";
import SongList from "./SongList";
import "./Songs.css";

function Songs() {
  const [bands, setBands] = useState([]);

  const onChangeFilterHandler = (response) => {
    setBands(response);
  };

  const fetchBands = useCallback(async () => {
    let data = await FindBand("", 5);
    setBands(data);
  }, []);

  useEffect(() => {
    fetchBands();
  }, [fetchBands]);

  return (
    <div>
      <Card className="songs">
        <SongFilter onChangeFilter={onChangeFilterHandler}></SongFilter>
        <SongList bands={bands}></SongList>
      </Card>
    </div>
  );
}

export default Songs;
