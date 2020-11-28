import React from "react";
import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import FilterForm from "./components/FilterForm";

const App = () => {
  return (
    <div>
      <h1>Anecdotes</h1>
      <Notification />
      <FilterForm />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
