import { combineReducers } from "redux";
import { uiReducer } from "./uiReducer";
import { entitiesReducer } from "./entitiesReducer";

export const reducer = combineReducers({
  entities: entitiesReducer,
  ui: uiReducer,
});
