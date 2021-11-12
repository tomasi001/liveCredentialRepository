// import requirements
const express = require("express");
const connect = require("./database/connection");
const path = require("path");

// allows you to make cross PORT requests
const cors = require("cors");

// import dotenv and configure its path
require("dotenv").config({ path: "./config.env" });
const PORT = process.env.PORT || 5000;

// create express instance
const app = express();
app.use(express.static(path.join(__dirname, "../build")));
app.use(express.json());
app.use(cors());

// database connection
connect();

// routes
app.use("/api", require("./router/router"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build"));
});

// specify port to listen on
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
