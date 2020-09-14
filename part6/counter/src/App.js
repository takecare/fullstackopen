import React from "react";
import "./App.css";

function App({ store }) {
  return (
    <div className="App">
      <div>{store.getState()}</div>
      <button onClick={(event) => store.dispatch({ type: "INCREMENT" })}>
        +
      </button>
      <button onClick={(event) => store.dispatch({ type: "DECREMENT" })}>
        -
      </button>
      <button onClick={(event) => store.dispatch({ type: "RESET" })}>
        reset
      </button>
    </div>
  );
}

export default App;
