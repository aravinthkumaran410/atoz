const Traffic = require("../Schema/AddTariffSchema");

const addTraffic = async (req, res) => {
  try {
    const { Traffiname } = req.body;

    // Check if Traffiname is provided and is an array
    if (!Traffiname || !Array.isArray(Traffiname) || Traffiname.length === 0) {
      return res
        .status(400)
        .json({ message: "Please provide an array of traffic names." });
    }

    // Create a new document with Traffiname as an array
    const newTraffic = new Traffic({
      Traffiname,
    });

    // Save the document to the database
    await newTraffic.save();

    res
      .status(200)
      .json({ message: "Traffic names added successfully", data: newTraffic });
  } catch (error) {
    console.error("Error adding traffic names:", error);
    res
      .status(500)
      .json({
        message: "An error occurred while adding traffic names",
        error: error.message,
      });
  }
};

module.exports = {
  addTraffic,
};