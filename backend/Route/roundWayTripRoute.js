const express = require("express");
const router = express.Router();
const roundway=require('../Controller/roundWayController');
const upload = require("../cloundinary/upload");
const VerifyToken = require("./VerifyToken/VerifyToken");

router.post('/addroundway',VerifyToken,upload.fields([{name:'image',maxCount:1}]),roundway.roundwayTripAdded);

router.get("/get-round-way-trip",roundway.getRoundWay);

router.post("/update-roundway-trip",VerifyToken,upload.fields([{name:'image',maxCount:1}]),roundway.updateRoundWay);

router.post("/delete-roundway-trip",VerifyToken,roundway.deleteRoundWay)

module.exports = router;