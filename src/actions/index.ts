import store from "../store";
import { clearState, layoutChange, readBar, titleChange } from "./navigation";
import { actionHandleChange, setEmailInput, setPasswdInput } from "./auth";
import {
  setCommentView,
  setFavButton,
  setFavStatus,
  setBookData
} from "./bookExplanation";
import { setUserName, setPoint, setUid } from "./myPage";
import { setFavoriteItem } from "./library";
import { setSearchResultPosts } from "./search";
import {
  actionHandleChange as registeHandleChange,
  setEmailInput as registeEmail,
  setPasswdInput as registePasswd,
  setNameInput,
  setCreateStatus
} from "./registe";
import { setCardStyle } from "./home";

/***************     Action type     ***************/
export enum actionTypes {
  CLEAR_STATE = "CLEAR_STATE",
  SYSTEM_HEADER_TITLE = "SYSTEM_HEADER_TITLE",
  SYSTEM_NAVIGATION_LAYOUT = "SYSYEM_NAVIGATION_LAYOUT",
  SYSTEM_READ_NAVIGATION_BAR = "SYSTEM_READ_NAVIGATION_BAR",
  SYSTEM_TREND_DELETE = "SYSTEM_TREND_DELETE",
  SYSTEM_CREATE_STATUS = "SYSTEM_CREATE_STATUS",
  SYSTEM_FAVORITE_STATUS = "SYSTEM_FAVORITE_STATUS",
  SYSTEM_USER_NAME_VIEW = "SYSTEM_USER_NAME_VIEW",
  SYSTEM_POINT_VIEW = "SYSTEM_POINT_VIEW",
  SYSTEM_UID_VIEW = "SYSTEM_UID_VIEW",
  SYSTEM_COMMENT_VIEW = "SYSTEM_COMMENT_VIEW",
  SYSTEM_BOOK_DATA = "SYSTEM_BOOK_DATA",
  SYSTEM_CARD_STYLE = "SYSTEM_CARD_STYLE",
  USER_HANDLE_CHANGE = "USER_HANDLE_CHANGE",
  USER_EMAIL_VALUE = "USER_EMAIL_VALUE",
  USER_PASSWD_VALUE = "USER_PASSWD_VALUE",
  USER_NAME_VALUE = "USER_NAME_VALUE",
  USER_SEARCH = "USER_SEARCH",
  USER_REGIST_HANDLE_CHANGE = "USER_REGIST_HANDLE_CHANGE",
  USER_REGIST_EMAIL_VALUE = "USER_REGIST_EMAIL_VALUE",
  USER_REGIST_PASSWD_VALUE = "USER_REGIST_PASSWD_VALUE",
  USER_REGIST_NAME_VALUE = "USER_REGIST_NAME_VALUE",
  USER_FAVORITE_BUTTON = "USER_FAVORITE_BUTTON",
  USER_FAVORITE_REGISTE = "USER_FAVORITE_REGISTE"
}

export type UnionedAction =
  | ReturnType<typeof clearState>
  | ReturnType<typeof layoutChange>
  | ReturnType<typeof readBar>
  | ReturnType<typeof titleChange>
  | ReturnType<typeof actionHandleChange>
  | ReturnType<typeof setEmailInput>
  | ReturnType<typeof setPasswdInput>
  | ReturnType<typeof registeHandleChange>
  | ReturnType<typeof registeEmail>
  | ReturnType<typeof registePasswd>
  | ReturnType<typeof setNameInput>
  | ReturnType<typeof setCreateStatus>
  | ReturnType<typeof setCommentView>
  | ReturnType<typeof setFavButton>
  | ReturnType<typeof setFavStatus>
  | ReturnType<typeof setUserName>
  | ReturnType<typeof setPoint>
  | ReturnType<typeof setUid>
  | ReturnType<typeof setFavoriteItem>
  | ReturnType<typeof setSearchResultPosts>
  | ReturnType<typeof setBookData>
  | ReturnType<typeof setCardStyle>;

export type allState = ReturnType<typeof store.getState>;
