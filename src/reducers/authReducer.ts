import { actionTypes, UnionedAction } from "../actions/index";

interface InitalState {
  open: boolean;
  emailInput: string;
  passwdInput: string;
  nameInput: string;
}

const initialstate: InitalState = {
  open: false,
  emailInput: "",
  passwdInput: "",
  nameInput: "",
};
export const authReducer = (state = initialstate, action: UnionedAction) => {
  switch (action.type) {
    case actionTypes.USER_HANDLE_CHANGE:
      return {
        ...state,
        open: action.payload.open,
      };
    case actionTypes.USER_EMAIL_VALUE:
      return {
        ...state,
        emailInput: action.payload.emailInput,
      };
    case actionTypes.USER_PASSWD_VALUE:
      return {
        ...state,
        passwdInput: action.payload.passwdInput,
      };
    default:
      return state;
  }
};
