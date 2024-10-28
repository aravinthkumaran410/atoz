const mongoose = require('mongoose')

const adminaddedSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    phone1: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
      require:true
    }
})


module.exports = mongoose.model("admindetails", adminaddedSchema);