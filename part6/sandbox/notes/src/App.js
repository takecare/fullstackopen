import React from "react";
import NewNote from "./components/NewNote";
import Filter from "./components/Filter";
import Notes from "./components/Notes";

function App() {
  return (
    <div>
      <NewNote />
      <Filter />
      <Notes />
    </div>
  );
}

export default App;
