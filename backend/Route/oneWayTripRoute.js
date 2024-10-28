const express = require("express");
const router = express.Router();
const oneway=require('../Controller/oneWayController');
const upload = require("../cloundinary/upload");

router.post('/addoneway',upload.fields([{name:'image',maxCount:1}]),oneway.onewayTripAdded);


router.get("/get-one-way-trip",oneway.getOneWay);


router.post("/update-oneway-trip",upload.fields([{name:'image',maxCount:1}]),oneway.updateOneWay);

router.post("/delete-oneway-trip",oneway.deleteOneWay);

//Arvind nagaraj

router.get("/getAllVechicles",oneway.getAllVehicles);




module.exports = router;