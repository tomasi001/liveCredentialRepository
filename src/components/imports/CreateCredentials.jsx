// import requirements
import React from "react";
import ErrorAlert from "./ErrorAlert";

// create credentials function
export default function CreateCredentials(props) {
  // destructure variables from props
  let {
    handleCredSubmit,
    setOrgUnit,
    setDivision,
    setEmail,
    setPassword,
    setWebsite,
    errorMessage,
    setErrorMessage,
  } = props.credentialState;

  // return section to render
  return (
    <div className="bg-color align-self-center">
      <div className="form-section">
        <div className="title">
          <h3>ADD CREDENTIALS</h3>
        </div>
        <div className="login-inner-form">
          {/* create credentials form
              with various inputs that
              set state of variables
              in parent component and
              calls handle submit function
              in parent component */}
          <form method="POST" onSubmit={handleCredSubmit}>
            <div className="form-group form-box">
              <input
                type="text"
                id="unit"
                onChange={(e) => {
                  setOrgUnit(e.target.value);
                }}
                className="input-text"
                placeholder="Organisational Unit"
              />
            </div>

            <div className="form-group form-box">
              <input
                type="text"
                id="division"
                onChange={(e) => {
                  setDivision(e.target.value);
                }}
                className="input-text"
                placeholder="Division"
              />
            </div>

            <div className="form-group form-box">
              <input
                type="text"
                id="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="input-text"
                placeholder="Email"
              />
            </div>

            <div className="form-group form-box">
              <input
                type="text"
                id="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="input-text"
                placeholder="Password"
              />
            </div>

            <div className="form-group form-box">
              <input
                type="text"
                id="website"
                onChange={(e) => {
                  setWebsite(e.target.value);
                }}
                className="input-text"
                placeholder="Website/Program"
              />
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
              <button id="addButton" className="btn primary-btn">
                ADD
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
