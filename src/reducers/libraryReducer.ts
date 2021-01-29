import { actionTypes, UnionedAction } from "../actions/index";
import { BookData } from "./bookExplanationReducer";

interface InitalState {
  favoriteArray: BookData[];
}
const initialstate: InitalState = {
  favoriteArray: [],
};

export const libraryReducer = (state = initialstate, action: UnionedAction) => {
  switch (action.type) {
    case actionTypes.SYSTEM_FAVORITE_STATUS:
      return {
        ...state,
        favoriteArray: action.payload.favoriteArray,
      };
    default:
      return state;
  }
};
