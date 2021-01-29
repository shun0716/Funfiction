import { actionTypes } from "./index";

/***************     Action creator    ***************/
export const clearState = () =>
  ({
    type: actionTypes.CLEAR_STATE
  } as const);

export const layoutChange = () =>
  ({
    type: actionTypes.SYSTEM_NAVIGATION_LAYOUT,
    payload: {
      isBottomNav: false,
      backButton: true,
      headerBar: true
    }
  } as const);

export const readBar = () =>
  ({
    type: actionTypes.SYSTEM_READ_NAVIGATION_BAR,
    payload: {
      isBottomNav: false,
      headerBar: false
    }
  } as const);

export const titleChange = (title: string) =>
  ({
    type: actionTypes.SYSTEM_HEADER_TITLE,
    payload: {
      headertitle: title
    }
  } as const);
