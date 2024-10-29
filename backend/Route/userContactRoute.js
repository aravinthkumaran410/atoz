const express = require("express");
const router = express.Router();
const userContact=require('../Controller/userContactController');
const VerifyToken = require("./VerifyToken/VerifyToken");


router.post('/add-user-contact',userContact.addUserContact);

router.get('/get-user-contact',VerifyToken,userContact.getUserContact);

router.post('/delete-user-contact',VerifyToken,userContact.deleteUserContact)

module.exports=router