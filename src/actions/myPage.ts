import { actionTypes } from "./index";

/***************     Action creator    ***************/
export const setUserName = (name: string) =>
  ({
    type: actionTypes.SYSTEM_USER_NAME_VIEW,
    payload: {
      userName: name
    }
  } as const);

export const setPoint = (num: number) =>
  ({
    type: actionTypes.SYSTEM_POINT_VIEW,
    payload: {
      point: num
    }
  } as const);

export const setUid = (id: string) =>
  ({
    type: actionTypes.SYSTEM_UID_VIEW,
    payload: {
      uid: id
    }
  } as const);
