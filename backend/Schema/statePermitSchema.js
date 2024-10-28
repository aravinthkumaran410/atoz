const mongoose = require('mongoose');


const vehicleDetailSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
   
  },
  rate: {
    type: String,
    required: true,
   
  },
});


const statePermitSchema = new mongoose.Schema({
  startLocation: {
    type: String,
    required: true,
  },
  endLocation: {
    type: String,
    required: true,
  },
  vehicleDetails: [vehicleDetailSchema], 
});

// Create the model
const StatePermit = mongoose.model('StatePermit', statePermitSchema);

module.exports = StatePermit;
