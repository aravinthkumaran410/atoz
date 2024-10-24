const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();

app.use(cookieParser());
app.use(express.json());
const corsOptions = {
  origin: ["http://localhost:3001", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

const mongo_url =
  "mongodb+srv://karthickc726:Karthick@cluster0.04mzp.mongodb.net/AtoZ-drop-taxi?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("db connect");
    const port = 8000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("error:" + error);
  });
