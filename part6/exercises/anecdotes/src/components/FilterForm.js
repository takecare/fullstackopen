import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createUpdateFilterAction,
  createClearFilterAction,
} from "../reducers/FilterReducer";

const FilterForm = () => {
  const [filter, setFilter] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const value = event.target.value;
    setFilter(value);
    dispatch(createUpdateFilterAction(value));
  };

  const clearFilter = () => {
    setFilter("");
    dispatch(createClearFilterAction());
  };

  return (
    <>
      <input name="anecdote" value={filter} onChange={handleInputChange} />
      <button onClick={clearFilter}>clear</button>
    </>
  );
};

export default FilterForm;
