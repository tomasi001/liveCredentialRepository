// import requirements
import { React, useState } from "react";
import UpdateCredentials from "./UpdateCredentials";
import { useDispatch } from "react-redux";
import {
  updateCredentialAction,
  deleteCredentialAction,
} from "../../container/actions";

// read credentials function
export default function ReadCredentials(props) {
  // create state and set state for respective credentials
  const [credID, setCredID] = useState("");
  const [credUnit, setCredUnit] = useState("");
  const [credDivision, setCredDivision] = useState("");
  const [credEmail, setCredEmail] = useState("");
  const [credPassword, setCredPassword] = useState("");
  const [credWebsite, setCredWebsite] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // use dispatch hook
  const dispatch = useDispatch();

  // instantiate tableRows variable
  let tableRows = <tr></tr>;

  // get credentials from props
  const credentials = props.credentials;

  // get role token from local storage
  const roleToken = localStorage.getItem("role-token");

  // function to set state of respective credentials
  const setCredentials = (id, orgUnit, division, email, password, website) => {
    setCredID(id);
    setCredUnit(orgUnit);
    setCredDivision(division);
    setCredEmail(email);
    setCredPassword(password);
    setCredWebsite(website);
  };

  // on form submit click event
  const handleSubmit = (event) => {
    event.preventDefault();

    // create new object with new credential information
    const newCred = {
      user_id: credID,
      updateCredentials: {
        orgUnit: credUnit,
        division: credDivision,
        email: credEmail,
        password: credPassword,
        website: credWebsite,
      },
    };

    // dispatch update credential action and store in variable
    const validate = dispatch(updateCredentialAction(newCred));

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

  // group all credential data to be passed as prop
  let credentialData = {
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
  };

  // function to delete credential
  const deleteCredentials = (id) => {
    // assign cred id
    const deleteCredId = {
      user_id: id,
    };

    // dispatch delete credential action and store in variable
    const deleteCred = dispatch(deleteCredentialAction(deleteCredId));

    // if promise is successful reload window
    // else set error message
    deleteCred
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // check if credentials exist
  if (credentials.length > 0) {
    // check role token
    // if role token is Admin
    // return respective table rows to render
    // include read, update and delete functionality
    if (roleToken === "Admin") {
      // map information from credentials to respective table rows
      tableRows = credentials.map((credentials, index) => {
        return (
          <tr key={index} id={credentials._id}>
            <td>{credentials.email}</td>
            <td>{credentials.password}</td>
            <td>{credentials.website}</td>
            <td>
              {/* button to update credentials */}
              <button
                id="updateIcon"
                onClick={() =>
                  setCredentials(
                    credentials._id,
                    credentials.orgUnit,
                    credentials.division,
                    credentials.email,
                    credentials.password,
                    credentials.website
                  )
                }
              >
                <span>
                  <i className="fas fa-pencil-alt"></i>
                </span>
              </button>
            </td>
            <td>
              {/* button to delete credentials */}
              <button
                id="trashIcon"
                onClick={() => deleteCredentials(credentials._id)}
              >
                <span>
                  <i className="fa fa-trash"></i>
                </span>
              </button>
            </td>
          </tr>
        );
      });
    }
    // if role token is Manager
    // return respective table rows to render
    // include read and update functionality
    else if (roleToken === "Manager") {
      // map information from credentials to respective table rows
      tableRows = credentials.map((credentials, index) => {
        return (
          <tr key={index} id={credentials._id}>
            <td>{credentials.email}</td>
            <td>{credentials.password}</td>
            <td>{credentials.website}</td>
            <td>
              {/* button to update credentials */}
              <button
                id="updateIcon"
                onClick={() =>
                  setCredentials(
                    credentials._id,
                    credentials.orgUnit,
                    credentials.division,
                    credentials.email,
                    credentials.password,
                    credentials.website
                  )
                }
              >
                <span>
                  <i id={credentials._id} className="fas fa-pencil-alt"></i>
                </span>
              </button>
            </td>
          </tr>
        );
      });
    }
    // if role token is Normal
    // return respective table rows to render
    // include read functionality
    else {
      // map information from credentials to respective table rows
      tableRows = credentials.map((credentials, index) => {
        return (
          <tr key={index} id={credentials._id}>
            <td>{credentials.email}</td>
            <td>{credentials.password}</td>
            <td>{credentials.website}</td>
          </tr>
        );
      });
    }
  }

  // if role token is admin return respective table,
  // table head and table body
  if (roleToken === "Admin") {
    return (
      <div>
        <div>
          <hr />
          <h3>READ CREDENTIALS</h3>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th>EMAIL</th>
                <th>PASSWORD</th>
                <th>SITE</th>
                <th>UPDATE</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>{tableRows}</tbody>
          </table>
        </div>
        {/* if credUnit is not equal to an empty string 
            display update credentials component and
            pass the credential data*/}
        {credUnit !== "" ? (
          <UpdateCredentials currentCredentials={credentialData} />
        ) : (
          <></>
        )}
      </div>
    );
  }
  // if role token is Manager return respective table,
  // table head and table body
  else if (roleToken === "Manager") {
    return (
      <div>
        <div>
          <h3>READ CREDENTIALS</h3>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th>EMAIL</th>
                <th>PASSWORD</th>
                <th>SITE</th>
                <th>UPDATE</th>
              </tr>
            </thead>
            <tbody>{tableRows}</tbody>
          </table>
        </div>
        {/* if credUnit is not equal to an empty string 
            display update credentials component and
            pass the credential data*/}
        {credUnit !== "" ? (
          <UpdateCredentials currentCredentials={credentialData} />
        ) : (
          <></>
        )}
      </div>
    );
  }
  // if role token is Manager return respective table,
  // table head and table body
  else {
    return (
      <div>
        <h3>READ CREDENTIALS</h3>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>EMAIL</th>
              <th>PASSWORD</th>
              <th>SITE</th>
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    );
  }
}
