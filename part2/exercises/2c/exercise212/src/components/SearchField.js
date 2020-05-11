import React from "react";

const SearchField = ({ query, onChange }) => {
  return (
    <form>
      <div>
        <label htmlFor="name">find countries: </label>
        <input
          value={query}
          type="text"
          name="name"
          id="name"
          onChange={onChange}
        />
      </div>
    </form>
  );
};

export default SearchField;
