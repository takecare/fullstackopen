import React from "react";
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
      {anecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      ))}
    </div>
  );
};

const NewAnecdote = () => {
  const dispatch = useDispatch();
  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(createAnecdoteAction(content));
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
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
