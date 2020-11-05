import { combineReducers } from "redux";
import userReducer from "./userReducer";
import itemReducer from "./itemReducer";
import themeReducer from "./themeReducer";

export default combineReducers({
  user: userReducer,
  items: itemReducer,
  theme: themeReducer,
});
