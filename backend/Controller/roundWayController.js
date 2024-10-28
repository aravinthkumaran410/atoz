const roundWayTripModel = require("../Schema/roundWaySchema");
const cloundinary = require("../cloundinary/cloudinary");
const upload = require("../cloundinary/upload");
const sharp = require("sharp");

exports.roundwayTripAdded = async (req, res) => {
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
    const roundWayTrip = new roundWayTripModel({
      additionalcharge,
      roundWayRate: rate,
      carname,
      driverfare,
      acType,
      passenger,
      image: imageUrl,
    });
    await roundWayTrip.save();
    res
      .status(200)
      .json({ message: "Round way trip Added Successfully", roundWayTrip });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.getRoundWay = async (req, res) => {
  try {
    const roundWay = await roundWayTripModel.find();
    if (!roundWay) {
      return res.status(404).json({ message: "No Round way trip found" });
    }

    res.status(200).json(roundWay);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.updateRoundWay = async (req, res) => {
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

    const existingRoundWayTrip = await roundWayTripModel.findById(id);

    if (!existingRoundWayTrip) {
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
      image = existingRoundWayTrip.image;
    }

    const updateRoundWayTrip = await roundWayTripModel.findByIdAndUpdate(
      id,
      {
        image,
        additionalcharge,
        roundWayRate: rate,
        carname,
        driverfare,
        acType,
        passenger,
      },
      {
        new: true,
      }
    );

    if (!updateRoundWayTrip) {
      return res.status(404).json({ message: "Dound Way Trip not update " });
    } else {
      return res.status(200).json(updateRoundWayTrip);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteRoundWay = async (req, res) => {
  try {
    const { id } = req.body;
    const deleteRoundWay = await roundWayTripModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Round Way trip Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
