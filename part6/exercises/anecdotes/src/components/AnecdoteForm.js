import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createAnecdoteAction } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const [content, setContent] = useState();

  const addAnecdote = (event) => {
    event.preventDefault();
    setContent("");
    dispatch(createAnecdoteAction(content));
  };

  const handleInputChange = (event) => setContent(event.target.value);

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" value={content} onChange={handleInputChange} />
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
