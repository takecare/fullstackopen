import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

import Header from "./components/Header";

const Button = ({ text, handler }) => {
  return <button onClick={handler}>{text}</button>;
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
      <Header title="statistics" />
      <Entry title="good" count={good} />
      <Entry title="neutral" count={neutral} />
      <Entry title="bad" count={bad} />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
