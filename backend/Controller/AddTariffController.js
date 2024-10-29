const Traffic = require("../Schema/AddTariffSchema");
const mongoose = require("mongoose");

const addTraffic = async (req, res) => {
  try {
    const { Traffiname } = req.body;

    // Check if Traffiname is provided and is a string
    if (!Traffiname || typeof Traffiname !== "string") {
      return res
        .status(400)
        .json({ message: "Please provide a valid traffic name as a string." });
    }

    // Find the existing traffic document or create a new one if it doesn't exist
    const trafficData = await Traffic.findOneAndUpdate(
      {}, // Match criteria for a single document
      { $addToSet: { Traffiname } }, // Add new name to array if it doesn't already exist
      { new: true, upsert: true } // Return the updated document and create it if none exists
    );

    res.status(200).json({
      message: "Traffic name added successfully",
      data: trafficData,
    });
  } catch (error) {
    console.error("Error adding traffic name:", error);
    res.status(500).json({
      message: "An error occurred while adding the traffic name",
      error: error.message,
    });
  }
};

const getTraffic = async (req, res) => {
  try {
    // Find the document that contains the traffic names
    const trafficData = await Traffic.findOne();

    // Check if traffic data exists; if not, return an empty array
    if (!trafficData) {
      return res.status(200).json({ Traffiname: [] });
    }

    // Send the traffic names as a response
    res.status(200).json( trafficData );
  } catch (error) {
    console.error("Error fetching traffic names:", error);
    res.status(500).json({
      message: "An error occurred while fetching traffic names",
      error: error.message,
    });
  }
};

const deleteTrafficName = async (req, res) => {
  try {
    const { id,index } = req.body; // ID from params
  

    console.log("Received ID:", id);
    console.log("Received Index:", index);

    // Check if the ID format is valid
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format." });
    }

  // Step 1: Find the document to verify its structure
  const trafficData = await Traffic.findOne({ _id: id });

  if (!trafficData) {
    return res.status(404).json({ message: "Traffic data not found." });
  }
   console.log(trafficData)
 

  // Step 3: Use splice to remove the item at the specified index
  trafficData.Traffiname.splice(index, 1);

  // Step 4: Save the updated document
  await trafficData.save();

  res.status(200).json({ message: "City name deleted successfully!" });
} catch (error) {
  console.error("Error deleting traffic name:", error);
  res.status(500).json({ message: "Failed to delete the city name." });
}
};










module.exports = {
  addTraffic,
  getTraffic,

  deleteTrafficName
};
