const express = require('express');
const router = express.Router()
const { addTraffic } = require("../Controller/AddTariffController");


router.post("/addtraffic", addTraffic);

module.exports = router