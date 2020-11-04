import { combineReducers } from "redux";
import userReducer from "./userReducer";
import itemReducer from "./itemReducer";
import themeReducer from "./themeReducer";
import langReducer from "./langReducer";

export default combineReducers({
  user: userReducer,
  items: itemReducer,
  theme: themeReducer,
  language: langReducer,
});
