import { actionTypes, UnionedAction } from "../actions/index";

interface InitalState {
  open: boolean;
  emailInput: string;
  passwdInput: string;
  nameInput: string;
  createStatus: string;
}

const initialstate: InitalState = {
  open: false,
  emailInput: "",
  passwdInput: "",
  nameInput: "",
  createStatus: "会員登録",
};

export const registeReducer = (state = initialstate, action: UnionedAction) => {
  switch (action.type) {
    case actionTypes.USER_REGIST_HANDLE_CHANGE:
      return {
        ...state,
        open: action.payload.open,
      };
    case actionTypes.USER_REGIST_EMAIL_VALUE:
      return {
        ...state,
        emailInput: action.payload.emailInput,
      };
    case actionTypes.USER_REGIST_PASSWD_VALUE:
      return {
        ...state,
        passwdInput: action.payload.passwdInput,
      };
    case actionTypes.USER_REGIST_NAME_VALUE:
      console.log(action.payload);

      return {
        ...state,
        nameInput: action.payload.nameInput,
      };
    case actionTypes.SYSTEM_CREATE_STATUS:
      return {
        ...state,
        createStatus: action.payload.createStatus,
      };
    default:
      return state;
  }
};
