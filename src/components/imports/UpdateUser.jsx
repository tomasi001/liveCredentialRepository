// import requirements
import React from "react";
import ErrorAlert from "./ErrorAlert";

// update user function
export default function UpdateUser(props) {
  // destructure variables from props
  let {
    handleSubmit,
    setUserUnit,
    setUserDivision,
    setUserRole,
    setUserEmail,
    userUnit,
    userDivision,
    userRole,
    userEmail,
    errorMessage,
    setErrorMessage,
  } = props.currentUser;

  // return section to render
  return (
    <div>
      <h3>UPDATE CREDENTIALS</h3>
      {/* create update form
          with various inputs that
          set state of variables
          in parent component and
          calls handle submit function
          in parent component */}
      <form method="POST" onSubmit={handleSubmit}>
        <div className="form-group form-box">
          <input
            type="text"
            id="unit"
            value={userUnit}
            onChange={(e) => {
              setUserUnit(e.target.value);
            }}
            className="input-text"
          />
        </div>

        <div className="form-group form-box">
          <input
            type="text"
            id="division"
            value={userDivision}
            onChange={(e) => {
              setUserDivision(e.target.value);
            }}
            className="input-text"
          />
        </div>

        <div className="form-group form-box">
          <input
            type="text"
            id="role"
            value={userRole}
            onChange={(e) => {
              setUserRole(e.target.value);
            }}
            className="input-text"
          />
        </div>

        <div className="form-group form-box">
          <input
            type="text"
            id="email"
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
            className="input-text"
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
          <button id="updateButton" className="btn primary-btn">
            UPDATE
          </button>
        </div>
      </form>
    </div>
  );
}
