const express = require("express");
const router = express.Router();
const roundway=require('../Controller/roundWayController');
const upload = require("../cloundinary/upload");

router.post('/addroundway',upload.fields([{name:'image',maxCount:1}]),roundway.roundwayTripAdded);

router.get("/get-round-way-trip",roundway.getRoundWay);

router.post("/update-roundway-trip",upload.fields([{name:'image',maxCount:1}]),roundway.updateRoundWay);

router.post("/delete-roundway-trip",roundway.deleteRoundWay)

module.exports = router;