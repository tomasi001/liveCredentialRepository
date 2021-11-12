// import requirements
import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerAction } from "../../container/actions";
import BaseLogin from "../imports/BaseLogin";
import RegisterForm from "../imports/RegisterForm";

// register function
export default function Register() {
  // create state and set state for respective variables
  const [userEmail, setUserEmail] = useState("");
  const [userUnit, setUserUnit] = useState("");
  const [userDivision, setUserDivision] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordCheck, setUserPasswordCheck] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // use dispatch and history hooks
  const dispatch = useDispatch();
  const history = useNavigate();

  // on form submit click event
  const handleSubmit = (event) => {
    event.preventDefault();

    // store new user information in object
    const newUser = {
      email: userEmail,
      orgUnit: userUnit,
      division: userDivision,
      password: userPassword,
      passwordCheck: userPasswordCheck,
    };

    // dispatch register user action and store in variable
    const validate = dispatch(registerAction(newUser));

    // if promise is successful push user to login page
    // else set error message
    validate
      .then(() => {
        history("/login");
      })
      .catch((error) => {
        setErrorMessage(error.data.error);
      });
  };

  // store credential data to be passed as prop
  let registerData = {
    handleSubmit,
    setUserEmail,
    setUserUnit,
    setUserDivision,
    setUserPassword,
    setUserPasswordCheck,
    errorMessage,
    setErrorMessage,
  };

  // return section to be rendered
  // pass respective props to components
  return (
    <div id="login">
      <div className="container">
        <div className="row login-box">
          <BaseLogin />
          <RegisterForm registerState={registerData} />
        </div>
      </div>
    </div>
  );
}
