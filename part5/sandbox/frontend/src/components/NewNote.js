import React, { useState } from "react";

const NewNote = ({ handleAddNote }) => {
  const [note, setNote] = useState("");

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleAddNoteInternal = (event) => {
    event.preventDefault();
    handleAddNote(note);
    setNote("");
  };

  return (
    <form onSubmit={handleAddNoteInternal}>
      <input value={note} onChange={handleNoteChange} />
      <button type="submit">save</button>
    </form>
  );
};

export default NewNote;
