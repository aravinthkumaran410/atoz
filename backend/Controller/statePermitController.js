

const StatePermit = require('../Schema/statePermitSchema');

exports.addStatePermit = async (req, res) => {
  try {
 
    const { startLocation, endLocation, vehicleDetails } = req.body;

    
    const newStatePermit = new StatePermit({
      startLocation,
      endLocation,
      vehicleDetails,
    });

    await newStatePermit.save();

    return res.status(200).json({
      message: "State permit added successfully!",
      data: newStatePermit,
    });
  } catch (error) {
    console.error("Error adding state permit:", error);

   
    return res.status(500).json({
      message: "Failed to add state permit",
      error: error.message,
    });
  }
};

exports.getStatePermit=async(req,res)=>{
  try{
    const statepermit=await StatePermit.find();
    if(!statepermit){

      return res.status(404).json({
        message: "No state permits found",
        });
    }
    return res.status(200).json(statepermit)
  }catch(error){
    console.error("Error Fetch state permit:", error);

   
    return res.status(500).json({
      message: "Failed to Fetch state permit",
      error: error.message,
    });
  }
  }


  exports.deleteStatePermit=async(req,res)=>{
    try {
      const {id}=req.body;
      const deleteStatePermit = await StatePermit.findByIdAndDelete(id);
      res.status(200).json({ message: "State permit  Deleted Successfully" });  
    }catch(err){
      console.log(err);
      res.status(500).json({ message:  err.message });
    }
  }

  exports.updateStatePermit=async(req,res)=>{
    try{
      const {id,startLocation, endLocation, vehicleDetails}=req.body;
      const updateStatePermit=await StatePermit.findByIdAndUpdate(id,
        {startLocation,endLocation,vehicleDetails},{
          new:true})
          res.status(200).json({message:"State permit updated successfully"})

  }catch(err){
    console.log(err);
    res.status(500).json({ message:  err.message });
  }
}

