import { actionTypes } from "./index";

/***************     Action creator    ***************/
export const setCommentView = (comment) =>
  ({
    type: actionTypes.SYSTEM_COMMENT_VIEW,
    payload: {
      commentView: comment,
    },
  } as const);

export const setFavButton = (char: string) =>
  ({
    type: actionTypes.USER_FAVORITE_BUTTON,
    payload: {
      favButton: char,
    },
  } as const);

export const setFavStatus = (boolean: boolean) =>
  ({
    type: actionTypes.USER_FAVORITE_REGISTE,
    payload: {
      favStatus: boolean,
    },
  } as const);

export const setBookData = (array) =>
  ({
    type: actionTypes.SYSTEM_BOOK_DATA,
    payload: {
      bookData: array,
    },
  } as const);
