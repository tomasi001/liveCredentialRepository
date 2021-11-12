// import requirements
import React from "react";
import ErrorAlert from "./ErrorAlert";

// update credentials function
export default function UpdateCredentials(props) {
  // destructure variables from props
  let {
    handleSubmit,
    setCredUnit,
    setCredDivision,
    setCredEmail,
    setCredPassword,
    setCredWebsite,
    credUnit,
    credDivision,
    credEmail,
    credPassword,
    credWebsite,
    errorMessage,
    setErrorMessage,
  } = props.currentCredentials;

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
            value={credUnit}
            onChange={(e) => {
              setCredUnit(e.target.value);
            }}
            className="input-text"
          />
        </div>

        <div className="form-group form-box">
          <input
            type="text"
            id="division"
            value={credDivision}
            onChange={(e) => {
              setCredDivision(e.target.value);
            }}
            className="input-text"
          />
        </div>

        <div className="form-group form-box">
          <input
            type="text"
            id="email"
            value={credEmail}
            onChange={(e) => {
              setCredEmail(e.target.value);
            }}
            className="input-text"
          />
        </div>

        <div className="form-group form-box">
          <input
            type="text"
            id="password"
            value={credPassword}
            onChange={(e) => {
              setCredPassword(e.target.value);
            }}
            className="input-text"
          />
        </div>

        <div className="form-group form-box">
          <input
            type="text"
            id="website"
            value={credWebsite}
            onChange={(e) => {
              setCredWebsite(e.target.value);
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
