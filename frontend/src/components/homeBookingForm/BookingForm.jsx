import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./BookingForm.css";
import CustomSelect from "./CustomSelect";
import { FaMapMarkerAlt } from "react-icons/fa";

const BookingForm = () => {
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropSuggestions, setDropSuggestions] = useState([]);
  const [distance, setDistance] = useState(null);
  const [pickupCoords, setPickupCoords] = useState({});
  const [dropCoords, setDropCoords] = useState({});
  const carTypes = ["Sedan", "SUV", "Van"];

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
      selectedCar: "",
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
      selectedCar: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setSubmittedData(values);

      resetForm();
      calculateDistance(pickupCoords, dropCoords);
    },
  });

  const fetchLocationSuggestions = async (query, isPickup) => {
    if (!query) {
      if (isPickup) setPickupSuggestions([]);
      else setDropSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=5`
      );
      const suggestions = response.data;
      if (isPickup) {
        setPickupSuggestions(suggestions);
      } else {
        setDropSuggestions(suggestions);
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

      const R = 6371; // Radius of the Earth in kilometers
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

      setDistance(`${distanceInKm.toFixed(2)} km`);
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
      Return Date: ${data.returnDate}
      Return Time: ${data.returnTime}
      `
          : ""
      }
      Car Type: ${data.selectedCar}
    `);
    window.location.reload();

    // Send notification to Telegram
    // const message = `
    //   New Booking Confirmed!
    //   Full Name: ${data.fullName}
    //   Phone: ${data.phone}
    //   Pickup Location: ${data.pickupLocation}
    //   Drop Location: ${data.dropLocation}
    //   Pickup Date: ${data.pickupDate}
    //   Pickup Time: ${data.pickupTime}
    //   ${
    //     isRoundTrip
    //       ? `
    //   Return Date: ${data.returnDate}
    //   Return Time: ${data.returnTime}
    //   `
    //       : ""
    //   }
    //   Car Type: ${data.selectedCar}
    // `;

    // const token = "<YourBOTToken>";
    // const chatId = "<YourChatID>";

    // try {
    //   await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
    //     chat_id: chatId,
    //     text: message,
    //   });
    //   console.log("Notification sent to Telegram");
    // } catch (error) {
    //   console.error("Error sending notification:", error);
    // }
  };

  return (
    <section className="container">
      <div className="home-booking-form-container">
        <div className="home-booking-left-container">
          <h3 className="home-booking-left-container-title">Book Your Ride</h3>
        </div>
        <div className="home-booking-right-container">
          {submittedData ? (
            <div className="summary">
              <h4>Booking Summary</h4>
              <p>
                <strong>Full Name:</strong> {submittedData.fullName}
              </p>
              <p>
                <strong>Phone:</strong> {submittedData.phone}
              </p>
              <p>
                <strong>Pickup Location:</strong> {submittedData.pickupLocation}
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
                <strong>Car Type:</strong> {submittedData.selectedCar}
              </p>
              {distance && (
                <p>
                  <strong>Distance:</strong> {distance}
                </p>
              )}
              <button
                className="btn btn-primary"
                onClick={() => handleConfirmBooking(submittedData)}
              >
                Confirm Booking
              </button>
            </div>
          ) : (
            <>
              <h4
                className="mb-4 fw-bold"
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
                    {pickupSuggestions.length > 0 && (
                      <ul className="suggestion-list">
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
                    {dropSuggestions.length > 0 && (
                      <ul className="suggestion-list">
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
                    <CustomSelect
                      options={carTypes}
                      value={formik.values.selectedCar}
                      onChange={(value) =>
                        formik.setFieldValue("selectedCar", value)
                      }
                      label="Choose a car"
                    />
                    {formik.touched.selectedCar &&
                      formik.errors.selectedCar && (
                        <div className="text-danger">
                          {formik.errors.selectedCar}
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
      </div>
    </section>
  );
};

export default BookingForm;
