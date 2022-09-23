import React, { useEffect } from "react";
import { useState } from "react";
import { FindBand } from "../../api/FindBands";
import Songs from "../Song/Songs";

export default function Home() {
  const [bands, setBand] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let data = await FindBand("", 5);
      setBand(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Songs bands={bands}></Songs>
    </div>
  );
}
