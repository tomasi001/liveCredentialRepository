// import mongoose
const mongoose = require("mongoose");

// create user schema
const userSchema = new mongoose.Schema({
  orgUnit: {
    type: String,
    required: true,
  },
  division: {
    type: String,
    required: true,
  },
  role: {
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
});

// create mongoose model with name and schema
const User = mongoose.model("user", userSchema);

// export module
module.exports = User;
