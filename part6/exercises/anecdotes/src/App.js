import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { loadAction } from "./reducers/AnecdoteReducer";

import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import FilterForm from "./components/FilterForm";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => dispatch(loadAction()), [dispatch]);

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
