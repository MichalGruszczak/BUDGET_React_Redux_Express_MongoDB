import { LANG_PL, LANG_ENG } from "../actionTypes";

const initialState = {
  language: "polish",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LANG_ENG:
      return {
        ...state,
        language: "english",
      };
    case LANG_PL:
      return {
        ...state,
        language: "polish",
      };
    default:
      return {
        state,
      };
  }
}
