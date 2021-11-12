// import requirements
import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

// base login function
export default function BaseLogin() {
  // use history and location hooks
  const location = useLocation();
  const history = useNavigate();

  // create classname variables
  let defaultClass = "nav-link link-btn btn-primary default-bg";
  let active = " active";

  // create register and login functions
  // to push user to respective url
  const register = () => history("/register");
  const login = () => history("/login");

  // return section to render
  return (
    <div className="col-sm-5 bg-img align-self-center">
      <div className="info">
        <div className="logo clearfix">
          <Link className="nav-brand" to="/">
            COOL TECH
          </Link>
        </div>
        <div className="btn-section clearfix">
          {/* button to navigate to login page */}
          <button
            onClick={login}
            className={
              location.pathname === "/login"
                ? defaultClass + active
                : defaultClass
            }
          >
            Login
          </button>
          {/* button to navigate to register page */}
          <button
            onClick={register}
            className={
              location.pathname === "/register"
                ? defaultClass + active
                : defaultClass
            }
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
