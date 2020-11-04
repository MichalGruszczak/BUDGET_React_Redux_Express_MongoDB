import { THEME_DARK, THEME_LIGHT } from "../actionTypes";

const initialState = {
  theme: localStorage.getItem("theme"),
};

export default function (state = initialState, action) {
  switch (action.type) {
    case THEME_LIGHT:
      localStorage.setItem("theme", "light");
      return {
        ...state,
        theme: "light",
      };
    case THEME_DARK:
      localStorage.setItem("theme", "dark");
      return {
        ...state,
        theme: "dark",
      };
    default:
      return {
        state,
      };
  }
}
