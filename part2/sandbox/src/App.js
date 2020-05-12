import React, { useState, useEffect } from "react";
import noteService from "./services/notes";
import Note from "./components/Note";

const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");

  const hook = () => {
    noteService
      .read()
      .then((notes) => setNotes(notes))
      .catch((error) => console.error(error));
  };
  useEffect(hook, []);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: input,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };

    notes
      .create(noteObject)
      .then((note) => {
        setNotes(notes.concat(note));
        setInput("");
      })
      .catch((error) => console.error(error));
  };

  const handleNoteChange = (event) => {
    setInput(event.target.value);
  };

  const handleImportanceToggle = (note) => {
    const newNote = {
      ...note,
      important: !note.important,
    };
    noteService
      .update(note)
      .then(() => {
        setNotes(
          notes.map((item) => (item.id === newNote.id ? newNote : item))
        );
      })
      .catch((error) => console.error(error));
  };

  const handleRemove = (note) => {
    noteService
      .remove(note.id)
      .then(() => {
        setNotes(notes.filter((item) => item.id !== note.id));
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={handleImportanceToggle}
            remove={handleRemove}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={input} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
