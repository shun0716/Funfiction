import { actionTypes, UnionedAction } from "../actions/index";

interface InitalState {
  isBottomNav: boolean;
  backButton: boolean;
  headerBar: boolean;
  headerTitle: string;
}

const initialstate: InitalState = {
  isBottomNav: true,
  backButton: false,
  headerBar: true,
  headerTitle: "Funfiction",
};

export const navigationReducer = (
  state = initialstate,
  action: UnionedAction
) => {
  switch (action.type) {
    case actionTypes.SYSTEM_NAVIGATION_LAYOUT:
      return {
        ...state,
        isBottomNav: action.payload.isBottomNav,
        backButton: action.payload.backButton,
        headerBar: action.payload.headerBar,
      };
    case actionTypes.SYSTEM_READ_NAVIGATION_BAR:
      return {
        ...state,
        isBottomNav: action.payload.isBottomNav,
        headerBar: action.payload.headerBar,
      };
    case actionTypes.SYSTEM_HEADER_TITLE:
      return {
        ...state,
        headerTitle: action.payload.headertitle,
      };
    case actionTypes.CLEAR_STATE:
      return initialstate;
    default:
      return state;
  }
};
