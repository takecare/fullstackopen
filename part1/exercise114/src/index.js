import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const findMax = (array) => {
  let max = Number.MIN_VALUE;
  let index = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i];
      index = i;
    }
  }
  return index;
};

const Anecdote = ({ title, anecdote, votes }) => {
  return (
    <>
      <h1>{title}</h1>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </>
  );
};

const MostVoted = ({ anecdotes, votes }) => {
  const max = findMax(votes);
  return (
    <Anecdote title="most voted" anecdote={anecdotes[max]} votes={votes[max]} />
  );
};

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, updateVotes] = useState(props.anecdotes.map((_) => 0));

  const randomInt = (max) => Math.floor(Math.random() * Math.floor(max));

  const vote = () => {
    const newVotes = votes.slice();
    newVotes[selected] = newVotes[selected] + 1;
    updateVotes(newVotes);
  };

  const nextAnecdote = () => {
    let newSelected;
    do {
      newSelected = randomInt(props.anecdotes.length - 1);
    } while (selected === newSelected);
    setSelected(newSelected);
  };

  return (
    <div>
      <Anecdote
        title="anecdote of the day"
        anecdote={props.anecdotes[selected]}
        votes={votes[selected]}
      />
      <button onClick={vote}>vote</button>
      <button onClick={nextAnecdote}>next anecdote</button>

      <MostVoted anecdotes={props.anecdotes} votes={votes} />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
