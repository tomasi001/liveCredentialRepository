// import requirements
import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import { logoutAction } from "../../container/actions";
import { useDispatch } from "react-redux";

// header function
export default function Header(props) {
  const dispatch = useDispatch();

  // function to dispatch logout action
  const logout = () => {
    dispatch(logoutAction());
  };

  // return section to render
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light primary-gradient shadow">
        {/* header which links user to home page */}
        <Link className="nav-link brand me-auto" to="/">
          <h5 className="text-light  m-0">{props.header}</h5>
        </Link>
        <div>
          <div className="me-auto"></div>
          {/* logout component to trigger logout function */}
          <Logout onLogout={logout} />
        </div>
      </nav>
    </header>
  );
}
