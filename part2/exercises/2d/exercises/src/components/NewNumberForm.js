import React from "react";

const NewNumberForm = ({
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
      <h2>add new</h2>
      <form onSubmit={handleSubmission}>
        <div>
          name: <input value={name} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={number} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default NewNumberForm;
