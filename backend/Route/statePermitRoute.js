const express = require("express");
const router = express.Router();
const statePermit=require('../Controller/statePermitController');

router.post('/add-state-permit',statePermit.addStatePermit);

router.get('/get-state-permit',statePermit.getStatePermit)

router.post('/delete-state-permit',statePermit.deleteStatePermit)

router.post('/update-state-permit',statePermit.updateStatePermit);

module.exports = router;