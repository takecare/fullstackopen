import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import Header from "./components/header";
import Content from "./components/content";
import Total from "./components/total";

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header title={course} />
      <Content title={part1} total={exercises1} />
      <Content title={part2} total={exercises2} />
      <Content title={part3} total={exercises3} />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
