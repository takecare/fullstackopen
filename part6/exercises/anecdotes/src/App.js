import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createVoteAction,
  createAnecdoteAction,
} from "./reducers/anecdoteReducer";

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();
  const vote = (id) => {
    dispatch(createVoteAction(id));
  };
  return (
    <>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </>
  );
};

const Anecdotes = () => {
  const anecdotes = useSelector((state) => state);
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .sort((first, second) => (first.votes >= second.votes ? -1 : 1))
        .map((anecdote) => (
          <Anecdote key={anecdote.id} anecdote={anecdote} />
        ))}
    </div>
  );
};

const NewAnecdote = () => {
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

const App = () => {
  return (
    <div>
      <Anecdotes />
      <NewAnecdote />
    </div>
  );
};

export default App;
