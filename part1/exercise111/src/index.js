import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

import Header from "./components/Header";

const Button = ({ text, handler }) => {
  return <button onClick={handler}>{text}</button>;
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;

  if (total === 0) {
    return <p>No feedback given</p>;
  }

  const average = (good - bad) / total;
  const percentage = (good / total) * 100;

  return (
    <table>
      <tbody>
        <Entry title="good" count={good} />
        <Entry title="neutral" count={neutral} />
        <Entry title="bad" count={bad} />
        <Entry title="all" count={total} />
        <Entry title="average" count={average} />
        <Entry title="positive" count={percentage + " %"} />
      </tbody>
    </table>
  );
};

const Entry = ({ title, count }) => (
  <tr>
    <td>{title}:</td>
    <td>{count}</td>
  </tr>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header title="give feedback" />
      <Button text="good" handler={() => setGood(good + 1)} />
      <Button text="neutral" handler={() => setNeutral(neutral + 1)} />
      <Button text="bad" handler={() => setBad(bad + 1)} />
      <Header title="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
