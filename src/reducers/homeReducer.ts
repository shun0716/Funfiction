import { actionTypes, UnionedAction } from "../actions/index";

interface homeIState {
  width: number;
  height: string;
  left: number;
  right: number;
  bottom: number;
}

const initialstate: homeIState = {
  width: 137,
  height: "120",
  left: 5,
  right: 5,
  bottom: 5
};

export const homeReducer = (state = initialstate, action: UnionedAction) => {
  switch (action.type) {
    case actionTypes.SYSTEM_CARD_STYLE:
      return {
        ...state,
        width: action.payload.width,
        height: action.payload.height,
        left: action.payload.left,
        right: action.payload.right,
        bottom: action.payload.bottom
      };
    default:
      return state;
  }
};
