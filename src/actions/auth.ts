import { actionTypes } from "./index";

/***************     Action creator    ***************/
export const actionHandleChange = (modal: boolean) =>
  ({
    type: actionTypes.USER_HANDLE_CHANGE,
    payload: {
      open: modal
    }
  } as const);

export const setEmailInput = (address: string) =>
  ({
    type: actionTypes.USER_EMAIL_VALUE,
    payload: {
      emailInput: address
    }
  } as const);

export const setPasswdInput = (pass: string) =>
  ({
    type: actionTypes.USER_PASSWD_VALUE,
    payload: {
      passwdInput: pass
    }
  } as const);
