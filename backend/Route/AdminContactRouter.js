const express = require("express");
const router = express.Router();
const {
  addingdetails,
  getAdmins,
  updateAdmin,
  deleteAdmin,
} = require("../Controller/AdminContactController");
const VerifyToken = require("./VerifyToken/VerifyToken");



router.post('/createadmin', addingdetails);
router.get('/getAdmins', getAdmins);
router.post('/updateadmin', VerifyToken,updateAdmin);
router.delete("/deleteadmins/:id", deleteAdmin);


module.exports = router;