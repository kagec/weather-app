import { UI_ACTION_TYPE } from "../action/ui";
import type { UIAction } from "../action/ui";

export interface UIState {
  isShowSearch: boolean;
}

const initialState: UIState = {
  isShowSearch: false,
};

export const uiReducer = (state = initialState, { type }: UIAction) => {
  switch (type) {
    case UI_ACTION_TYPE.IS_SEARCH_ON:
      return { ...state, isShowSearch: true };
    case UI_ACTION_TYPE.IS_SEARCH_OFF:
      return { ...state, isShowSearch: false };
    default:
      return state;
  }
};
