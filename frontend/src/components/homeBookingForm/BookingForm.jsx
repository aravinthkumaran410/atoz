import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import AxiosInstance from "../../api/AxiosInstance";
import "./BookingForm.css";
import CustomSelect from "./CustomSelect";
import CustomSelectForChooseCar from "./CustomSelectForChooseCar";
import { FaMapMarkerAlt } from "react-icons/fa";

import carImage from "../../assets/gif/Off road.gif";

import { motion } from "framer-motion";

const BookingForm = () => {
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropSuggestions, setDropSuggestions] = useState([]);
  const [distance, setDistance] = useState(null);
  const [pickupCoords, setPickupCoords] = useState({});
  const [dropCoords, setDropCoords] = useState({});
  const carTypes = ["Sedan", "SUV", "Van"];
  const [oneWayCars, setOneWayCars] = useState([]);
  const [roundTripCars, setRoundTripCars] = useState([]);
  const [estimatedFare, setEstimatedFare] = useState();
  const [rate, setRate] = useState();
  const [driverFare, setdriverFare] = useState();

  const [pickupInputError, setPickupInputError] = useState(false);
  const [dropInputError, setDropInputError] = useState(false);

  useEffect(() => {
    const fetchCarTypes = async () => {
      try {
        const oneWayResponse = await AxiosInstance.get(
          "/onewaytrip/get-one-way-trip"
        );
        const roundTripResponse = await AxiosInstance.get(
          "/roundtrip/get-round-way-trip"
        );

        setOneWayCars(oneWayResponse.data);
        setRoundTripCars(roundTripResponse.data);
      } catch (error) {
        console.error("Error fetching car types:", error);
      }
    };

    fetchCarTypes();
  }, []);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      phone: "",
      pickupLocation: "",
      dropLocation: "",
      pickupDate: "",
      pickupTime: "",
      returnDate: "",
      returnTime: "",
      selectedCar: { label: "Select a car", value: "" },
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Required"),
      phone: Yup.string()
        .required("Required")
        .matches(/^\d{10}$/, "Must be a valid phone number"),
      pickupLocation: Yup.string().required("Required"),
      dropLocation: Yup.string()
        .required("Required")
        .notOneOf([Yup.ref("pickupLocation")], "Cannot be the same as pickup"),
      pickupDate: Yup.date().required("Required"),
      pickupTime: Yup.string().required("Required"),
      returnDate: isRoundTrip ? Yup.date().required("Required") : Yup.string(),
      returnTime: isRoundTrip
        ? Yup.string().required("Required")
        : Yup.string(),
      selectedCar: Yup.object()
        .shape({
          value: Yup.string().required("Required"),
          label: Yup.string().required("Required"),
        })
        .required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setSubmittedData(values);
      const selectedCar = isRoundTrip
        ? roundTripCars.find((car) => car.carname === values.selectedCar.value)
        : oneWayCars.find((car) => car.carname === values.selectedCar.value);

      setRate(selectedCar.rate);
      setdriverFare(selectedCar.driverfare);

      resetForm();
      calculateDistance(pickupCoords, dropCoords);
      const totalFare =
        distance && rate && driverFare
          ? (distance * rate + driverFare).toFixed(2)
          : 0;
      setEstimatedFare(totalFare);
      console.log("total : ", totalFare);
    },
  });

  const fetchLocationSuggestions = async (query, isPickup) => {
    if (!query) {
      if (isPickup) {
        setPickupSuggestions([]);
        setPickupInputError(false); // Reset error
      } else {
        setDropSuggestions([]);
        setDropInputError(false); // Reset error
      }
      return;
    }

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=5`
      );
      const suggestions = response.data;
      if (isPickup) {
        setPickupSuggestions(suggestions);
        setPickupInputError(suggestions.length === 0); // Set error if no suggestions
      } else {
        setDropSuggestions(suggestions);
        setDropInputError(suggestions.length === 0); // Set error if no suggestions
      }
    } catch (error) {
      console.error("Error fetching location suggestions", error);
    }
  };

  const handlePickupChange = (value) => {
    formik.setFieldValue("pickupLocation", value);
    setPickupSuggestions([]);
  };

  const handleDropChange = (value) => {
    formik.setFieldValue("dropLocation", value);
    setDropSuggestions([]);
  };

  const handlePickupInputChange = (e) => {
    const { value } = e.target;
    formik.setFieldValue("pickupLocation", value);
    fetchLocationSuggestions(value, true);
  };

  const handleDropInputChange = (e) => {
    const { value } = e.target;
    formik.setFieldValue("dropLocation", value);
    fetchLocationSuggestions(value, false);
  };

  const fetchCoordinates = async (location, isPickup) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${location}&format=json&limit=1`
      );
      const data = response.data[0];
      if (data) {
        const coords = {
          lat: parseFloat(data.lat),
          lon: parseFloat(data.lon),
        };
        if (isPickup) {
          setPickupCoords(coords);
        } else {
          setDropCoords(coords);
        }
      }
    } catch (error) {
      console.error("Error fetching coordinates", error);
    }
  };

  const calculateDistance = (pickup, drop) => {
    if (pickup && drop) {
      const toRadians = (degree) => (degree * Math.PI) / 180;

      const R = 6371;
      const lat1 = toRadians(pickup.lat);
      const lon1 = toRadians(pickup.lon);
      const lat2 = toRadians(drop.lat);
      const lon2 = toRadians(drop.lon);

      const dLat = lat2 - lat1;
      const dLon = lon2 - lon1;

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1) *
          Math.cos(lat2) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distanceInKm = R * c;

      setDistance(`${distanceInKm.toFixed(2)}`);
    }
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = new Date();
        time.setHours(hour);
        time.setMinutes(minute);
        const formattedTime = time.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        options.push(formattedTime);
      }
    }
    return options;
  };

  const handleReset = () => {
    setSubmittedData(null);
    setDistance(null); // Reset distance
    setPickupCoords({});
    setDropCoords({});
    setPickupSuggestions([]);
    setDropSuggestions([]);
  };

  const handleConfirmBooking = async (data) => {
    // Calculate the total fare
    const totalFare = (
      Number(distance) * Number(rate) +
      Number(driverFare)
    ).toFixed(2);

    // Show alert with booking details
    alert(`
      Booking Confirmed!
      Full Name: ${data.fullName}
      Phone: ${data.phone}
      Pickup Location: ${data.pickupLocation}
      Drop Location: ${data.dropLocation}
      Pickup Date: ${data.pickupDate}
      Pickup Time: ${data.pickupTime}
      ${
        isRoundTrip
          ? `
        Trip: Round Trip
        Return Date: ${data.returnDate}
        Return Time: ${data.returnTime}`
          : "Trip: One Trip"
      }
      Car Type: ${data.selectedCar.label}
      Distance: ${distance} km
      Per km: Rs ${rate}
      Driver Fare: Rs ${driverFare}
      Total: Rs ${totalFare}
    `);

    const message = `
      New Booking Confirmed!
      Full Name: ${data.fullName}
      Phone: ${data.phone}
      Pickup Location: ${data.pickupLocation}
      Drop Location: ${data.dropLocation}
      Pickup Date: ${data.pickupDate}
      Pickup Time: ${data.pickupTime}
      ${
        isRoundTrip
          ? `
        Trip: Round Trip
        Return Date: ${data.returnDate}
        Return Time: ${data.returnTime}`
          : "Trip: One Trip"
      }
      Car Type: ${data.selectedCar.label}
      Distance: ${distance} km
      Per km: Rs ${rate}
      Driver Fare: Rs ${driverFare}
      Total: Rs ${totalFare}
    `;

    const token = "7833606942:AAE8Ayq11k37vLrK4dELa0yFGf8ZZVEQOMU";
    const chatId = "-1002294686843";

    try {
      // Send the message to Telegram
      await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
        chat_id: chatId,
        text: message,
      });
      console.log("Notification sent to Telegram");
    } catch (error) {
      console.error("Error sending notification:", error);
    }

    window.location.reload();
  };

  // const testSendMessage = async () => {
  //   const token = "7833606942:AAE8Ayq11k37vLrK4dELa0yFGf8ZZVEQOMU"; // Replace with your bot token
  //   const chatId = "-1002294686843";

  //   try {
  //     const response = await axios.post(
  //       `https://api.telegram.org/bot${token}/sendMessage`,
  //       {
  //         chat_id: chatId,
  //         text: "Test message from my bot!",
  //       }
  //     );
  //     console.log("Response from Telegram:", response.data);
  //   } catch (error) {
  //     console.error(
  //       "Error sending notification:",
  //       error.response ? error.response.data : error.message
  //     );
  //   }
  // };

  return (
    <section className="container">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="home-booking-form-container"
      >
        <div className="home-booking-left-container">
          <h3 className="home-booking-left-container-title">Book Your Ride</h3>
        </div>
        <div className="home-booking-right-container">
          {submittedData ? (
            <div className="summary">
              <div className="summery-left-content">
                <h4 className="mb-4 summery-title">Estimates:</h4>

                {distance && !isNaN(distance) && (
                  <p className="h5">
                    <strong>Total:</strong>
                    <span className="fs-4 text-warning ms-2">
                      Rs{" "}
                      {(
                        Number(distance) * Number(rate) +
                        Number(driverFare)
                      ).toFixed(2)}
                    </span>
                  </p>
                )}

                <div className="mb-3">
                  <p>
                    <strong>Pickup Location:</strong>{" "}
                    {submittedData.pickupLocation}
                  </p>
                  <p>
                    <strong>Drop Location:</strong> {submittedData.dropLocation}
                  </p>
                  <p>
                    <strong>Pickup Date:</strong> {submittedData.pickupDate}
                  </p>
                  <p>
                    <strong>Pickup Time:</strong> {submittedData.pickupTime}
                  </p>
                  {isRoundTrip && (
                    <>
                      <p>
                        <strong>Return Date:</strong> {submittedData.returnDate}
                      </p>
                      <p>
                        <strong>Return Time:</strong> {submittedData.returnTime}
                      </p>
                    </>
                  )}
                  <p>
                    <strong>Car Type:</strong>{" "}
                    {submittedData.selectedCar
                      ? submittedData.selectedCar.label
                      : "Not selected"}
                  </p>
                  {distance && !isNaN(distance) && (
                    <p>
                      <strong>Distance:</strong> {distance} km
                    </p>
                  )}
                </div>

                <div className="mb-3">
                  <p>
                    <strong>Per km:</strong> Rs {rate}
                  </p>
                  <p>
                    <strong>Driver Fare:</strong> Rs {driverFare}
                  </p>
                </div>

                <button
                  className="btn btn-primary"
                  onClick={() => handleConfirmBooking(submittedData)}
                >
                  Confirm Booking
                </button>
              </div>

              <div className="image-container">
                <img
                  src={carImage}
                  alt="Car"
                  className="img-fluid"
                  style={{ maxWidth: "300px" }}
                />
              </div>
            </div>
          ) : (
            <>
              <h4
                className="mb-4 fw-bold text-center"
                style={{ color: "#ffb300", letterSpacing: "2px" }}
              >
                BOOK A TAXI
              </h4>
              <div className="d-flex mb-3">
                <div className="form-check form-check-inline">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={!isRoundTrip}
                    onChange={() => {
                      setIsRoundTrip(false);
                      formik.setFieldValue("returnDate", "");
                      formik.setFieldValue("returnTime", "");
                    }}
                    id="oneWay"
                  />
                  <label className="form-check-label ms-2" htmlFor="oneWay">
                    One Drop
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={isRoundTrip}
                    onChange={() => setIsRoundTrip(true)}
                    id="roundTrip"
                  />
                  <label className="form-check-label" htmlFor="roundTrip">
                    Round Trip
                  </label>
                </div>
              </div>

              <form onSubmit={formik.handleSubmit}>
                <div className="form-group row">
                  <div className="col-md-6">
                    <label>Full Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ex: Surya"
                      {...formik.getFieldProps("fullName")}
                    />
                    {formik.touched.fullName && formik.errors.fullName && (
                      <div className="text-danger">
                        {formik.errors.fullName}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label>Phone:</label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="9876543210"
                      {...formik.getFieldProps("phone")}
                    />
                    {formik.touched.phone && formik.errors.phone && (
                      <div className="text-danger">{formik.errors.phone}</div>
                    )}
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-md-6">
                    <label>Pickup Location:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Pickup Location"
                      value={formik.values.pickupLocation}
                      onChange={handlePickupInputChange}
                    />
                    {pickupSuggestions.length > 0 ? (
                      <ul className="suggestion-list" aria-live="polite">
                        {pickupSuggestions.map((suggestion) => (
                          <li
                            key={suggestion.place_id}
                            onClick={() => {
                              handlePickupChange(suggestion.display_name);
                              fetchCoordinates(suggestion.display_name, true);
                            }}
                            className="suggestion-item"
                          >
                            <FaMapMarkerAlt
                              style={{ marginRight: "10px", color: "#ffb300" }}
                            />
                            {suggestion.display_name}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      pickupInputError && (
                        <div className="text-danger">
                          No suggestions available for this location.
                        </div>
                      )
                    )}
                    {formik.touched.pickupLocation &&
                      formik.errors.pickupLocation && (
                        <div className="text-danger">
                          {formik.errors.pickupLocation}
                        </div>
                      )}
                  </div>

                  <div className="col-md-6">
                    <label>Drop Location:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Drop Off Location"
                      value={formik.values.dropLocation}
                      onChange={handleDropInputChange}
                    />
                    {dropSuggestions.length > 0 ? (
                      <ul className="suggestion-list" aria-live="polite">
                        {dropSuggestions.map((suggestion) => (
                          <li
                            key={suggestion.place_id}
                            onClick={() => {
                              handleDropChange(suggestion.display_name);
                              fetchCoordinates(suggestion.display_name, false);
                            }}
                            className="suggestion-item"
                          >
                            <FaMapMarkerAlt
                              style={{ marginRight: "10px", color: "#ffb300" }}
                            />
                            {suggestion.display_name}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      dropInputError && (
                        <div className="text-danger">
                          No suggestions available for this location.
                        </div>
                      )
                    )}
                    {formik.touched.dropLocation &&
                      formik.errors.dropLocation && (
                        <div className="text-danger">
                          {formik.errors.dropLocation}
                        </div>
                      )}
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-md-6">
                    <label>Pickup Date:</label>
                    <input
                      type="date"
                      className="form-control"
                      {...formik.getFieldProps("pickupDate")}
                    />
                    {formik.touched.pickupDate && formik.errors.pickupDate && (
                      <div className="text-danger">
                        {formik.errors.pickupDate}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <CustomSelect
                      options={generateTimeOptions()}
                      value={formik.values.pickupTime}
                      onChange={(value) =>
                        formik.setFieldValue("pickupTime", value)
                      }
                      label="Pickup Time"
                    />
                    {formik.touched.pickupTime && formik.errors.pickupTime && (
                      <div className="text-danger">
                        {formik.errors.pickupTime}
                      </div>
                    )}
                  </div>
                </div>

                {isRoundTrip && (
                  <div className="form-group row">
                    <div className="col-md-6">
                      <label>Return Date:</label>
                      <input
                        type="date"
                        className="form-control"
                        {...formik.getFieldProps("returnDate")}
                      />
                      {formik.touched.returnDate &&
                        formik.errors.returnDate && (
                          <div className="text-danger">
                            {formik.errors.returnDate}
                          </div>
                        )}
                    </div>
                    <div className="col-md-6">
                      <CustomSelect
                        options={generateTimeOptions()}
                        value={formik.values.returnTime}
                        onChange={(value) =>
                          formik.setFieldValue("returnTime", value)
                        }
                        label="Return Time"
                      />
                      {formik.touched.returnTime &&
                        formik.errors.returnTime && (
                          <div className="text-danger">
                            {formik.errors.returnTime}
                          </div>
                        )}
                    </div>
                  </div>
                )}

                <div className="form-group row">
                  <div className="col-md-6">
                    <CustomSelectForChooseCar
                      options={
                        isRoundTrip
                          ? roundTripCars.map((car) => ({
                              label: `${car.carname} - ${car.acType} - ${car.rate}/km`,
                              value: car.carname,
                            }))
                          : oneWayCars.map((car) => ({
                              label: `${car.carname} - ${car.acType} - ${car.rate}/km`,
                              value: car.carname,
                            }))
                      }
                      value={
                        formik.values.selectedCar || {
                          label: "Select a car",
                          value: "",
                        }
                      } // Provide a default value
                      onChange={(selectedOption) => {
                        console.log("Selected car:", selectedOption);
                        formik.setFieldValue("selectedCar", selectedOption); // Pass the entire option object
                      }}
                      label="Choose a car"
                    />

                    {formik.touched.selectedCar &&
                      formik.errors.selectedCar && (
                        <div className="text-danger">
                          {formik.errors.selectedCar.value ||
                            formik.errors.selectedCar.label}
                        </div>
                      )}
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">
                  Get Estimate
                </button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default BookingForm;
