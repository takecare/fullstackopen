import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

import Header from "./components/Header";

const Button = ({ text, handler }) => {
  return <button onClick={handler}>{text}</button>;
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const percentage = (good / total) * 100;

  return (
    <>
      <Header title="statistics" />
      <Entry title="good" count={good} />
      <Entry title="neutral" count={neutral} />
      <Entry title="bad" count={bad} />
      <Entry title="all" count={total} />
      <Entry title="average" count={average} />
      <Entry title="positive" count={percentage + " %"} />
    </>
  );
};

const Entry = ({ title, count }) => (
  <p>
    {title}: {count}
  </p>
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
