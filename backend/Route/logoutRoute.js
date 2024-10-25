const express = require("express");
const router = express.Router();
const logout=require('../Controller/logoutController')



router.post('/logout',logout.logout);

module.exports = router;