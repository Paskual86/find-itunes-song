import React from "react";
import { useState } from "react";
import Card from "../UI/Card";
import SongFilter from "./SongFilter";
import SongList from "./SongList";
import "./Songs.css";

function Songs(props) {
  const [bands, setBands] = useState(props.bands);
  const onChangeFilterHandler = (response) => {
    setBands(response);
  };

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
