// import requirements
import * as actionType from "./types";
import * as AuthService from "../components/services/auth.service";

// register action
export const registerAction = (payload) => (dispatch) => {
  // call register service
  // return response/error
  // dispatch respective action
  // return response/error
  return AuthService.register(payload)
    .then((response) => {
      dispatch({
        type: actionType.REGISTER_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve(response.data);
    })
    .catch((error) => {
      dispatch({
        type: actionType.REGISTER_FAIL,
        payload: { error: error.message || "Registration Failed" },
      });

      return Promise.reject(error);
    });
};

// create credential action
export const readUserAction = (newCredentials) => (dispatch) => {
  // call readUser service
  // return response/error
  // dispatch respective action
  // return response/error
  return AuthService.readUser(newCredentials)
    .then((response) => {
      dispatch({
        type: actionType.READ_USER_SUCCESS,
        payload: response,
      });
      return Promise.resolve(response);
    })
    .catch((error) => {
      dispatch({
        type: actionType.READ_USER_FAIL,
        payload: { error: error.message || "UPDATE CREDENTIALS FAILED" },
      });

      return Promise.reject(error);
    });
};

// create credential action
export const updateUserAction = (newCredentials) => (dispatch) => {
  // call updateUser service
  // return response/error
  // dispatch respective action
  // return response/error
  return AuthService.updateUser(newCredentials)
    .then((response) => {
      dispatch({
        type: actionType.UPDATE_USER_SUCCESS,
        payload: response,
      });
      return Promise.resolve(response);
    })
    .catch((error) => {
      dispatch({
        type: actionType.UPDATE_USER_FAIL,
        payload: { error: error.message || "UPDATE CREDENTIALS FAILED" },
      });

      return Promise.reject(error);
    });
};

// create credential action
export const deleteUserAction = (newCredentials) => (dispatch) => {
  // call deleteUser service
  // return response/error
  // dispatch respective action
  // return response/error
  return AuthService.deleteUser(newCredentials)
    .then((response) => {
      dispatch({
        type: actionType.DELETE_USER_SUCCESS,
        payload: response,
      });
      return Promise.resolve(response);
    })
    .catch((error) => {
      dispatch({
        type: actionType.DELETE_USER_FAIL,
        payload: { error: error.message || "UPDATE CREDENTIALS FAILED" },
      });

      return Promise.reject(error);
    });
};

// login action
export const loginAction = (userCredentials) => (dispatch) => {
  // call login service
  // return response/error
  // dispatch respective action
  // return response/error
  return AuthService.login(userCredentials)
    .then((data) => {
      dispatch({
        type: actionType.LOGIN_SUCCESS,

        payload: data,
      });
      // console.log(data);
      return Promise.resolve(data);
    })
    .catch((error) => {
      dispatch({
        type: actionType.LOGIN_FAIL,
        payload: { error: error.message || "Login Failed" },
      });

      return Promise.reject(error);
    });
};

// logout
export const logoutAction = () => (dispatch) => {
  // call logout service
  // dispatch respective action
  // return response/error

  const message = AuthService.logout();

  dispatch({
    type: actionType.LOGOUT,
    payload: { message },
  });

  return Promise.resolve(message);
};

// create credential action
export const createCredentialAction = (newCredentials) => (dispatch) => {
  // call createCredentials service
  // return response/error
  // dispatch respective action
  // return response/error
  return AuthService.createCredentials(newCredentials)
    .then((response) => {
      dispatch({
        type: actionType.CREATE_CREDENTIAL_SUCCESS,
        payload: response,
      });
      return Promise.resolve(response);
    })
    .catch((error) => {
      dispatch({
        type: actionType.CREATE_CREDENTIAL_FAIL,
        payload: { error: error.message || "READ CREDENTIALS FAILED" },
      });

      return Promise.reject(error);
    });
};

export const readCredentialAction = (currentUserCredentials) => (dispatch) => {
  // call readCredentialss service
  // return response/error
  // dispatch respective action
  // return response/error
  return AuthService.readCredentials(currentUserCredentials)
    .then((response) => {
      dispatch({
        type: actionType.READ_CREDENTIAL_SUCCESS,
        payload: response,
      });
      return Promise.resolve(response);
    })
    .catch((error) => {
      dispatch({
        type: actionType.READ_CREDENTIAL_FAIL,
        payload: { error: error.message || "READ CREDENTIALS FAILED" },
      });

      return Promise.reject(error);
    });
};

// create credential action
export const updateCredentialAction = (newCredentials) => (dispatch) => {
  // call updateCredentials service
  // return response/error
  // dispatch respective action
  // return response/error
  return AuthService.updateCredentials(newCredentials)
    .then((response) => {
      dispatch({
        type: actionType.UPDATE_CREDENTIAL_SUCCESS,
        payload: response,
      });
      return Promise.resolve(response);
    })
    .catch((error) => {
      dispatch({
        type: actionType.UPDATE_CREDENTIAL_FAIL,
        payload: { error: error.message || "UPDATE CREDENTIALS FAILED" },
      });

      return Promise.reject(error);
    });
};

// create credential action
export const deleteCredentialAction = (newCredentials) => (dispatch) => {
  // call deleteCredentials service
  // return response/error
  // dispatch respective action
  // return response/error
  return AuthService.deleteCredentials(newCredentials)
    .then((response) => {
      dispatch({
        type: actionType.DELETE_CREDENTIAL_SUCCESS,
        payload: response,
      });
      return Promise.resolve(response);
    })
    .catch((error) => {
      dispatch({
        type: actionType.DELETE_CREDENTIAL_FAIL,
        payload: { error: error.message || "DELETE CREDENTIALS FAILED" },
      });

      return Promise.reject(error);
    });
};
