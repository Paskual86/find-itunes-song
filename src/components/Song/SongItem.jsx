import React from "react";
import Card from "../UI/Card";
import "./SongItem.css";

function SongItem({ title }) {
  return (
    <li>
      <Card className="song-item">
        <div className="song-item__description">
          <h2>{title}</h2>
        </div>
      </Card>
    </li>
  );
}

export default SongItem;
