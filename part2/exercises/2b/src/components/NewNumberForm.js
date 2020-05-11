import React from "react";

const NewNumberForm = ({
  name,
  number,
  handleNameChange,
  handleNumberChange,
  addPerson,
}) => {
  return (
    <>
      <h2>add new</h2>
      <form onSubmit={addPerson}>
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
