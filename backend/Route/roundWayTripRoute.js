const express = require("express");
const router = express.Router();
const roundway=require('../Controller/roundWayController');
const upload = require("../cloundinary/upload");

router.post('/addroundway',upload.fields([{name:'image',maxCount:1}]),roundway.roundwayTripAdded);





module.exports = router;