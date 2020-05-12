import React from "react";

const Note = ({ note, toggleImportance, remove }) => {
  const label = note.important ? "not important" : "important";
  const content = note.important ? <b>{note.content}</b> : note.content;
  return (
    <li>
      {content}
      <button onClick={() => toggleImportance(note)}>{label}</button>
      <button onClick={() => remove(note)}>delete</button>
    </li>
  );
};

export default Note;
