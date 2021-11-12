// import mongoose
const mongoose = require("mongoose");

// create credential schema
const credentialSchema = new mongoose.Schema({
  orgUnit: {
    type: String,
    required: true,
  },
  division: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  website: {
    type: String,
    required: true,
  },
});

// create mongoose model with name and schema
const Credentials = mongoose.model("credentials", credentialSchema);

// export module
module.exports = Credentials;
