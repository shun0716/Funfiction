import { actionTypes, UnionedAction } from "../actions/index";

interface InitalState {
  userName: string;
  point: number;
  uid: string;
}
const initialstate: InitalState = {
  userName: "ゲスト",
  point: 0,
  uid: "",
};

export const myPageReducer = (state = initialstate, action: UnionedAction) => {
  switch (action.type) {
    case actionTypes.SYSTEM_USER_NAME_VIEW:
      return {
        ...state,
        userName: action.payload.userName,
      };
    case actionTypes.SYSTEM_POINT_VIEW:
      return {
        ...state,
        point: action.payload.point,
      };
    case actionTypes.SYSTEM_UID_VIEW:
      return {
        ...state,
        uid: action.payload.uid,
      };
    default:
      return state;
  }
};
