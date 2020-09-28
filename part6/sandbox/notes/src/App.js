import React from "react";
import NewNote from "./components/NewNote";
import { useSelector, useDispatch } from "react-redux";
import { toggleImportanceOf } from "./reducers/NoteReducer.js";

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

const Notes = ({ notes }) => {
  return (
    <ul>
      {notes.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </ul>
  );
};

function App() {
  const notes = useSelector((state) => state);

  return (
    <div>
      <NewNote />
      <Notes notes={notes} />
    </div>
  );
}

export default App;
