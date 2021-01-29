import { combineReducers } from "redux";
import { navigationReducer } from "./navigationReducer";
import { authReducer } from "./authReducer";
import { registeReducer } from "./registeReducer";
import { myPageReducer } from "./myPageReducer";
import { libraryReducer } from "./libraryReducer";
import { searchReducer } from "./searchReducer";
import { bookExplanationReducer } from "./bookExplanationReducer";
import { homeReducer } from "./homeReducer";

export default combineReducers({
  navigationReducer: navigationReducer,
  authReducer: authReducer,
  registeReducer: registeReducer,
  myPageReducer: myPageReducer,
  libraryReducer: libraryReducer,
  searchReducer: searchReducer,
  bookExplanationReducer: bookExplanationReducer,
  homeReducer: homeReducer
});
