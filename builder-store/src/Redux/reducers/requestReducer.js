import {
    CHANGE_FORM_STATUS,
    REQUEST_FAILURE,
    REQUEST_STARTED,
  } from "../actionTypes";
  
  const initialState = {
    formState: "pending",
    error:null
    };
  
  export default function itemsReducer(state = initialState, action) {
    console.log(action.type);
    switch (action.type) {
      case REQUEST_STARTED: {
        return {
          ...state,
          formState: "loading",
        };
      }
      case REQUEST_FAILURE: {
        return {
          ...state,
          formState: "error",
          error: action.payload,
        };
      }
      case CHANGE_FORM_STATUS: {
        const { status } = action.payload;
        return {
          ...state,
          formState: status,
        };
      }
      default:
        return state;
    }
  }
  