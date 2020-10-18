import { USER_LOGIN, USER_LOGOUT } from "../actionTypes";

const initialState = {
  isAuthenticated: localStorage.getItem("isAuthenticated"),
  token: localStorage.getItem("token"),
  email: localStorage.getItem("email"),
  name: localStorage.getItem("userName"),
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userName", action.payload.user.name);
      localStorage.setItem("email", action.payload.user.email);
      localStorage.setItem("isAuthenticated", true);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        email: action.payload.user.email,
        name: action.payload.user.name,
      };

    case USER_LOGOUT:
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      localStorage.removeItem("email");
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        email: null,
        name: null,
      };

    default: {
      return state;
    }
  }
}
