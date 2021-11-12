// import requirements
import React from "react";

// error alert function
export default function ErrorAlert(props) {
  // return section to render
  return (
    <div className="error-log">
      {/* create button which displays error
          and clears error when clicked */}
      <button className="errorButton" onClick={props.clearError}>
        {props.errorMessage}
        <i className="error"></i>
      </button>
    </div>
  );
}
