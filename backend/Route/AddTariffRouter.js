const express = require('express');
const router = express.Router()
const {
  addTraffic,
  getTraffic,

  deleteTrafficName,
} = require("../Controller/AddTariffController");
const VerifyToken = require('./VerifyToken/VerifyToken');


router.post("/addtraffic", VerifyToken,addTraffic);
router.get("/gettraffic", getTraffic);


// Delete traffic name
router.post("/deletetraffic", VerifyToken,deleteTrafficName);

module.exports = router