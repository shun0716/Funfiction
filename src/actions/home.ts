import { actionTypes } from "./index";

/***************     Action creator    ***************/
export const setCardStyle = (
  width: number,
  height: string,
  left: number,
  right: number,
  bottom: number
) =>
  ({
    type: actionTypes.SYSTEM_CARD_STYLE,
    payload: {
      width: width,
      height: height,
      left: left,
      right: right,
      bottom: bottom
    }
  } as const);
