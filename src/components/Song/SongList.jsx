import React from "react";
import SongItem from "./SongItem";
import "./SongList.css";

function SongList(props) {
  console.log(props);

  if (props.bands.length === 0) {
    return <h2 className="song-list__fallback">No Song Found</h2>;
  }

  return (
    <ul className="song-list">
      {props.bands.map((exp, itemId) => {
        return <SongItem key={exp.id} title={exp.title}></SongItem>;
      })}
    </ul>
  );
}

export default SongList;
