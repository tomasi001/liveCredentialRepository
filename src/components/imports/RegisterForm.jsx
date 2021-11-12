// import requirements
import React from "react";
import ErrorAlert from "./ErrorAlert";

// register form function
export default function RegisterForm(props) {
  // destructure variables from props
  let {
    handleSubmit,
    setUserEmail,
    setUserUnit,
    setUserDivision,
    setUserPassword,
    setUserPasswordCheck,
    errorMessage,
    setErrorMessage,
  } = props.registerState;

  // return section to render
  return (
    <div className="col-sm-7 bg-color align-self-center">
      <div className="form-section">
        <div className="title">
          <h3>Create New Cool Tech User</h3>
        </div>
        <div className="login-inner-form">
          {/* create register form
              with various inputs that
              set state of variables
              in parent component and
              calls handle submit function
              in parent component */}
          <form method="POST" onSubmit={handleSubmit}>
            <div className="form-group form-box">
              <input
                type="text"
                id="email"
                onChange={(e) => {
                  setUserEmail(e.target.value);
                }}
                className="input-text"
                placeholder="Email"
              />
              <i className="icon email"> </i>
            </div>

            <div className="form-group form-box">
              <input
                type="text"
                id="unit"
                onChange={(e) => {
                  setUserUnit(e.target.value);
                }}
                className="input-text"
                placeholder="Organisational Unit"
              />
              <i className="icon unit"> </i>
            </div>

            <div className="form-group form-box">
              <input
                type="text"
                id="division"
                onChange={(e) => {
                  setUserDivision(e.target.value);
                }}
                className="input-text"
                placeholder="Division"
              />
              <i className="icon division"> </i>
            </div>

            <div className="form-group form-box">
              <input
                type="text"
                id="password"
                onChange={(e) => {
                  setUserPassword(e.target.value);
                }}
                className="input-text"
                placeholder="Password"
              />
              <i className="icon lock "> </i>
            </div>

            <div className="form-group form-box">
              <input
                type="text"
                id="passwordCheck"
                onChange={(e) => {
                  setUserPasswordCheck(e.target.value);
                }}
                className="input-text"
                placeholder="Verify Password"
              />
              <i className="icon lock "> </i>
            </div>

            {/* display error message if it exists 
            and clears the message if clicked on */}
            {errorMessage && (
              <ErrorAlert
                errorMessage={errorMessage}
                clearError={() => setErrorMessage(undefined)}
              />
            )}

            <div className="form-group">
              <button className="btn primary-btn">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
