import React from "react";
import SongItem from "./SongItem";
import "./SongList.css";
import { useEffect } from "react";
import {
  ReorganizateArray,
  ReorganizateArrayAddNewValue,
} from "../Helpers/ArrayHelper";
import { useReducer } from "react";

const bandListReducer = (state, action) => {
  if (action.type === "REORGANIZATE") {
    if (state.newValues && state.newValues.length > 0) {
      let newValuesAux = [...state.newValues];
      let firstValue = newValuesAux.shift();
      let currentStateValue = state.value.map((mp) => mp.title);
      if (currentStateValue.indexOf(firstValue) > 0) {
        console.log("El item ya existe en la lista");
        firstValue = newValuesAux.shift();
      }
      return {
        newValues: newValuesAux,
        value: ReorganizateArrayAddNewValue(state.value, firstValue),
      };
    } else {
      return {
        value: ReorganizateArray(state.value),
      };
    }
  }

  if (action.type === "FILL") {
    if (!state.value || state.value.length === 0) {
      return {
        initialValue: action.val,
        value: action.val,
      };
    } else {
      return {
        initialValue: state.initialValue,
        newValues: action.val,
        value: state.value,
      };
    }
  }
};

function SongList(props) {
  const [bandList, dispatchBandList] = useReducer(bandListReducer, {
    value: [],
  });

  useEffect(() => {
    if (props.bands.length > 0) {
      dispatchBandList({
        type: "FILL",
        val: props.bands,
      });
    }
  }, [props.bands]);

  useEffect(() => {
    const intervalLoop = setInterval(() => {
      dispatchBandList({ type: "REORGANIZATE" });
    }, 1000);
    return () => clearInterval(intervalLoop);
  }, []);

  if (props.bands.length === 0) {
    return <h2 className="song-list__fallback">No Song Found</h2>;
  }

  return (
    <ul className="song-list">
      {bandList.value.map((band, itemId) => {
        return <SongItem key={band.id} title={band.title}></SongItem>;
      })}
    </ul>
  );
}

export default SongList;
