import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createAnecdoteAction } from "../reducers/AnecdoteReducer";
import { createDisplayMessageAction } from "../reducers/NotificationReducer";
import { createHideMessageAction } from "../reducers/NotificationReducer";
import anecdotesService from "../services/AnecdotesService";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");

  const addAnecdote = async (event) => {
    event.preventDefault();

    const addedAnecdote = await anecdotesService.addAnecdote(content);
    dispatch(createAnecdoteAction(addedAnecdote.content));
    dispatch(createMessageAction("Anecdote added."));

    setContent("");
  };

  const createMessageAction = (message) => {
    const timeout = setTimeout(() => dispatch(createHideMessageAction()), 4000);
    return createDisplayMessageAction(message, timeout);
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
