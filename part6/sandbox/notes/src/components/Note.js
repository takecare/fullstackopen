import React from "react";
import { useDispatch } from "react-redux";
import { toggleImportanceOf } from "../reducers/NoteReducer.js";

const Note = ({ note }) => {
  const dispatch = useDispatch();

  const toggleImportance = () => {
    dispatch(toggleImportanceOf(note.id));
  };

  return (
    <li key={note.id} onClick={() => toggleImportance(note.id)}>
      <span>
        {note.content}
        {" ["}
        {note.important ? <strong>important</strong> : "not important"}
        {"]"}
      </span>
    </li>
  );
};

export default Note;
