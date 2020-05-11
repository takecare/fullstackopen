import React from "react";

const FilterInput = ({ filter, handleChange }) => {
  return (
    <div>
      filter: <input value={filter} onChange={handleChange} />
    </div>
  );
};

export default FilterInput;
