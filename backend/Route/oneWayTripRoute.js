const express = require("express");
const router = express.Router();
const oneway=require('../Controller/oneWayController');
const upload = require("../cloundinary/upload");

router.post('/addoneway',upload.fields([{name:'image',maxCount:1}]),oneway.onewayTripAdded);





module.exports = router;