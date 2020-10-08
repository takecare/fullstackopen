import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import App from "./App";
import noteReducer from "./reducers/NoteReducer";
import filterReducer from "./reducers/FilterReducer";

// https://github.com/zalmoxisus/redux-devtools-extension#usage
const enableReduxDevTools = () =>
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const appReducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer,
});
const store = createStore(appReducer, enableReduxDevTools());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
