const mongoose = require("mongoose");

const otherRateSchema = new mongoose.Schema({
    rate: {
        type: String,
        required: true
    },
    type:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        default:''
    }
})


module.exports = mongoose.model("OtherRate", otherRateSchema);

