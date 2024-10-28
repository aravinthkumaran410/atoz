const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();

const loginRoute=require("./Route/loginRoute")
const logoutRoute=require("./Route/logoutRoute")
const oneWayTripRoute=require("./Route/oneWayTripRoute");
const roundWayTripRoute=require("./Route/roundWayTripRoute");
const statePermitRoute=require("./Route/statePermitRoute");
const taxibook = require('./Route/TaxibookingRouter')
const adminadded = require('./Route/AdminContactRouter')
const addtraffic = require('./Route/AddTariffRouter')

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

app.use("/admin",loginRoute);
app.use("/admins",logoutRoute);
app.use("/onewaytrip",oneWayTripRoute);
app.use("/roundtrip",roundWayTripRoute);
app.use("/statepermit",statePermitRoute);
//taxi booking form 
app.use("/taxibook", taxibook);
//admin can add their details
app.use("/admin", adminadded);
//add traffic
app.use("/traffic", addtraffic);

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
