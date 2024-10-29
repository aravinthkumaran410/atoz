import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popconfirm } from "antd";
import { Button, styled, TextField, Box } from "@mui/material";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import toast from "react-hot-toast";
import client from "../../../../Common/Client/Client";
import { Modal, Form, FormLabel } from "react-bootstrap";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Loader from "../../../../Common/Layout/Loader/Loader";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ManageOneWay = () => {
  const navigate = useNavigate();
  const [oneWayTrip, setOneWayTrip] = useState([]);
  const [open, setOpen] = useState(false);
  const [carname, setCarName] = useState("");
  const [rate, setRate] = useState("");
  const [driverfare, setDriveFare] = useState("");
  const [additionalcharge, setAdditionalCharge] = useState([]);
  const [passenger, setPassenger] = useState("");
  const [acType, setAcType] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAddImage, setShowAddImage] = useState(0);
  const [showImage, setShowImage] = useState(null);
  const [image, setImage] = useState(null);
  const [error, setError] = useState({
    carname: "",
    rate: "",
    driverfare: "",
      passenger:"",
      acType:"",
    image: "",
  });
  const [id, setId] = useState("");
  useEffect(() => {
    getOneWayTrip();
  }, []);

  const getOneWayTrip = async () => {
    try {
      const response = await client.get("/onewaytrip/get-one-way-trip");
      if (response.status === 200) {
        setOneWayTrip(response.data);
      }
    } catch (err) {
      console.log(err);
      toast.error("Falied to Fetch the One Way Trip ");
    }
  };

  //delete
  const cancel = (e) => {
    toast.error("You Cancle delete");
  };

  const handleDelete = async (id) => {
    try {
      const response = await client.post(
        "/onewaytrip/delete-oneway-trip",
        {
          id: id,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        getOneWayTrip();
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        toast.error("Login again");
      } else {
        toast.error("Failed to delete One Way Trip details");
      }
    }
  };

  //update
  const handleUpdate = async (id, value) => {
    setId(id);
    setOpen(true);
    setCarName(value.carname);
    setImage(value.image);
    setRate(value.oneWayRate);
   
    setDriveFare(value.driverfare);
    const additionalChargeValue = value.additionalcharge.map((value) => ({
      value: value,
      error: "",
    }));
    setAdditionalCharge(additionalChargeValue);
    setPassenger(value.passenger);
    setAcType(value.acType);
  };

  //Change and blur

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

    if (fieldName === "passenger") {
      if (fieldValue.length === 0) {
        message = `Passenger is Invalid`;
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
      setPassenger(value);
    }
  };

  const handleRadioChange = (e) => {
    setAcType(e.target.value);
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

  //Addition charge field
  const handleAdditionChange = (index, e) => {
    toast.dismiss();
    const { value } = e.target;
    const newAaddditionalCharge = [...additionalcharge];
    newAaddditionalCharge[index].value = value;

    if (value.length < 3) {
      newAaddditionalCharge[index].error = "Additional charge is invalid";
    } else {
      newAaddditionalCharge[index].error = "";
    }

    setAdditionalCharge(newAaddditionalCharge);
  };

  // Handle additional field blur (to show errors when losing focus)
  const handleAdditionalBlur = (index, e) => {
    const { value } = e.target;
    const newAaddditionalCharge = [...additionalcharge];
    if (value === "") {
      newAaddditionalCharge[index].error =
        "Additional charge content is required.";
    }
    setAdditionalCharge(newAaddditionalCharge);
  };

  //Add Additional field
  const addAdditionalField = () => {
    toast.dismiss();
    if (additionalcharge.length >= 5) {
      toast.error("Maximum of 5 About fields can be added.");
      return;
    }

    const lastField = additionalcharge[additionalcharge.length - 1];
    if (lastField.value === "") {
      toast.error("Complete the current field.");
    } else if (lastField.error) {
      toast.error("Fix the error in about field");
    } else {
      setAdditionalCharge([...additionalcharge, { value: "", error: "" }]);
    }
  };

  // Delete additional content field
  const deleteAdditionalField = (index) => {
    toast.dismiss();
    if (additionalcharge.length <= 1) {
      toast.error("At least one Additionalcharge field must remain.");
      return;
    }

    const newAdditionalcharge = [...additionalcharge];
    newAdditionalcharge.splice(index, 1);
    setAdditionalCharge(newAdditionalcharge);
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
        var reader = new FileReader();
        reader.onload = function () {
          setImage(file);
          setShowImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  //send update data one way

  const updateDataOneWay = () => {
    toast.dismiss();
    if (
      carname === "" ||
      rate === "" ||
      driverfare === "" ||
      passenger === ""
    ) {
      toast.error("All fields are required.");
    } else if (acType === "") {
     
      toast.error("Please select an Ac Type.");
    } else if (additionalcharge.some((value, index) => value.value === "")) {
      toast.error("Additional charge fields are required.");
    } else if (image === null) {
      
      toast.error("Please select an image.");
    } else if (error.carname !== "") {
      toast.error(error.carname);
    } else if (error.passenger !== "") {
      toast.error(error.passenger);
    } else if (error.rate !== "") {
      toast.error(error.rate);
    } else if (error.image !== "") {
      toast.error(error.image);
    } else if (error.driverfare !== "") {
      toast.error(error.driverfare);
    }  else if (additionalcharge.some((value, index) => value.error !== "")) {
      toast.error("check the error in Additional charge .");
    } else {
      setLoading(true);
      sendData();
    }
  };

  const sendData = async () => {
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("image", image);
      formData.append("carname", carname);
      formData.append("rate", rate);
      formData.append("passenger", passenger);
      formData.append("acType", acType);
      additionalcharge.forEach((field, index) => {
        formData.append("additionalcharge", field.value);
      });
      formData.append("driverfare", driverfare);

      const response = await client.post(
        "/onewaytrip/update-oneway-trip",
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success("One way Trip update Successfully");

        setOpen(false);
        setLoading(false);
        setRate("");
        setId("");

        setDriveFare("");
        setImage(null);
        setShowAddImage(0);
        setShowImage(null);
        setCarName("");
        setError((pre) => {
          return {
            ...pre,
            carname: "",
            rate: "",
            driverfare: "",
            passenger: "",
            acType: "",
            image: "",
          };
        });
        setAdditionalCharge([
          {
            value: "",
            error: "",
          },
        ]);
        setPassenger("");
        setAcType("");
        getOneWayTrip();
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
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Dashboard</h1>
        <nav
          style={{
            marginTop: "10px",
          }}
        >
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active">Manage/One Way Trip</li>
          </ol>
        </nav>
      </div>

      <div
        style={{
          padding: "20px",
          background: "white",
          boxShadow: "0 0 10px lightgray",
        }}
      >
        <h3>Manage One Way Trip</h3>
        <div className="table-responsive">
          {oneWayTrip.length > 0 ? (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr
                  style={{
                    borderBottom: "2px solid #ddd",
                    textAlign: "center",
                  }}
                >
                  <th style={{ padding: "8px" }}>Image</th>
                  <th style={{ padding: "8px" }}>Car Name</th>
                  <th style={{ padding: "8px" }}>Rate/KM</th>
                  <th style={{ padding: "8px" }}>Passenger</th>
                  <th style={{ padding: "8px" }}>Ac Type</th>

                  <th style={{ padding: "8px" }}>Driver Fare</th>
                  <th style={{ padding: "8px", width: "20%" }}>
                    Additional charge
                  </th>
                  <th style={{ padding: "8px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {oneWayTrip.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={item.image}
                        alt={item.carname}
                        style={{ width: "100px", height: "100px" }}
                      />
                    </td>
                    <td>{item.carname}</td>
                    <td>{item.oneWayRate}</td>
                    <td>{item.passenger}</td>
                    <td>{item.acType}</td>
                    <td>{item.driverfare}</td>
                    <td>
                      {item.additionalcharge.map((value, index) => {
                        return (
                          <p>
                            {index + 1}) {value}
                          </p>
                        );
                      })}
                    </td>
                    <td style={{ padding: "8px" }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleUpdate(item._id, item)}
                        className="table-button button-table"
                        style={{
                          marginRight: "5px",
                          marginBottom: "5px",
                        }}
                      >
                        Update
                      </Button>
                      <Popconfirm
                        title="Delete the One Way Trip Details"
                        description="Are you sure to delete this One Way Trip Details?"
                        onConfirm={() => handleDelete(item._id)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                        className="table-button"
                      >
                        <Button
                          variant="contained"
                          color="error"
                          className="table-button"
                          style={{
                            marginBottom: "5px",
                          }}
                        >
                          Delete
                        </Button>
                      </Popconfirm>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px",
                border: "1px solid #ddd",
                borderRadius: "12px",
                backgroundColor: "#f9f9f9",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                maxWidth: "300px",
                margin: "20px auto",
                textAlign: "center",
              }}
            >
              <span className="mb-2"   style={{
                    marginBottom: "12px",
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "#555",
                  }}>
                No One Way Trip Available
              </span>

              <Button
                color="success"
                variant="contained"
                style={{
                  padding: "8px 16px",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  boxShadow: "0 3px 6px rgba(0, 123, 255, 0.2)",
                }}
                onClick={() => {
                  navigate("/trip/oneway");
                }}
              >
                Add One Way Trip
              </Button>
            </div>
          )}
        </div>
      </div>
      <div>
        <Modal
          show={open}
          onHide={() => {
            setOpen(false);
            setLoading(false);
            setRate("");
            setId("");
            setAdditionalCharge([
            ]);
            setPassenger("");
            setAcType("");
            setDriveFare("");
            setImage(null);
            setShowAddImage(0);
            setShowImage(null);
            setCarName("");
            setError((pre) => {
              return {
                ...pre,
                carname: "",
                rate: "",
                driverfare: "",
                passenger:"",
                acType:"",
                image: "",
              };
            });
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Update One Day Trip Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <div className="mt-2">
                  <div>
                    <FormLabel>
                      <span>Car Name</span>
                    </FormLabel>
                  </div>
                  <div className="mt-1 p-3">
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
                  </div>
                </div>
              </Form.Group>
              <Form.Group>
                {" "}
                <div className="mt-2">
                  <div>
                    <FormLabel>
                      <span>Rate/KM</span>
                    </FormLabel>
                  </div>
                  <div className="mt-1 p-3">
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
                  </div>
                </div>
              </Form.Group>

              <Form.Group>
                <div className="mt-2">
                  <div>
                    <FormLabel>
                      <span>Driver Fare</span>
                    </FormLabel>
                  </div>
                  <div className="mt-1 p-3">
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
                  </div>
                </div>
              </Form.Group>
              <Form.Group>
              <div className="mt-2">
                  <div>
                    <FormLabel>
                      <span>Passenger</span>
                    </FormLabel>
                  </div>
                  <div className="mt-1 p-3">
                  <TextField
                    label="Passenger"
                    required
                    name="passenger"
                    slotProps={{
                      htmlInput: {
                        maxLength: 2,
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

                      if (passenger.length === 0 && e.key === " ") {
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
                    value={passenger}
                    onChange={handleChange}
                    error={!!error.passenger}
                    helperText={error.passenger}
                    onBlur={handleBlur}
                  />
                </div>
                </div>
              </Form.Group>
              <Form.Group>
                <Box sx={{ marginBottom: "20px" }}>
                  <FormControl
                    component="fieldset"
                    style={{
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <div className="mt-2">
                        <FormLabel component="legend">Select Option*</FormLabel>
                      </div>
                      <div>
                        <RadioGroup
                          row
                          aria-label="ac-option"
                          name="ac-option-group"
                          value={acType}
                          onChange={handleRadioChange}
                        >
                          <FormControlLabel
                            value="AC"
                            control={<Radio />}
                            label="AC"
                          />
                          <FormControlLabel
                            value="Non-AC"
                            control={<Radio />}
                            label="Non-AC"
                          />
                        </RadioGroup>
                      </div>
                    </div>
                  </FormControl>
                </Box>
              </Form.Group>
              <Form.Group>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <h5 style={{ textAlign: "center" }}>Additional charge* </h5>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="success"
                      onClick={addAdditionalField}
                    >
                      Add
                    </Button>
                  </Box>
                </div>

                {additionalcharge.map((field, index) => (
                  <Box
                    key={index}
                    sx={{
                      marginBottom: "20px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      label={`Additional charge  ${index + 1}`}
                      fullWidth
                      variant="outlined"
                      slotProps={{
                        htmlInput: {
                          maxLength: 25,
                        },
                      }}
                      multiline
                      value={field.value}
                      onChange={(e) => handleAdditionChange(index, e)}
                      onBlur={(e) => handleAdditionalBlur(index, e)}
                      error={!!field.error}
                      helperText={field.error}
                      onKeyDown={(e) => {
                        if (field.value.length === 0 && e.key === " ") {
                          e.preventDefault();
                          return;
                        }
                      }}
                    />
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => deleteAdditionalField(index)}
                      disabled={additionalcharge.length <= 1}
                      sx={{ marginLeft: "10px" }}
                    >
                      Delete
                    </Button>
                  </Box>
                ))}
              </Form.Group>

              <Form.Group>
                <div className="mb-2" style={{ width: "100%" }}>
                  <div>
                    <p>Image</p>
                  </div>
                  <div style={{ marginTop: "20px" }}>
                    {showAddImage === 1 ? (
                      <>
                        <Button
                          component="label"
                          role={undefined}
                          variant="contained"
                          tabIndex={-1}
                          startIcon={<CloudUploadIcon />}
                          style={{ marginTop: "10px" }}
                          disabled={image !== null}
                        >
                          change Image
                          <VisuallyHiddenInput
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            onClick={(e) => {
                              e.target.value = null;
                            }}
                          />
                        </Button>
                        <div>
                          {showImage === null ? (
                            <></>
                          ) : (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-evenly",
                                alignItems: "center",
                                marginTop: "10px",
                              }}
                            >
                              <img
                                src={showImage}
                                alt=""
                                width="100px"
                                height="100px"
                              />
                              <Button
                                color="error"
                                variant="contained"
                                onClick={() => {
                                  setShowImage(null);
                                  setImage(null);
                                  setShowAddImage(1);
                                }}
                              >
                                Delete
                              </Button>
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="image-delete-button">
                        <img src={image} alt=" " width="100px" height="100px" />
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => {
                            setShowAddImage(1);
                            setImage(null);
                            setShowImage(null);
                          }}
                          style={{
                            marginLeft: "10px",
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                    {error.image && (
                      <div
                        style={{
                          color: "red",
                          marginLeft: "20px",
                          fontSize: "13px",
                        }}
                      >
                        {error.image}
                      </div>
                    )}
                  </div>
                </div>
              </Form.Group>
              <Modal.Footer>
                <Button
                  variant="contained"
                  color="error"
                  style={{
                    marginRight: "10px",
                  }}
                  onClick={() => {
                    setOpen(false);
                    setLoading(false);
                    setRate("");
                    setId("");
                    setAdditionalCharge([]);
                    setPassenger("");
                    setAcType("");
                    setDriveFare("");
                    setImage(null);
                    setShowAddImage(0);
                    setShowImage(null);
                    setCarName("");
                    setError((pre) => {
                      return {
                        ...pre,
                        carname: "",
                        rate: "",
                        driverfare: "",
                        passenger:"",
                        acType:"",
                        image: "",
                      };
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={updateDataOneWay}
                  color="success"
                >
                  Save changes
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
          {loading && <Loader />}
        </Modal>
      </div>
    </main>
  );
};

export default ManageOneWay;
