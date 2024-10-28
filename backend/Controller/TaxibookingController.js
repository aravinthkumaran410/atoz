 const TaxiBooking = require("../Schema/TaxibookingSchema");

// Controller to create a new taxi booking
const createTaxiBooking = async (req, res) => {
  try {
    const {
      fullName,
      phone,
      pickupLocation,
      dropLocation,
      pickupDate,
      pickupTime,
      selectedCar,
      tripType,
      returnDate,
      returnTime,
      distance,
      totalFare,
    } = req.body;

    // Input validation
    if (
      !fullName ||
      !phone ||
      !pickupLocation ||
      !dropLocation ||
      !pickupDate ||
      !pickupTime ||
      !selectedCar
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create new booking entry
    const newBooking = new TaxiBooking({
      name: fullName, // Assuming you want to save it as "name"
      phone,
      pickupLocation,
      dropLocation,
      pickupDate,
      pickupTime,
      chooseCarType: selectedCar.label, // Using the car type's value
      tripType,
      returnDate,
      returnTime,
      distance: parseFloat(distance), // Convert to number
      total: parseFloat(totalFare), // Convert to number
    });

    await newBooking.save();
    res.status(201).json({
      message: "Taxi booked successfully",
      booking: newBooking.toObject({
        versionKey: false,
        transform: (doc, ret) => {
          delete ret.phone;
          return ret;
        },
      }),
    });
  } catch (error) {
    console.error("Error booking taxi:", error); // Logging error
    res
      .status(500)
      .json({ message: "Error booking taxi", error: error.message });
  }
};

// Controller to get all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await TaxiBooking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving bookings", error: error.message });
  }
};

const deleteBooking = async (req, res) => {
  const id = req.params.id;

  try {
    const booking = await TaxiBooking.findByIdAndDelete(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking user found" });
    }
    res.status(200).json({ message: "Booking deleted successfully", booking });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting booking", error: error.message });
  }
};

const getBookingsbyid = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await TaxiBooking.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Booking list not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error getting booking" });
  }
};

const getSingletripBookings = async (req, res) => {
  try {
    // Assuming your booking model is called 'Booking'
    const oneWayBookings = await TaxiBooking.find({ tripType: "one-way" });

    if (oneWayBookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No one-way trip bookings found" });
    }

    return res.status(200).json(oneWayBookings);
  } catch (error) {
    console.error("Error fetching one-way trip bookings:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getMultipletripBookings = async (req, res) => {
  try {
    // Assuming your booking model is called 'Booking'
    const oneWayBookings = await TaxiBooking.find({ tripType: "round-trip" });

    if (oneWayBookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No rounded trip bookings found" });
    }

    return res.status(200).json(oneWayBookings);
  } catch (error) {
    console.error("Error fetching rounded trip bookings:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const Limitations = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Get page number from query params, default to 1
  const limit = parseInt(req.query.limit) || 5; // Get limit from query params, default to 5

  try {
    const bookings = await TaxiBooking.find()
      .limit(limit)
      .skip((page - 1) * limit) // Skip the records for previous pages
      .sort({ pickupDate: 1 }); // Optional: Sort by pickup date

    const totalBookings = await TaxiBooking.countDocuments(); // Get the total number of bookings
    const totalPages = Math.ceil(totalBookings / limit); // Calculate total pages

    res.json({
      bookings,
      totalBookings,
      totalPages,
      currentPage: page,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  createTaxiBooking,
  getAllBookings,
  deleteBooking,
  getBookingsbyid,
  Limitations,
  getSingletripBookings,
  getMultipletripBookings,
};