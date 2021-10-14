import { UI_ACTION_TYPE } from "../action/ui";
import type { UIAction } from "../action/ui";

export interface UIState {
  isShowSearch: boolean;
}

const initialState: UIState = {
  isShowSearch: false,
};

export const uiReducer = (
  state = initialState,
  { type, payload }: UIAction
) => {
  switch (type) {
    case UI_ACTION_TYPE.IS_SEARCH_ON:
      return { ...state, isShowSearch: payload };
    case UI_ACTION_TYPE.IS_SEARCH_OFF:
      return { ...state, isShowSearch: payload };
    default:
      return state;
  }
};
