import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import anecdoteReducer from "./reducers/AnecdoteReducer";
import notificationReducer from "./reducers/NotificationReducer";
import filterReducer from "./reducers/FilterReducer";

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer,
});
const store = createStore(reducer, composeWithDevTools());

export default store;