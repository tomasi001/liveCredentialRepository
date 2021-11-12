// import requirements
import { React, useState } from "react";
import BaseLogin from "../imports/BaseLogin";
import LoginForm from "../imports/LoginForm";
import { useDispatch } from "react-redux";
import { loginAction } from "../../container/actions";
import { useNavigate } from "react-router-dom";

// login function
export default function Login() {
  // create state and set state for respective variables
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // use dispatch and history hooks
  const dispatch = useDispatch();
  const history = useNavigate();

  // on form submit click event
  const handleSubmit = (event) => {
    event.preventDefault();

    // store user credentials in object
    const userCredential = {
      email: userEmail,
      password: userPassword,
    };

    // dispatch login action and store in variable
    const login = dispatch(loginAction(userCredential));

    // if promise is successful push user to home page
    // else set error message
    login
      .then(() => {
        history("/");
      })
      .catch((error) => {
        setErrorMessage(error.error);
      });
  };

  // return section to render
  // pass respective props to components
  return (
    <div id="login">
      <div className="container">
        <div className="row login-box">
          <BaseLogin />
          <LoginForm
            loginState={{
              handleSubmit,
              setUserEmail,
              setUserPassword,
              errorMessage,
              setErrorMessage,
            }}
          />
        </div>
      </div>
    </div>
  );
}
