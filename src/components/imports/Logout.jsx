// import requirements
import React from "react";
import { Link } from "react-router-dom";

// logout function
export default function Logout(props) {
  return (
    <div>
      {/* Link user to homepage and call 
      logout function in parent component */}
      <Link to="/" onClick={props.onLogout} className="nav-link text-light">
        Logout
        <i className="fas fa-sign-out-alt"></i>
      </Link>
    </div>
  );
}
