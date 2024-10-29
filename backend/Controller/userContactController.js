const UserContact = require("../Schema/UserContact");


exports.addUserContact=async(req,res)=>{
    try{
        const {name,phoneNumber,email,message}=req.body;
        if(!name || !phoneNumber || !email || !message){
            return res.status(400).json({message:"Please fill all the fields"})
        }
        const userContact=new UserContact({
            name:name,
            phoneNumber:phoneNumber,
            email:email,
            message:message})
            await userContact.save();
            res.status(200).json({message:"User Contact Added Successfully"})
}
catch(error){
    res.status(500).json({message:"Error in Adding user Contact"})
}
}


exports.getUserContact=async(req,res)=>{
    try{
        const userContact=await UserContact.find();
        res.status(200).json(userContact)
    }catch(err){
        res.status(500).json({message:"Error in fetching user contact"})
    }
}

exports.deleteUserContact=async(req,res)=>{
    try{
        const {id}=req.body;
        const userContact=await UserContact.findByIdAndDelete(id);
        res.status(200).json({message:"User Contact Deleted Successfully"})
    }catch(err){
        res.status(500).json({message:"Error in delete user contact"})
    }
}