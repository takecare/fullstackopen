import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import App from "./App";
import noteReducer from "./reducers/NoteReducer";
import filterReducer from "./reducers/FilterReducer";

const appReducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer,
});
const store = createStore(appReducer, composeWithDevTools());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
