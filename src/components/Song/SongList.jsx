import React from "react";
import SongItem from "./SongItem";
import "./SongList.css";
import { useState } from "react";
import { useEffect } from "react";

function SongList(props) {
  const [bandQueue, setBandQueue] = useState([]);

  useEffect(() => {
    if (props.bands.length > 0) {
      setBandQueue(props.bands);
    }
  }, [props.bands]);

  useEffect(() => {
    const interval = setInterval(() => {
      let arrayAux = [...bandQueue];
      let firstValue = arrayAux.shift();
      arrayAux.push(firstValue);
      setBandQueue(arrayAux);
    }, 1000);
    return () => clearInterval(interval);
  }, [bandQueue]);

  if (props.bands.length === 0) {
    return <h2 className="song-list__fallback">No Song Found</h2>;
  }

  return (
    <ul className="song-list">
      {bandQueue.map((band, itemId) => {
        return <SongItem key={band.id} title={band.title}></SongItem>;
      })}
    </ul>
  );
}

export default SongList;
