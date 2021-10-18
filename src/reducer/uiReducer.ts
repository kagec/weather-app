import { UI_ACTION_TYPE } from "../action/ui";
import type { UIAction } from "../action/ui";

export interface UIState {
  isShowSearch: boolean;
  isFahrenheit: boolean;
}

const initialState: UIState = {
  isShowSearch: false,
  isFahrenheit: false,
};

export const uiReducer = (state = initialState, { type }: UIAction) => {
  switch (type) {
    case UI_ACTION_TYPE.TOGGLE_SHOW_SEARCH:
      return { ...state, isShowSearch: !state.isShowSearch };
    default:
      return state;
  }
};
