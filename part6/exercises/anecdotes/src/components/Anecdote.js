import React from "react";
import { useDispatch } from "react-redux";
import { createVoteAction } from "../reducers/AnecdoteReducer";

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();
  const vote = (id) => {
    dispatch(createVoteAction(id));
  };
  return (
    <>
      <div>
        {anecdote.content} |{" "}
        <span>
          {anecdote.votes} votes.{" "}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </span>
      </div>
    </>
  );
};

export default Anecdote;
