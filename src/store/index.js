import thunk from "redux-thunk";
import logger from "redux-logger";
import reducer from "../reducers";
import { createStore, applyMiddleware } from "redux";

let store;

export function configureStore() {
  store = createStore(reducer, applyMiddleware(thunk, logger));

  return store;
}
