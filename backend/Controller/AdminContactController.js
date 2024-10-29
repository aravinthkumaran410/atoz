const Admincreates = require("../Schema/AdminContactSchema");

const addingdetails = async (req, res) => {
  try {
    const { title, phone, phone1, address, email } = req.body;

    // Validation checks
    if (!title || !phone || !address || !email) {
      return res
        .status(400)
        .json({ message: "Title, phone, address, and email are required" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const newAdminAdding = new Admincreates({
      title,
      phone,
      phone1,
      address,
      email,
    });

    console.log(newAdminAdding);

    await newAdminAdding.save();
    res.status(201).json({ message: "Admin details added successfully!" });
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({ message: "Error creating admin" });
  }
};

const getAdmins = async (req, res) => { 
try {
    const getadmincreates = await Admincreates.find()
    res.status(200).json(getadmincreates);
} catch (error) {
     res
       .status(500)
       .json({ message: "Error retrieving admins details", error: error.message });
}
}

const updateAdmin = async (req, res) => {
  try {
 
    const {_id,title, phone, phone1, address, email } = req.body;
   console.log(_id)
    // Validation checks
    if (!title || !phone || !address || !email) {
      return res
        .status(400)
        .json({ message: "Title, phone, address, and email are required" });
    }

   

    // Update the admin details in the database
    const updatedAdmin = await Admincreates.findByIdAndUpdate(
      _id,
      { title, phone, phone1, address, email },
      { new: true } // Return the updated document
    );

    // Check if the admin with the given ID exists
    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res
      .status(200)
      .json({ message: "Admin details updated successfully", updatedAdmin });
  } catch (error) {
    console.error("Error updating admin:", error);
    res.status(500).json({ message: "Error updating admin" });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params; // Correct destructuring for id
    const deletedAdmin = await Admincreates.findByIdAndDelete(id);

    // Check if the admin with the given ID exists
    if (!deletedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res
      .status(200)
      .json({ message: "Admin deleted successfully", deletedAdmin });
  } catch (error) {
    console.error("Error deleting admin:", error);
    res.status(500).json({ message: "Error deleting admin" });
  }
};


module.exports = {
  addingdetails,
  getAdmins,
    updateAdmin,
  deleteAdmin
};