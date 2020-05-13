import React from "react";
import "./numberform.css";

const NumberForm = ({
  name,
  number,
  handleNameChange,
  handleNumberChange,
  addNumber,
}) => {
  const handleSubmission = (event) => {
    event.preventDefault();
    addNumber();
  };

  return (
    <>
      <form onSubmit={handleSubmission}>
        <div className="numberform">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            className="leading"
            value={name}
            onChange={handleNameChange}
          />
          <label htmlFor="number">Number:</label>
          <input id="number" value={number} onChange={handleNumberChange} />
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default NumberForm;
