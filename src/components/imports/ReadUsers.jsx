// import requirements
import { React, useState } from "react";
import UpdateUser from "./UpdateUser";
import { useDispatch } from "react-redux";
import { updateUserAction, deleteUserAction } from "../../container/actions";

// read users function
export default function ReadUsers(props) {
  // create state and set state for respective users
  const [userID, setUserID] = useState("");
  const [userUnit, setUserUnit] = useState("");
  const [userDivision, setUserDivision] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // instantiate tableRows variable
  let tableRows = <tr></tr>;

  // get credentials from props
  const users = props.users;

  // use dispatch hook
  const dispatch = useDispatch();

  // function to set state of respective users
  const setUser = (id, orgUnit, division, role, email, password) => {
    setUserID(id);
    setUserUnit(orgUnit);
    setUserDivision(division);
    setUserRole(role);
    setUserEmail(email);
    setUserPassword(password);
  };

  // function to delete user id
  const deleteUser = (id) => {
    // assign user id
    const deleteUserId = {
      user_id: id,
    };

    // dispatch delete user action and store in variable
    const deleteUser = dispatch(deleteUserAction(deleteUserId));

    // if promise is successful reload window
    // else set error message
    deleteUser
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // on form submit click event
  const handleSubmit = (event) => {
    event.preventDefault();

    // create new object with new user information
    const newUser = {
      user_id: userID,
      updateUser: {
        orgUnit: userUnit,
        division: userDivision,
        role: userRole,
        email: userEmail,
        password: userPassword,
      },
    };

    // dispatch update user action and store in variable
    const validate = dispatch(updateUserAction(newUser));

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

  // group all user data to be passed as prop
  let userData = {
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
  };

  // check if credentials exist
  if (users.length > 0) {
    // return respective table rows to render
    // include read, update and delete functionality
    tableRows = users.map((users, index) => {
      return (
        <tr key={index}>
          <td>{users.orgUnit}</td>
          <td>{users.division}</td>
          <td>{users.role}</td>
          <td>{users.email}</td>
          <td>
            {/* button to update users */}
            <button
              id="updateIcon"
              onClick={() =>
                setUser(
                  users._id,
                  users.orgUnit,
                  users.division,
                  users.role,
                  users.email,
                  users.password
                )
              }
            >
              <span>
                <i className="fas fa-pencil-alt"></i>
              </span>
            </button>
          </td>
          <td>
            {/* button to delete users */}
            <button id="trashIcon" onClick={() => deleteUser(users._id)}>
              <span>
                <i className="fa fa-trash"></i>
              </span>
            </button>
          </td>
        </tr>
      );
    });
  }

  // return respective table,
  // table head and table body
  return (
    <div>
      <div>
        <h3>READ USERS</h3>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>UNIT</th>
              <th>DIVISION</th>
              <th>ROLE</th>
              <th>EMAIL</th>
              <th>UPDATE</th>
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
      {/* if userUnit is not equal to an empty string 
            display update users component and
            pass the user data*/}
      {userUnit !== "" ? <UpdateUser currentUser={userData} /> : <></>}
    </div>
  );
}
