// import mongoose
const mongoose = require("mongoose");

// create async function to establish
// connection with mongo DB
const connect = async () => {
  try {
    // make mongodb connection by importing URI from .env file
    const con = await mongoose.connect(process.env.MONGO_URI);

    // log connection string
    console.log(`MongoDB Connected ${con.connection.host}`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

// export module
module.exports = connect;
