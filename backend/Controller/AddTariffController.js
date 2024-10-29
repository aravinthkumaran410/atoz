const Traffic = require("../Schema/AddTariffSchema");

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
    res.status(200).json({ Traffiname: trafficData.Traffiname });
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
    const { id } = req.params; // ID from params
    const { Traffiname } = req.body; // Traffic name from body

    // Check if both ID and Traffiname are provided
    if (!id || !Traffiname) {
      return res
        .status(400)
        .json({ message: "Please provide a valid traffic name id and name." });
    }

    console.log("Received ID:", id);
    console.log("Received Traffiname:", Traffiname);

    // Step 1: Find the document to verify its structure
    const trafficData = await Traffic.findOne({ _id: id });
    if (!trafficData) {
      return res.status(404).json({ message: "Traffic document not found." });
    }
    console.log("Original Traffic Data:", JSON.stringify(trafficData, null, 2));

    // Step 2: Pull the specific name from the array
    const result = await Traffic.updateOne(
      { _id: id },
      { $pull: { Traffiname: Traffiname } } // Directly pull by string match
    );
    console.log("Update Result:", result);

    // Step 3: Fetch and return the updated document to confirm
    const updatedTrafficData = await Traffic.findOne({ _id: id });
    console.log(
      "Updated Traffic Data:",
      JSON.stringify(updatedTrafficData, null, 2)
    );

    res.status(200).json({
      message: "Traffic name deleted successfully",
      data: updatedTrafficData,
    });
  } catch (error) {
    console.error("Error deleting traffic name:", error);
    res.status(500).json({
      message: "An error occurred while deleting the traffic name",
      error: error.message,
    });
  }
};










module.exports = {
  addTraffic,
  getTraffic,

  deleteTrafficName
};
