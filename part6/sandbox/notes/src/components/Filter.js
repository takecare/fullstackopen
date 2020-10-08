import React from "react";
import { useDispatch } from "react-redux";
import {
  filterImportant,
  filterNotImportant,
  filterAll,
} from "../reducers/FilterReducer";

const Filter = () => {
  const dispatch = useDispatch();
  return (
    <div>
      {" "}
      all{" "}
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterAll())}
      />{" "}
      important{" "}
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterImportant())}
      />{" "}
      nonimportant{" "}
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterNotImportant())}
      />{" "}
    </div>
  );
};

export default Filter;
