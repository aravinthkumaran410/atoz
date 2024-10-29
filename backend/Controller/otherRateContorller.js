const otherRateModel=require("../Schema/otherRateScehma")


exports.addOtherRate=async(req,res)=>{
    try {
        const {rate,type,comment}=req.body;
        if(!rate || !type ){
            return res.status(400).json({message:"Please fill all the fields"})
        }
        
        const newOtherRate=new otherRateModel({
           rate: rate,
            type:type,
           comment: comment})
        await newOtherRate.save()
        res.status(200).json({message:"Other Rate Added Successfully"})

}
catch (error) {
    res.status(500).json({ message: "Error in Adding Other Rate" });
}
}


exports.getOtherRate=async(req,res)=>{
    try {
        const otherRates=await otherRateModel.find()
        res.status(200).json(otherRates)
    }catch(error){
        res.status(500).json({message:"Error in Getting Other Rate"})
    }
}


exports.updateOtherRate=async(req,res)=>{
    try{
        const {id,rate,type,comment}=req.body;
        if(!id || !rate || !type ){
            return res.status(400).json({message:"Please fill all the fields"})
            }
            const updatedOtherRate=await otherRateModel.findByIdAndUpdate(id,{
                rate:rate,
                type:type,
                comment:comment
            },{new:true})
            res.status(200).json({message:"Other Rate Updated Successfully"})
    }catch(error){
        res.status(500).json({message:"Error in Updating Other Rate"})
    }
}

exports.deleteOtherRate=async(req,res)=>{
    try{
        const {id}=req.body;
        if(!id ){
            return res.status(400).json({message:"Id is not defined"})
        }
        const deletedOtherRate=await otherRateModel.findByIdAndDelete(id)
        res.status(200).json({message:"Other Rate Deleted Successfully"})

    }catch(error){
        res.status(500).json({message:"Error in Deleting Other Rate"})
    }
}