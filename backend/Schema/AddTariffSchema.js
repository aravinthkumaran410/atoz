
const mongoose = require('mongoose');

const addTarffi = new mongoose.Schema({
  Traffiname: {
    type: [String],
    required: true, 
  },
});


module.exports = mongoose.model("Tarffi", addTarffi);