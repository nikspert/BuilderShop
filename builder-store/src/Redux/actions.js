import {
  EDIT_ITEM,
  CREATE_ITEM,
  GET_ITEMS,
  DELETE_ITEM,
  AUTHORIZE,
  LOGOUT,
  REQUEST_FAILURE,
  REQUEST_STARTED,
  CHANGE_FORM_STATUS,
  CHANGE_SEARCH_REQUEST,
} from "./actionTypes";
import { requestHandler } from "../utils/helpers";

export const makeRequest = (request, action, params) => {
  return (dispatch) => {
    dispatch(requestStarted());
    requestHandler(request, () => {}, params)
      .then((result) => {
        dispatch(action({ data: result.data || result, id: params?.id }));
      })
      .catch((error) => {
        dispatch(requestFailure(error));
      });
  };
};

export const getItems = ({ data }) => ({
  type: GET_ITEMS,
  payload: {
    data,
  },
});
export const createItem = ({ data }) => ({
  type: CREATE_ITEM,
  payload: {
    ...data,
  },
});
export const editItem = ({ data, id }) => ({
  type: EDIT_ITEM,
  payload: {
    id,
    data,
  },
});
export const deleteItem = ({ id }) => ({
  type: DELETE_ITEM,
  payload: {
    id,
  },
});
export const authorize = ({ data }) => ({
  type: AUTHORIZE,
  payload: {
    ...data,
  },
});
export const logout = () => ({
  type: LOGOUT,
});
export const changeFormStatus = (status) => ({
  type: CHANGE_FORM_STATUS,
  payload: {
    status,
  },
});
export const changeSearchRequest = (request) => ({
  type: CHANGE_SEARCH_REQUEST,
  payload: {
    request,
  },
});
const requestStarted = () => ({
  type: REQUEST_STARTED,
});

const requestFailure = (error) => ({
  type: REQUEST_FAILURE,
  payload: {
    error,
  },
});
