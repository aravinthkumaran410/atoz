const express = require("express");
const router = express.Router();
const otherRate=require('../Controller/otherRateContorller');
const VerifyToken = require("./VerifyToken/VerifyToken");

router.post("/add-other-rate",VerifyToken,otherRate.addOtherRate)

router.get("/get-other-rate",otherRate.getOtherRate)


router.post("/update-other-rate",VerifyToken,otherRate.updateOtherRate)


router.post("/delete-other-rate",VerifyToken,otherRate.deleteOtherRate)

module.exports = router;