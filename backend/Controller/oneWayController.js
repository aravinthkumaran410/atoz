const oneWayTripModel = require("../Schema/oneWaySchema");
const twoWayTripModel = require("../Schema/roundWaySchema");
const cloundinary = require("../cloundinary/cloudinary");
const upload = require("../cloundinary/upload");
const sharp = require("sharp");

exports.onewayTripAdded = async (req, res) => {
  try {
    const { additionalcharge, rate, carname, driverfare, acType, passenger } =
      req.body;
    const image = req.files["image"][0];

    async function processImage(image, maxSizeKB) {
      let quality = 80;
      let resizedImage = await sharp(image.buffer)
        .toFormat("jpeg")
        .jpeg({ quality })
        .toBuffer();

      const imageString = resizedImage.toString("base64");

      const result = await cloundinary.uploader.upload(
        `data:image/jpeg;base64,${imageString}`,
        {
          folder: "Car",
          resource_type: "image",
        }
      );

      return result.secure_url;
    }

    const imageUrl = await processImage(image, 100);
    const oneWayTrip = new oneWayTripModel({
      additionalcharge,
      oneWayRate: rate,
      carname,
      driverfare,
      acType,
      passenger,
      image: imageUrl,
    });
    await oneWayTrip.save();
    res
      .status(200)
      .json({ message: "One way trip Added Successfully", oneWayTrip });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.getOneWay = async (req, res) => {
  try {
    const oneWay = await oneWayTripModel.find();
    if (!oneWay) {
      return res.status(404).json({ message: "No one way trip found" });
    }

    res.status(200).json(oneWay);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.updateOneWay = async (req, res) => {
  try {
    let image;
    const {
      id,
      additionalcharge,
      rate,
      carname,
      driverfare,
      acType,
      passenger,
    } = req.body;

    const existingOneWayTrip = await oneWayTripModel.findById(id);

    if (!existingOneWayTrip) {
      return res.status(404).json({ message: "Trip  not found" });
    }

    if (req.files && req.files["image"]) {
      image = req.files["image"][0];
      const processImage = async (image, maxSizeKB) => {
        let quality = 80;
        let resizedImage = await sharp(image.buffer)
          .toFormat("jpeg")
          .jpeg({ quality })
          .toBuffer();

        const imageString = resizedImage.toString("base64");

        const result = await cloundinary.uploader.upload(
          `data:image/jpeg;base64,${imageString}`,
          {
            folder: "Car",
            resource_type: "image",
          }
        );

        return result.secure_url;
      };
      image = await processImage(image, 100);
    } else {
      image = existingOneWayTrip.image;
    }

    const updateOneWayTrip = await oneWayTripModel.findByIdAndUpdate(
      id,
      {
        image,
        additionalcharge,
        oneWayRate: rate,
        carname,
        driverfare,
        acType,
        passenger,
      },
      {
        new: true,
      }
    );

    if (!updateOneWayTrip) {
      return res.status(404).json({ message: "One Way Trip not update " });
    } else {
      return res.status(200).json(updateOneWayTrip);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteOneWay = async (req, res) => {
  try {
    const { id } = req.body;
    const deleteOneWay = await oneWayTripModel.findByIdAndDelete(id);
    res.status(200).json({ message: "One Way trip Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

//Arvind nagaraj

exports.getAllVehicles = async (req, res) => {
  try {
    const mergedDetails = await oneWayTripModel.aggregate([
      {
        $lookup: {
          from: "roundwaytrips", // have to use name what is named in collection
          localField: "carname",
          foreignField: "carname",
          as: "vehicleDetails",
        },
      },
      {
        $unwind: "$vehicleDetails",
      },
      {
        $project: {
          carname: 1,
          passenger: 1,
          acType: 1,
          oneWayRate: 1,
          twoWayRate: "$vehicleDetails.roundWayRate",
          image: 1,
        },
      },
    ]);

    if (mergedDetails) {
      return res.status(200).json({
        message: "success",
        data: mergedDetails,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
