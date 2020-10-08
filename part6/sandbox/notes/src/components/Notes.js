import React from "react";
import { useSelector } from "react-redux";
import Note from "./Note";

const Notes = () => {
  const noteFilter = (filter) => (note) => {
    switch (filter) {
      case "IMPORTANT":
        return note.important;
      case "NOT_IMPORTANT":
        return !note.important;
      case "ALL":
        return true;
      default:
        return true;
    }
  };
  const notes = useSelector((state) =>
    state.notes.filter(noteFilter(state.filter))
  );

  return (
    <ul>
      {notes.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </ul>
  );
};

export default Notes;
