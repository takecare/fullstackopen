import React from "react";
import { useDispatch } from "react-redux";
import { voteAction } from "../reducers/AnecdoteReducer";

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();
  const vote = (id) => {
    dispatch(voteAction(id));
  };
  return (
    <>
      <div>
        {anecdote.content} |{" "}
        <span>
          {anecdote.votes} votes.{" "}
          <button onClick={() => vote(anecdote)}>vote</button>
        </span>
      </div>
    </>
  );
};

export default Anecdote;
