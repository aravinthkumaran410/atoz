const oneWayTripModel = require("../Schema/oneWaySchema");
const cloundinary = require("../cloundinary/cloudinary");
const upload = require("../cloundinary/upload");
const sharp = require("sharp");

exports.onewayTripAdded = async (req, res) => {
    try {
      const { additionalcharge, rate, carname,driverfare } = req.body;
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
        additionalcharge, rate, carname,driverfare,
        image: imageUrl,
      });
      await oneWayTrip.save();
      res.status(200).json({ message: "One way trip Added Successfully", oneWayTrip });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  };