// import actionTypes
import * as actionType from "./types";

// create initial state object
const initialState = { isLoggedIn: false, user: null, credentials: null };

// create reducer
export default function rootReducer(state = initialState, action) {
  // destructure action object
  const { type, payload } = action;

  // create switch to call respective actionTypes
  // return respective state
  switch (type) {
    case actionType.REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case actionType.REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case actionType.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload,
      };
    case actionType.LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case actionType.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case actionType.READ_CREDENTIAL_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        credentials: payload,
      };
    case actionType.READ_CREDENTIAL_FAIL:
      return {
        ...state,
        isLoggedIn: true,
        credentials: payload,
      };
    case actionType.CREATE_CREDENTIAL_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        credentials: payload,
      };
    case actionType.CREATE_CREDENTIAL_FAIL:
      return {
        ...state,
        isLoggedIn: true,
        credentials: payload,
      };
    case actionType.UPDATE_CREDENTIAL_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        credentials: payload,
      };
    case actionType.UPDATE_CREDENTIAL_FAIL:
      return {
        ...state,
        isLoggedIn: true,
        credentials: payload,
      };
    case actionType.DELETE_CREDENTIAL_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        credentials: payload,
      };
    case actionType.DELETE_CREDENTIAL_FAIL:
      return {
        ...state,
        isLoggedIn: true,
        credentials: payload,
      };
    case actionType.UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        credentials: payload,
      };
    case actionType.UPDATE_USER_FAIL:
      return {
        ...state,
        isLoggedIn: true,
        credentials: payload,
      };
    case actionType.READ_USER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        credentials: payload,
      };
    case actionType.READ_USER_FAIL:
      return {
        ...state,
        isLoggedIn: true,
        credentials: payload,
      };
    case actionType.DELETE_USER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        credentials: payload,
      };
    case actionType.DELETE_USER_FAIL:
      return {
        ...state,
        isLoggedIn: true,
        credentials: payload,
      };
    // create default state
    default:
      return state;
  }
}
