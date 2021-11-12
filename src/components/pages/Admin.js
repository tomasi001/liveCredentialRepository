// NOTE I AM AWARE OF MISSING DEPENDENCIES IN USEEFFECT FUNCTION
// I USED THIS ON PURPOSE TO MAKE SURE THE EFFECT ONLY FIRES
// ONCE WHEN THE COMPONENT IS MOUNTED AND NOT ON EVERY RE RENDER

// import requirements
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CreateCredentials from "../imports/CreateCredentials";
import Header from "../imports/Header";
import ReadCredentials from "../imports/ReadCredentials";
import ReadUsers from "../imports/ReadUsers";
import { useDispatch } from "react-redux";
import {
  createCredentialAction,
  readCredentialAction,
  readUserAction,
} from "../../container/actions";

// admin function
export default function Admin() {
  // create state and set state for respective variables
  const [orgUnit, setOrgUnit] = useState("");
  const [division, setDivision] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [website, setWebsite] = useState("");
  const [credentials, setCredentials] = useState("");
  const [users, setUsers] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // get unit and division tokens from local storage
  const unitToken = localStorage.getItem("unit-token");
  const divisionToken = localStorage.getItem("division-token");

  // store current user Credentials in object
  const currentUserCredentials = {
    orgUnit: unitToken,
    division: divisionToken,
  };

  // use dispatch and history hooks
  const dispatch = useDispatch();
  const history = useNavigate();

  // handle submit function
  const handleCredSubmit = (event) => {
    event.preventDefault();

    // object storing new credentials
    const newCredential = {
      orgUnit,
      division,
      email,
      password,
      website,
    };

    // dispatch create credential action and store in variable
    const validate = dispatch(createCredentialAction(newCredential));

    // if promise is successful reload window
    // else set error message
    validate
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        setErrorMessage(error.error);
      });
  };

  // store credential data to be passed as prop
  let credentialData = {
    handleCredSubmit,
    setOrgUnit,
    setDivision,
    setEmail,
    setPassword,
    setWebsite,
    errorMessage,
    setErrorMessage,
  };

  // instantiate roleToken
  let roleToken = "";

  // route function
  const route = () => {
    // get token and role token from local storage
    const token = localStorage.getItem("x-access-token");
    roleToken = localStorage.getItem("role-token");

    // return true if both present and false if not
    return token && roleToken ? true : false;
  };

  // use effect function
  useEffect(() => {
    // dispatch read credential action and store in variable
    const credAction = dispatch(readCredentialAction(currentUserCredentials));

    // if promise is successful reload window
    // else set error message
    credAction
      .then((response) => {
        setCredentials(response);
      })
      .catch((error) => {
        console.log(error);
      });

    // dispatch read user action and store in variable
    const userAction = dispatch(readUserAction(currentUserCredentials));

    // if promise is successful set credentials
    // else set error message
    userAction
      .then((response) => {
        setUsers(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // use effect function
  useEffect(() => {
    // check if route function return true or false
    // check respective state of role token
    // if any are true push user to login page
    if (!route() || roleToken === "Manager" || roleToken === "Normal") {
      history("/login");
    }
  });

  // return section to render
  // pass respective props to components
  return (
    <div>
      <Header header="ADMIN PAGE" />
      <div className="container">
        <ReadCredentials credentials={credentials} />
        <CreateCredentials credentialState={credentialData} />
        <ReadUsers users={users} />
      </div>
    </div>
  );
}
