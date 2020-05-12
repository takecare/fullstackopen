import React from "react";
import "./filter.css";

const Filter = ({ filter, handleChange }) => {
  return (
    <div className="filter">
      <input value={filter} onChange={handleChange} />
    </div>
  );
};

export default Filter;
