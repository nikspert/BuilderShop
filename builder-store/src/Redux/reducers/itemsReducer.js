import {
  CHANGE_SEARCH_REQUEST,
  CHANGE_FORM_STATUS,
  CREATE_ITEM,
  DELETE_ITEM,
  EDIT_ITEM,
  GET_ITEMS,
  REQUEST_FAILURE,
  REQUEST_STARTED,
  AUTHORIZE,
  LOGOUT,
} from "../actionTypes";

const initialState = {
  items: [],
  searchRequest: "",
  formState: "pending",
};

export default function itemsReducer(state = initialState, action) {
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
    case CHANGE_SEARCH_REQUEST: {
      const { request } = action.payload;
      return {
        ...state,
        searchRequest: request,
      };
    }
    case GET_ITEMS: {
      const { data } = action.payload;
      return {
        ...state,
        items: data,
        formState: "success",
      };
    }
    case CREATE_ITEM: {
      const data = action.payload;
      return {
        ...state,
        items: [...state.items, data],
        formState: "success",
      };
    }
    case EDIT_ITEM: {
      const { data, id } = action.payload;
      return {
        ...state,
        items: state.items.map((item) => {
          if (item._id === id) return data;
          else return item;
        }),
        formState: "success",
      };
    }
    case DELETE_ITEM: {
      const { id } = action.payload;
      return {
        ...state,
        items: state.items.filter((item) => (item._id === id ? false : true)),
        formState: "success",
      };
    }
    case AUTHORIZE: {
      console.log(action.payload);
      const user = action.payload;
      return {
        ...state,
        user: user,
        loggedIn: true,
        formState: "success",
      };
    }
    case LOGOUT: {
      console.log({ ...state, ...initialState });
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
// import {
//   CHANGE_SEARCH_REQUEST,
//   CREATE_ITEM,
//   DELETE_ITEM,
//   EDIT_ITEM,
//   GET_ITEMS,
// } from "../actionTypes";

// const initialState = {
//   items: [],
//   searchRequest: "",
// };

// export default function itemsReducer(state = initialState, action) {
//   console.log(action.type);
//   switch (action.type) {
//     case CHANGE_SEARCH_REQUEST: {
//       const { request } = action.payload;
//       return {
//         ...state,
//         searchRequest: request,
//       };
//     }
//     case GET_ITEMS: {
//       const { data } = action.payload;
//       return {
//         ...state,
//         items: data,
//         formState: "success",
//       };
//     }
//     case CREATE_ITEM: {
//       const data = action.payload;
//       return {
//         ...state,
//         items: [...state.items, data],
//         formState: "success",
//       };
//     }
//     case EDIT_ITEM: {
//       const { data, id } = action.payload;
//       return {
//         ...state,
//         items: state.items.map((item) => {
//           if (item._id === id) return data;
//           else return item;
//         }),
//         formState: "success",
//       };
//     }
//     case DELETE_ITEM: {
//       const { id } = action.payload;
//       return {
//         ...state,
//         items: state.items.filter((item) => (item._id === id ? false : true)),
//         formState: "success",
//       };
//     }
//     default:
//       return state;
//   }
// }
