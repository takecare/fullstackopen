import React, { useState, useEffect } from 'react';
import noteService from './services/notes';
import loginService from './services/login';
import Login from './components/Login';
import Logout from './components/Logout';
import Notification from './components/Notification';
import Note from './components/Note';
import NewNote from './components/NewNote';
import Toggable from './components/Toggable';
import DevInfo from './components/devinfo/DevInfo';
import './App.css';

const App = (props) => {
  const MESSAGE_TIMEOUT_MS = 3000;

  const [notes, setNotes] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState(null);
  const [storedTimeout, storeTimeout] = useState(null);

  const getNotesEffect = () => {
    noteService
      .read()
      .then((notes) => setNotes(notes))
      .catch((error) => console.error(error));
  };
  useEffect(getNotesEffect, []);

  const loadUserEffect = () => {
    const stored = window.localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  };
  useEffect(loadUserEffect, []);

  const addNote = (note) => {
    newNoteRef.current.toggleVisibility();
    const noteObject = {
      content: note,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };
    noteService
      .create(noteObject, user.token)
      .then((note) => setNotes(notes.concat(note)))
      .catch((error) => setErrorMessage('Failed do add note.'));
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

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login(username, password);
      setUser(user);
      window.localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error(error);
      setUser(null);
      window.localStorage.removeItem('user');
      displayNotice('Login failed');
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('user');
  };

  const displayNotice = (message) => {
    clearTimeout(storedTimeout);
    setErrorMessage(message);
    const timeout = setTimeout(() => {
      storeTimeout(null);
      setErrorMessage('');
    }, MESSAGE_TIMEOUT_MS);
    storeTimeout(timeout);
  };

  const authComponent = () =>
    user === null ? (
      <Toggable label="login">
        <Login handleLogin={handleLogin} />
      </Toggable>
    ) : (
      <Logout user={user} handleLogout={handleLogout} />
    );

  const newNoteRef = React.createRef();
  const addNoteComponent = () => {
    return (
      user != null && (
        <Toggable label="new note" ref={newNoteRef}>
          <NewNote handleAddNote={addNote} />
        </Toggable>
      )
    );
  };

  return (
    <div>
      <h1>Notes</h1>
      {authComponent()}
      <Notification message={errorMessage} />
      <ul className="notes">
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={handleImportanceToggle}
            remove={handleRemove}
          />
        ))}
      </ul>
      {addNoteComponent()}
      <DevInfo />
    </div>
  );
};

export default App;
