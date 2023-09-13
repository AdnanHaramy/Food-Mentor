import { createStore } from "redux";

// Define initial state
const initialState = {
   isUserSignedUp: false,
   isUserSignedIn: false,
   isUserLoggedOut: false,
};
// Define reducer
const reducer = (state = initialState, action) => {
   switch (action.type) {
      case "SIGN_UP_SUCCESS":
         return {
            ...state,
            isUserSignedUp: true,
         };
      case "SIGN_UP_FAILURE":
         return {
            ...state,
            isUserSignedUp: false,
         };
      case "SIGN_IN_SUCCESS":
         return {
            ...state,
            isUserSignedIn: true,
         };
      case "SIGN_IN_FAILURE":
         return {
            ...state,
            isUserSignedIn: false,
         };
      case "LOG_OUT_SUCCESS":
         return {
            ...state,
            isUserLoggedOut: true,
         };
      case "LOG_OUT_FAILURE":
         return {
            ...state,
            isUserLoggedOut: false,
         };

      default:
         return state;
   }
};

// Create and export the Redux store
const store = createStore(reducer);

export default store;
