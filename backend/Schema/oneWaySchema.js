const mongoose = require("mongoose");

const oneWayTripsSchema = new mongoose.Schema({
  carname: {
    type: String,
    required: true,
  },
  rate: {
    type: String,
    required: true,
  },
  driverfare: {
    type: String,
    required: true,
  },
  additionalcharge: {
    type: String,
    required: true,
  },
 
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("onewaytrips", oneWayTripsSchema);