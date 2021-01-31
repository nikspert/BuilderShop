import { AUTHORIZE, LOGOUT } from "../actionTypes";

const initialState = {
  user: null,
  loggedIn: false,
};

export default function authReducer(state = initialState, action) {
  console.log(action.type);
  switch (action.type) {
    case AUTHORIZE: {
      const user = action.payload;
      return {
        ...state,
        user: user,
        loggedIn: true,
        formState: "success"
      };
    }
    case LOGOUT: {
      return {
        ...state,
        user: null,
        loggedIn: false,
      };
    }
    default:
      return state;
  }
}
