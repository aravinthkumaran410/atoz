import React, { useState, Fragment } from "react";
import { TextField, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FormLabel } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Loader from "../../../Common/Layout/Loader/Loader";
import client from "../../../Common/Client/Client";

const Oneway = () => {
    const [carname, setCarName] = useState("");
    const [rate, setRate] = useState("");
    const [driverfare, setDriveFare] = useState("");
    const [additionalcharge, setAdditionalCharge] = useState("");
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [error, setError] = useState({
      carname: "",
      rate: "",
      driverfare: "",
      additionalcharge: "",
      image: "",
    });
  
    const errorMessage = (fieldName, fieldValue) => {
      let message;
      if (fieldName) {
        if (fieldValue === "") {
          message = "";
        }
      }
  
      if (fieldName === "carname") {
        if (fieldValue.length < 3) {
          message = `Car Name is Invalid`;
        } else {
          message = "";
        }
      }
      if (fieldName === "rate") {
          if (fieldValue.length === 0) {
            message = `Rate  is Invalid`;
          } else {
            message = "";
          }
        }
      if (fieldName === "driverfare") {
        if (fieldValue.length < 1) {
          message = `Driver fare is Invalid`;
        } else {
          message = "";
        }
      }
  
      if (fieldName === "additionalcharge") {
        if (fieldValue.length < 1) {
          message = `Additional Charge fare is Invalid`;
        } else {
          message = "";
        }
      }
      return { message: message };
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      const err = errorMessage(name, value).message;
  
      setError((prevError) => ({
        ...prevError,
        [name]: err,
      }));
  
      if (name === "carname") {
        setCarName(value);
      } else if (name === "rate") {
        setRate(value);
      } else if (name === "driverfare") {
        setDriveFare(value);
      } else {
        setAdditionalCharge(value);
      }
    };
  
    const handleBlur = (e) => {
      const { name, value } = e.target;
      if (value === "") {
        setError((prevError) => ({
          ...prevError,
          [name]: `${name} is required`,
        }));
      }
    };
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const fileType = file.type;
        const fileSize = file.size / 1024 / 1024;
  
        if (!fileType.startsWith("image/")) {
          setImage(null);
          setError((pre) => {
            return { ...pre, image: "Please select an valid image file." };
          });
        } else if (fileSize > 3) {
          setImage(null);
          setError((pre) => {
            return { ...pre, image: "File size exceeds 3 MB." };
          });
        } else {
          setImage(file);
  
        
        }
      }
    };
  
    const handleSubmit = () => {
      toast.dismiss();
      if (
        carname === "" ||
        rate === "" ||
        driverfare === "" ||
        additionalcharge === ""
      ) {
        toast.error("All fields are required.");
      }else if (image === null ){
  
          toast.error("Please select an image.");
      } else if (error.carname !== "") {
        
        toast.error(error.carname);
      } else if (error.rate !== "") {
          console.log("hii")
  
        toast.error(error.rate);
      } else if (error.image !== "") {
        toast.error(error.image);
      } else if (error.driverfare !== "") {
        toast.error(error.driverfare);
      } else if (error.additionalcharge !== "") {
        toast.error(error.additionalcharge);
      } else {
        setLoading(true);
        sendData();
      }
    };
  
    const sendData = async () => {
      try {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("carname", carname);
        formData.append("rate", rate);
        formData.append("additionalcharge", additionalcharge);
        formData.append("driverfare", driverfare);
  
        const response = await client.post("/onewaytrip/addoneway", formData, {
          withCredentials: true,
        });
        if (response.status === 200) {
          toast.success("One way Trip Added Successfully");
          setCarName("");
          setAdditionalCharge("");
          setDriveFare("");
          setRate("");
          setImage(null);
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
        if (err.response && err.response.status === 401) {
          toast.error("Login again");
        } else {
          toast.error("Failed to add quotes details");
        }
      }
    };
  
  return (
    <Fragment>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Dashboard</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active">One Way Trip </li>
            </ol>
          </nav>
        </div>
      </main>
      <section
        className="section dashboard"
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <div className="card" style={{ width: "100%" }}>
          <div
            className="card-body"
            style={{
              padding: "20px",
            }}
          >
            <h5
              className="card-title"
              style={{ textAlign: "center", marginBottom: "20px" }}
            >
              Add One way Trip Details
            </h5>
            <form>
              <Box sx={{ marginBottom: "20px" }}>
                <TextField
                  label="Car Name"
                  slotProps={{
                    htmlInput: {
                      maxLength: 30,
                    },
                  }}
                  fullWidth
                  variant="outlined"
                  required
                  name="carname"
                  value={carname}
                  onChange={handleChange}
                  error={!!error.carname}
                  helperText={error.carname}
                  onBlur={handleBlur}
                  onKeyDown={(e) => {
                    const allowedKeys = [
                      "Backspace",
                      "ArrowLeft",
                      "ArrowRight",
                      "Delete",
                      "Tab",
                      " ",
                    ];
                    const allowedCharPattern = /^[A-Za-z.,_-]$/;
                    if (carname.length === 0 && e.key === " ") {
                      e.preventDefault();
                      return;
                    }

                    if (
                      !allowedKeys.includes(e.key) &&
                      !allowedCharPattern.test(e.key)
                    ) {
                      e.preventDefault();
                    }
                  }}
                />
              </Box>

              <Box sx={{ marginBottom: "20px" }}>
                <TextField
                  label="Rate/KM"
                  required
                  name="rate"
                  slotProps={{
                    htmlInput: {
                      maxLength: 4,
                    },
                  }}
                  onKeyDown={(e) => {
                    const allowedKeys = [
                        "Backspace",
                        "ArrowLeft",
                        "ArrowRight",
                        "Delete",
                        "Tab",
                        " ",
                      ];
                      const allowedCharPattern = /^[0-9-]$/;

                    if (rate.length === 0 && e.key === " ") {
                      e.preventDefault();
                      return;
                    }

                    if (
                        !allowedKeys.includes(e.key) &&
                        !allowedCharPattern.test(e.key)
                      ) {
                        e.preventDefault();
                      }
                  }}
                  fullWidth
                  variant="outlined"
                  value={rate}
                  onChange={handleChange}
                  error={!!error.rate}
                  helperText={error.rate}
                  onBlur={handleBlur}
                />
              </Box>
              <Box sx={{ marginBottom: "20px" }}>
                <TextField
                required
                  label="Driver Fare"
                  name="driverfare"
                  slotProps={{
                    htmlInput: {
                      maxLength: 4,
                    },
                  }}
                  onKeyDown={(e) => {
                    const allowedKeys = [
                        "Backspace",
                        "ArrowLeft",
                        "ArrowRight",
                        "Delete",
                        "Tab",
                        " ",
                      ];
                      const allowedCharPattern = /^[0-9-]$/;

                    if (driverfare.length === 0 && e.key === " ") {
                      e.preventDefault();
                      return;
                    }

                    if (
                        !allowedKeys.includes(e.key) &&
                        !allowedCharPattern.test(e.key)
                      ) {
                        e.preventDefault();
                      }
                  }}
                  fullWidth
                  variant="outlined"
                  value={driverfare}
                  onChange={handleChange}
                  error={!!error.driverfare}
                  helperText={error.driverfare}
                  onBlur={handleBlur}
                />
              </Box>
              <Box sx={{ marginBottom: "20px" }}>
                <TextField
                required
                  label="Additional Charge"
                  name="additionalcharge"
                  slotProps={{
                    htmlInput: {
                      maxLength: 200,
                    },
                  }}
                  onKeyDown={(e) => {
                    if (additionalcharge.length === 0 && e.key === " ") {
                      e.preventDefault();
                      return;
                    }
                  }}
                  fullWidth
                  variant="outlined"
                  value={additionalcharge}
                  onChange={handleChange}
                  error={!!error.additionalcharge}
                  helperText={error.additionalcharge}
                  onBlur={handleBlur}
                />
              </Box>

              <Box
                sx={{
                  marginBottom: "20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <FormLabel
                  sx={{
                    marginBottom: "20px",
                  }}
                >
                  <span>Car Image(choose one Image)*</span>
                </FormLabel>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    name="image"
                    hidden
                    onChange={handleImageChange}
                  />
                </Button>
                {image && <p>{image.name}</p>}
                {error.image && (
                  <p style={{ color: "red", textAlign: "center" }}>
                    {error.image}
                  </p>
                )}
              </Box>

              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Box>
            </form>
          </div>
        </div>
      </section>
      {loading && <Loader />}
    </Fragment>
  );
};

export default Oneway;
