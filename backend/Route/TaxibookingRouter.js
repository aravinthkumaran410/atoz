const express = require("express");
const router = express.Router();
const {
  createTaxiBooking,
  getAllBookings,
  deleteBooking,
  getBookingsbyid,
  getSingletripBookings,
  getMultipletripBookings,
  Limitations,
} = require("../Controller/TaxibookingController");

const VerifyToken = require("./VerifyToken/VerifyToken");

// Route to create a new taxi booking
router.post("/createbookings", createTaxiBooking);

// Route to get all bookings
router.get("/getbookings", VerifyToken,getAllBookings);

//Route to delete bookings
router.post("/deletebookings",VerifyToken, deleteBooking);

//Route to getbyid user bookings
router.get("/getidbookings/:id", getBookingsbyid);

//Router to get single trip
router.get("/getsingle-trip-bookings", getSingletripBookings);

//Router to get rounded trip
router.get("/getMultiple-trip-bookings", getMultipletripBookings);

//pagination and limitations
router.get("/pagination", Limitations);



module.exports = router;