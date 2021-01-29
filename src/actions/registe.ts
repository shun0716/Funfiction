import { actionTypes } from "./index";

/***************     Action creator    ***************/
export const actionHandleChange = (modal: boolean) =>
  ({
    type: actionTypes.USER_REGIST_HANDLE_CHANGE,
    payload: {
      open: modal
    }
  } as const);

export const setEmailInput = (address: string) =>
  ({
    type: actionTypes.USER_REGIST_EMAIL_VALUE,
    payload: {
      emailInput: address
    }
  } as const);

export const setPasswdInput = (pass: string) =>
  ({
    type: actionTypes.USER_REGIST_PASSWD_VALUE,
    payload: {
      passwdInput: pass
    }
  } as const);

export const setNameInput = (name: string) =>
  ({
    type: actionTypes.USER_REGIST_NAME_VALUE,
    payload: {
      nameInput: name
    }
  } as const);

export const setCreateStatus = (message: string) =>
  ({
    type: actionTypes.SYSTEM_CREATE_STATUS,
    payload: {
      createStatus: message
    }
  } as const);
