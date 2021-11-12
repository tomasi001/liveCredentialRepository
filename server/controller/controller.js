// import requirements
const bcrypt = require("bcrypt");
const User = require("../model/userModel");
const Credentials = require("../model/credentialModel");
const jwt = require("jsonwebtoken");

// array of Organisational units
let orgUnitArray = [
  "News Management",
  "Software Reviews",
  "Hardware Reviews",
  "Opinion Publishing",
];

// array of divisions
let divisionArray = [
  "Finance",
  "IT",
  "Software Dev",
  "Marketing",
  "Writing",
  "Product Dev",
  "Backend Dev",
  "Frontend Dev",
  "Public Relations",
  "Data Analysis",
];

// validate registration data
const validateRegistration = (req, res) => {
  // ensure body is not empty
  if (!req.body) {
    res
      .status(406)
      .json({ error: "You have to Fill in the Registration Form" });
    return;
  }

  // destructure data from body object into variables
  let { email, orgUnit, division, password, passwordCheck } = req.body;

  // check if variables are null
  if (!email || !orgUnit || !division || !password || !passwordCheck) {
    res.status(406).json({ error: "Not all fields have been filled in" });
    return;
  }

  // check if email includes @ sign
  if (!email.includes("@")) {
    res.status(406).json({ error: "Invalid Email Entered" });
    return;
  }

  // check if organisational Unit (orgUnit) is present in orgUnitArray
  if (!orgUnitArray.includes(orgUnit)) {
    res.status(406).json({ error: "Invalid Organisational Unit" });
    return;
  }

  // check if division is present in divisionArray
  if (!divisionArray.includes(division)) {
    res.status(406).json({ error: "Invalid Division" });
    return;
  }

  // check password length
  if (password.length < 8) {
    res
      .status(406)
      .json({ error: "Password must contain at least 8 characters" });
    return;
  }

  // check if passwords match
  if (password !== passwordCheck) {
    res
      .status(406)
      .json({ error: "Password must be identical in both fields" });
    return;
  }

  // return req.body if all checks have been passed
  return req.body;
};

// validate login data
const validateLogin = (req, res) => {
  // ensure body is not empty
  if (!req.body) {
    return res
      .status(406)
      .json({ error: "You have to Fill in the Login Form" });
  }

  // destructure data from body object into variables
  let { email, password } = req.body;

  // check if variables are null
  if (!email || !password) {
    return res
      .status(406)
      .json({ error: "Not all fields have been filled in" });
  }

  // check if email includes @ sign
  if (!email.includes("@")) {
    return res.status(406).json({ error: "Invalid Email Entered" });
  }

  // check password length
  if (password.length < 8) {
    return res
      .status(406)
      .json({ error: "Password must contain at least 8 characters" });
  }

  // return req.body if all checks have been passed
  return req.body;
};

// function to create new user
const newDbUser = (req, res, orgUnit, division, email, hash) => {
  // create object storing new user info
  const newUser = new User({
    orgUnit,
    division,
    role: "Normal",
    email,
    password: hash,
  });

  // use model to create new user
  newUser
    .save(newUser)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.status(406).json({
        error:
          error.message || "Error occurred while trying to add new user to DB",
      });
    });
};

// register controller
exports.registerUser = async (req, res) => {
  try {
    // destructure req.body once validated
    let { email, orgUnit, division, password } = validateRegistration(req, res);

    // hashing password
    const hash = await bcrypt.hashSync(password, 10);

    // call new db user function
    newDbUser(req, res, orgUnit, division, email, hash);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "Error During Registration" });
  }
};

// login controller
exports.login = async (req, res) => {
  try {
    // get user data
    const { email, password } = validateLogin(req, res);

    // use model to find a user by email
    const user = await User.findOne({ email });

    // check if user is null
    if (!user) {
      return res.status(406).json({ error: "No Account Linked to This Email" });
    }

    // check if hashing of passwords is identical
    const isMatch = await bcrypt.compare(password, user.password);

    // if not identical return error
    if (!isMatch) {
      return res.status(406).json({ error: "Invalid Credentials" });
    }

    // create jwt token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // send response with fetched user details
    res.json({
      token,
      email: user.email,
      orgUnit: user.orgUnit,
      division: user.division,
      role: user.role,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "Error occurred during login" });
  }
};

// read users controller
exports.readUsers = async (req, res) => {
  // destructure variables
  const { orgUnit, division } = req.body;
  try {
    // use model to find all users according to unit and division
    const users = await User.find({
      orgUnit: orgUnit,
    }).find({
      division: division,
    });

    // check if users is null
    if (!users) {
      return res
        .status(406)
        .json({ error: "No Credentials for These Units/Divisions" });
    }

    // send response with users
    res.json(users);
  } catch (error) {
    res.status(500).json({
      error: error.message || "Error occurred while fetching credentials",
    });
  }
};

// update users controller
exports.updateUsers = async (req, res) => {
  // ensure body is not empty
  if (!req.body) {
    res.status(406).json({ error: "You have to Fill in the Update Form" });
    return;
  }

  // destructure data from body object into variables
  let { orgUnit, division, role, email, password } = req.body.updateUser;

  // check if variables are null
  if (!orgUnit || !division || !role || !email || !password) {
    res.status(406).json({ error: "Not all fields have been filled in" });
    return;
  }

  // check if email includes @ sign
  if (!email.includes("@")) {
    res.status(406).json({ error: "Invalid Email Entered" });
    return;
  }

  // check if orgUnit is present in orgUnit Array
  if (!orgUnitArray.includes(orgUnit)) {
    res.status(406).json({ error: "Invalid Organisational Unit" });
    return;
  }

  // check if division is present in division Array
  if (!divisionArray.includes(division)) {
    res.status(406).json({ error: "Invalid Division" });
    return;
  }

  // check password length
  if (password.length < 8) {
    res
      .status(406)
      .json({ error: "Password must contain at least 8 characters" });
    return;
  }

  // if validation is passed assign values to variables
  const updateUser = req.body.updateUser;
  const user_id = req.body.user_id;

  try {
    // use model to find by id and update information
    await User.findByIdAndUpdate(user_id, updateUser)
      .then(() => {
        res.json(req.body);
      })
      .catch((error) => {
        res.json({
          error: error.message || "Error Occured While Updating User",
        });
      });
  } catch (error) {
    res.status(500).json({
      error: error.message || "Error occurred while Updating Credentials",
    });
  }
};

// delete user controller
exports.deleteUser = async (req, res) => {
  // assign user id
  const user_id = req.body.user_id;
  try {
    // use model to find by id and delete user
    await User.findByIdAndDelete(user_id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "Error occurred while deleting user" });
  }
};

// create credentials controller
exports.createCredentials = async (req, res) => {
  try {
    // check if req.body is null
    if (!req.body) {
      return res
        .status(406)
        .json({ error: "Not all fields have been filled in" });
    }

    // destructure variables
    let { orgUnit, division, email, password, website } = req.body;

    // check if variables are null
    if (!email || !password || !website || !orgUnit || !division) {
      res.status(406).json({ error: "Not all fields have been filled in" });
      return;
    }

    // check if email includes @ sign
    if (!email.includes("@")) {
      res.status(406).json({ error: "Invalid Email Entered" });
      return;
    }

    // check if orgUnit is present in orgUnit Array
    if (!orgUnitArray.includes(orgUnit)) {
      res.status(406).json({ error: "Invalid Organisational Unit" });
      return;
    }

    // check if division is present in division Array
    if (!divisionArray.includes(division)) {
      res.status(406).json({ error: "Invalid Division" });
      return;
    }

    // check password length
    if (password.length < 8) {
      res
        .status(406)
        .json({ error: "Password must contain at least 8 characters" });
      return;
    }

    // create new object storing all information
    const newCredential = new Credentials({
      orgUnit,
      division,
      email,
      password,
      website,
    });

    // use model to create new credential
    newCredential
      .save(newCredential)
      .then((response) => {
        res.json(response);
      })
      .catch((error) => {
        res.status(406).json({
          error:
            error.message ||
            "Error occurred while trying to add new credential to DB",
        });
      });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "Error During Creation of Credentials" });
  }
};

// read credentials controller
exports.readCredentials = async (req, res) => {
  // destructure variables
  const { orgUnit, division } = req.body;
  try {
    // use model to find credentials by unit and division
    const credentials = await Credentials.find({
      orgUnit: orgUnit,
    }).find({
      division: division,
    });

    // check if credentials are null
    if (!credentials) {
      return res
        .status(406)
        .json({ error: "No Credentials for These Units/Divisions" });
    }
    res.json(credentials);
  } catch (error) {
    res.status(500).json({
      error: error.message || "Error occurred while fetching credentials",
    });
  }
};

// update credentials controller
exports.updateCredentials = async (req, res) => {
  // ensure body is not empty
  if (!req.body) {
    res.status(406).json({ error: "You have to Fill in the Update Form" });
    return;
  }

  // assign variables
  const updatedCredentials = req.body.updateCredentials;
  const user_id = req.body.user_id;

  // destructure data from body object into variables
  let { orgUnit, division, email, password, website } =
    req.body.updateCredentials;

  // check if variables are null
  if (!orgUnit || !division || !email || !password || !website) {
    res.status(406).json({ error: "Not all fields have been filled in" });
    return;
  }

  // check if email includes @
  if (!email.includes("@")) {
    res.status(406).json({ error: "Invalid Email Entered" });
    return;
  }

  // check if orgUnitArray includes orgUnit
  if (!orgUnitArray.includes(orgUnit)) {
    res.status(406).json({ error: "Invalid Organisational Unit" });
    return;
  }

  // check if divisionArray includes division
  if (!divisionArray.includes(division)) {
    res.status(406).json({ error: "Invalid Division" });
    return;
  }

  // check password length
  if (password.length < 8) {
    res
      .status(406)
      .json({ error: "Password must contain at least 8 characters" });
    return;
  }

  try {
    // use model to find by id and update credential
    await Credentials.findByIdAndUpdate(user_id, updatedCredentials)
      .then(() => {
        res.json({ message: "updated successfully" });
      })
      .catch((error) => {
        res.json({
          error: error.message || "Error Occured While Updating User",
        });
      });
  } catch (error) {
    res.status(500).json({
      error: error.message || "Error occurred while Updating Credentials",
    });
  }
};

// delete credentials controller
exports.deleteCredentials = async (req, res) => {
  // assign variable
  const user_id = req.body.user_id;
  try {
    // use model to find by id and delete credential
    await Credentials.findByIdAndDelete(user_id);
    res.json({ message: "Credential Deleted Successfully" });
  } catch (error) {
    res.status(500).json({
      error: error.message || "An Error Occurred While Deleting a Credential",
    });
  }
};
