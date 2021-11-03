import { UI_ACTION_TYPE } from "../action/ui";
import type { UIAction } from "../action/ui";

export interface UIState {
  isShowSearch: boolean;
  isFahrenheit: boolean;
  isSearch: boolean;
}

const initialState: UIState = {
  isShowSearch: false,
  isFahrenheit: false,
  isSearch: false,
};

export const uiReducer = (state = initialState, { type }: UIAction) => {
  switch (type) {
    case UI_ACTION_TYPE.TOGGLE_SHOW_SEARCH:
      return { ...state, isShowSearch: !state.isShowSearch };
    case UI_ACTION_TYPE.CHANGE_DEGREE_FAHRENHEIT:
      return { ...state, isFahrenheit: true };
    case UI_ACTION_TYPE.CHANGE_DEGREE_CELSIUS:
      return { ...state, isFahrenheit: false };
    case UI_ACTION_TYPE.TOGGLE_IS_SEARCH:
      return { ...state, isSearch: !state.isSearch };
    default:
      return state;
  }
};
