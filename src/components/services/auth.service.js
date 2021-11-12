// import axios
import axios from "axios";

// base url variabl
const baseURL = "http://localhost:4000/api";

// register request
const register = (newUser) => {
  // post request to register endpoint
  // return response/error
  return axios
    .post(`${baseURL}/register`, newUser)
    .then((response) => {
      if (response) {
        return Promise.resolve(response);
      }
    })
    .catch((error) => {
      return Promise.reject(error.response);
    });
};

// read user request
const readUser = (newUserCredentials) => {
  // store token from local storage
  const token = localStorage.getItem("x-access-token");

  // create headers object
  const headers = {
    "Content-Type": "application/json",
    "x-access-token": token,
  };

  // post request to readUsers endpoint
  // return response/error
  return axios
    .post(`${baseURL}/readUsers`, newUserCredentials, {
      headers: headers,
    })
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

// update user request
const updateUser = (newUserCredentials) => {
  // store token from local storage
  const token = localStorage.getItem("x-access-token");

  // create headers object
  const headers = {
    "Content-Type": "application/json",
    "x-access-token": token,
  };

  // post request to updateUsers endpoint
  // return response/error
  return axios
    .post(`${baseURL}/updateUsers`, newUserCredentials, {
      headers: headers,
    })
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      return Promise.reject(error.response.data);
    });
};

// delete user request
const deleteUser = (newUserCredentials) => {
  // store token from local storage
  const token = localStorage.getItem("x-access-token");

  // create headers object
  const headers = {
    "Content-Type": "application/json",
    "x-access-token": token,
  };

  // post request to delete endpoint
  // return response/error
  return axios
    .post(`${baseURL}/delete`, newUserCredentials, {
      headers: headers,
    })
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

// login request
const login = async (userCredential) => {
  // post request to login endpoint
  // return response/error
  // store respective tokens in local storage
  return axios
    .post(`${baseURL}/login`, userCredential)
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("x-access-token", response.data.token);
      }
      if (response.data.role) {
        localStorage.setItem("role-token", response.data.role);
      }
      if (response.data.orgUnit) {
        localStorage.setItem("unit-token", response.data.orgUnit);
      }
      if (response.data.division) {
        localStorage.setItem("division-token", response.data.division);
      }
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      return Promise.reject(error.response.data);
    });
};

// logout service
const logout = () => {
  // remove items from local storage
  localStorage.removeItem("x-access-token");
  localStorage.removeItem("role-token");
  localStorage.removeItem("unit-token");
  localStorage.removeItem("division-token");
  return { message: "Logout Successful" };
};

// read credentials request
const readCredentials = (currentUserCredentials) => {
  // store token from local storage
  const token = localStorage.getItem("x-access-token");

  // create headers object
  const headers = {
    "Content-Type": "application/json",
    "x-access-token": token,
  };

  // post request to readCredentials endpoint
  // return response/error
  return axios
    .post(`${baseURL}/readCredentials`, currentUserCredentials, {
      headers: headers,
    })
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

// create credentials request
const createCredentials = (newCredential) => {
  // store token from local storage
  const token = localStorage.getItem("x-access-token");

  // create headers object
  const headers = {
    "Content-Type": "application/json",
    "x-access-token": token,
  };

  // post request to createCredentials endpoint
  // return response/error
  return axios
    .post(`${baseURL}/createCredentials`, newCredential, { headers: headers })
    .then((response) => {
      if (!response) {
        return Promise.resolve(response.data);
      }
    })
    .catch((error) => {
      return Promise.reject(error.response.data);
    });
};

// update credentials request
const updateCredentials = (newUserCredentials) => {
  // store token from local storage
  const token = localStorage.getItem("x-access-token");

  // create headers object
  const headers = {
    "Content-Type": "application/json",
    "x-access-token": token,
  };

  // post request to updateCredentials endpoint
  // return response/error
  return axios
    .post(`${baseURL}/updateCredentials`, newUserCredentials, {
      headers: headers,
    })
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      return Promise.reject(error.response.data);
    });
};

// delete credentials request
const deleteCredentials = (deleteUserCredentials) => {
  // store token from local storage
  const token = localStorage.getItem("x-access-token");

  // create headers object
  const headers = {
    "Content-Type": "application/json",
    "x-access-token": token,
  };

  // post request to deleteCredentials endpoint
  // return response/error
  return axios
    .post(`${baseURL}/deleteCredentials`, deleteUserCredentials, {
      headers: headers,
    })
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

// export functions
export {
  register,
  login,
  logout,
  readCredentials,
  createCredentials,
  updateCredentials,
  deleteCredentials,
  readUser,
  updateUser,
  deleteUser,
};
