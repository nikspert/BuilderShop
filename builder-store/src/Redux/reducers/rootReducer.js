import { combineReducers } from "redux";

import items from "./itemsReducer";
import auth from "./authReducer";
import req from "./requestReducer";

//export default combineReducers({ req, items, auth });
export default items;
