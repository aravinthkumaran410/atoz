const express = require("express");
const router = express.Router();
const statePermit=require('../Controller/statePermitController');
const VerifyToken = require("./VerifyToken/VerifyToken");

router.post('/add-state-permit',VerifyToken,statePermit.addStatePermit);

router.get('/get-state-permit',statePermit.getStatePermit)

router.post('/delete-state-permit',VerifyToken,statePermit.deleteStatePermit)

router.post('/update-state-permit',VerifyToken,statePermit.updateStatePermit);

module.exports = router;