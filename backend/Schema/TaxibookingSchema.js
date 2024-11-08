const mongoose = require("mongoose");

// TAXI BOOKING SCHEMA
const taxibookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  pickupLocation: {
    type: String,
    required: true,
  },
  dropLocation: {
    type: String,
    required: true,
  },
  pickupDate: {
    type: Date,
    required: true,
  },
  pickupTime: {
    type: String,
    required: true,
  },
  chooseCarType: {
    type: String,
    required: true,
  },
  tripType: {
    // Field to specify trip type: 'one-way' or 'round-trip'
    type: String,
    enum: ["one-way", "round-trip"],  
    required: true,
  },
  returnDate: {
    // Optional for round-trip
    type: Date,
    required: function () {
      return this.tripType === "round-trip";
    },
  },
 
  distance: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
 
  }
});

module.exports = mongoose.model("TaxiBooking", taxibookingSchema);