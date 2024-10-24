console.log("surya");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.listen("5000", () => {
  console.log("server is running on port 5000");
});
