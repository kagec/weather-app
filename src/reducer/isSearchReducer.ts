import { IS_SEARCH_ACTION_TYPE } from "../action/isSearch";
import type { IsSearchOffAction, IsSearchOnAction } from "../action/isSearch";

export interface IsSearch {
  isSearch: boolean;
}

const initialState: IsSearch = {
  isSearch: false,
};

export const isSearchReducer = (
  state = initialState,
  { type, payload }: IsSearchOnAction | IsSearchOffAction
) => {
  switch (type) {
    case IS_SEARCH_ACTION_TYPE.IS_SEARCH_ON:
      return { ...state, isSearch: payload };
    case IS_SEARCH_ACTION_TYPE.IS_SEARCH_OFF:
      return { ...state, isSearch: payload };
    default:
      return state;
  }
};
