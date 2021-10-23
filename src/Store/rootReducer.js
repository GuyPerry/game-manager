import { combineReducers } from "redux";
import gamesReducer from "../Reducers/gamesReducer";
import asyncReducer from "../Reducers/ayncReducer";

const rootReducer = combineReducers({
  games: gamesReducer,
  async: asyncReducer,
});

export default rootReducer;
