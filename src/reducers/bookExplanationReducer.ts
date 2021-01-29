import { actionTypes, UnionedAction } from "../actions/index";

interface CommentView {
  comment: string;
  date: string;
  src: string;
  userName: string;
}

export interface BookData {
  comment: CommentView[];
  creator: string;
  creatorid: string;
  favorite: number;
  id: number;
  src: string;
  synopsis: string;
  title: string;
}

interface Initialstate {
  commentView: CommentView[];
  bookData: BookData[];
  favButton: string;
  favStatus: boolean;
}

const initialstate: Initialstate = {
  commentView: [],
  bookData: [],
  favButton: "お気に入り登録",
  favStatus: false,
};

export const bookExplanationReducer = (
  state = initialstate,
  action: UnionedAction
) => {
  switch (action.type) {
    case actionTypes.SYSTEM_COMMENT_VIEW:
      return {
        ...state,
        commentView: action.payload.commentView,
      };
    case actionTypes.USER_FAVORITE_BUTTON:
      return {
        ...state,
        favButton: action.payload.favButton,
      };
    case actionTypes.USER_FAVORITE_REGISTE:
      return {
        ...state,
        favStatus: action.payload.favStatus,
      };
    case actionTypes.SYSTEM_BOOK_DATA:
      return {
        ...state,
        bookData: action.payload.bookData,
      };
    default:
      return state;
  }
};
