import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import anecdoteReducer from "./reducers/AnecdoteReducer";
import notificationReducer from "./reducers/NotificationReducer";
import filterReducer from "./reducers/FilterReducer";
import thunk from "redux-thunk";

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer,
});
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
