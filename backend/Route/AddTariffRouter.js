const express = require('express');
const router = express.Router()
const {
  addTraffic,
  getTraffic,

  deleteTrafficName,
} = require("../Controller/AddTariffController");


router.post("/addtraffic", addTraffic);
router.get("/gettraffic", getTraffic);


// Delete traffic name
router.delete("/deletetraffic/:id", deleteTrafficName);

module.exports = router