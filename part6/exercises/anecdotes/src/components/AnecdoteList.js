import React from "react";
import { useSelector } from "react-redux";
import Anecdote from "./Anecdote";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter.filter);

  return (
    <div>
      <h3>Anecdotes</h3>
      {anecdotes
        .filter((anecdote) =>
          filter
            ? anecdote.content.toLowerCase().includes(filter.toLowerCase())
            : true
        )
        .sort((first, second) => (first.votes >= second.votes ? -1 : 1))
        .map((anecdote) => (
          <Anecdote key={anecdote.id} anecdote={anecdote} />
        ))}
    </div>
  );
};

export default AnecdoteList;
