import { actionTypes, UnionedAction } from "../actions/index";

interface InitalState {
  searchResultPosts: object[];
}

const initialstate: InitalState = {
  searchResultPosts: [],
};

export const searchReducer = (state = initialstate, action: UnionedAction) => {
  switch (action.type) {
    case actionTypes.USER_SEARCH:
      return {
        ...state,
        searchResultPosts: action.payload.searchResultPosts,
      };
    default:
      return state;
  }
};
