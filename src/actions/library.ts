import { actionTypes } from "./index";

/***************     Action creator    ***************/
export const setFavoriteItem = (fav: number[]) =>
  ({
    type: actionTypes.SYSTEM_FAVORITE_STATUS,
    payload: {
      favoriteArray: fav
    }
  } as const);
