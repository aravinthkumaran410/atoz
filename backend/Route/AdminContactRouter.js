const express = require("express");
const router = express.Router();
const {
  addingdetails,
  getAdmins,
  updateAdmin,
  deleteAdmin,
} = require("../Controller/AdminContactController");




router.post('/createadmin', addingdetails);
router.get('/getAdmins', getAdmins);
router.put('/updateadmin/:id', updateAdmin);
router.delete("/deleteadmins/:id", deleteAdmin);


module.exports = router;