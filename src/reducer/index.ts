import { combineReducers } from "redux";

import { isSearchReducer } from "./isSearchReducer";
import { entitiesReducer } from "./entitiesReducer";

export const reducer = combineReducers({
  isSearch: isSearchReducer,
  entities: entitiesReducer,
});
