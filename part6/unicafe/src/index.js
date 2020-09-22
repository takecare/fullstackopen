import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

const App = () => {
  const vote = (action) => store.dispatch({ type: action });
  const good = () => vote("GOOD");
  const ok = () => vote("OK");
  const bad = () => vote("BAD");
  const reset = () => vote("ZERO");

  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={ok}>neutral</button>
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good: {store.getState().good}</div>
      <div>neutral: {store.getState().ok}</div>
      <div>bad: {store.getState().bad}</div>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

renderApp();
store.subscribe(renderApp);
