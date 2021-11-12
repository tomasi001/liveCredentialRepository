// import requirements
import React from "react";
import ErrorAlert from "./ErrorAlert";

// login form function
export default function LoginForm(props) {
  // destructure variables from props
  let {
    handleSubmit,
    setUserEmail,
    setUserPassword,
    errorMessage,
    setErrorMessage,
  } = props.loginState;

  // return section to render
  return (
    <div className="col-sm-7 bg-color align-self-center">
      <div className="form-section">
        <div className="title">
          <h3>Sign In To Your Account</h3>
        </div>
        <div className="login-inner-form">
          {/* create login form
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
                onChange={(e) => setUserEmail(e.target.value)}
                className="input-text"
                placeholder="Email Address"
              />
              <i className="icon email"> </i>
            </div>

            <div className="form-group form-box">
              <input
                type="text"
                id="password"
                onChange={(e) => setUserPassword(e.target.value)}
                className="input-text"
                placeholder="Password"
              />
              <i className="icon lock"> </i>
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
              <button className="btn primary-btn">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
