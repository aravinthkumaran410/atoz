import React, { Fragment, useEffect, useState } from "react";
import client from "../../../Common/Client/Client";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Popconfirm } from "antd";
import { Button, styled, TextField, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

import { Modal, Form, FormLabel } from "react-bootstrap";

const ManageStatePermit = () => {
  const [statePermit, setStatePermit] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [endlocation, setEndLocation] = useState("");
  const [vehicleRates, setVehicleRates] = useState([]);
  const [error, setError] = useState({
    startLocation: "",
    endlocation: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    getStatePermit();
  }, []);

  const getStatePermit = async () => {
    try {
      const response = await client.get("/statepermit/get-state-permit");
      if (response.status === 200) {
        setStatePermit(response.data);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to Fetch the State permit Data");
    }
  };

  //cancel

  const handleCancleUpdate=()=>{
    setOpen(false);
    setId("");
    setStartLocation("");
    setEndLocation("");
    setError({startLocation:"",endlocation:""});
    setVehicleRates([])
  }

  //delete
  const cancel = (e) => {
    toast.error("You Cancle delete");
  };

  const handleDelete = async (id) => {
    toast.dismiss();
    try {
      const response = await client.post(
        "/statepermit/delete-state-permit",
        {
          id: id,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        getStatePermit();
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        toast.error("Login again");
      } else {
        toast.error("Failed to delete the state permit details");
      }
    }
  };

  // update

  const handleUpdate = (id,value) => {
    setId(id);
    setOpen(true);
    setStartLocation(value.startLocation);
    setEndLocation(value.endLocation);
    const vehicleRatesDetails = value.vehicleDetails.map((value) => ({
      type: value.type,
      rate: value.rate,
       vehicleTypeError: "", vehicleRateError: ""
    }));

    setVehicleRates(vehicleRatesDetails)
  };


  //change

    //CHANGE
    const errorMessage = (fieldName, fieldValue) => {
      let message;
      if (fieldName) {
        if (fieldValue === "") {
          message = "";
        }
      }
  
      if (fieldName === "startLocation") {
        if (fieldValue.length > 0 && fieldValue.length < 3) {
          message = "Start Location must be at least 3 characters long";
        } else {
          message = "";
        }
      }
  
      if (fieldName === "endlocation") {
        if (fieldValue.length > 0 && fieldValue.length < 3) {
          message = "End Location must be at least 3 characters long";
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
  
      if (name === "startLocation") {
        setStartLocation(value);
      } else {
        setEndLocation(value);
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
  
    const addVehicleRate = () => {
      toast.dismiss()
      const hasError = vehicleRates.some(rate => 
          rate.type === "" || rate.rate === "" || rate.vehicleTypeError || rate.vehicleRateError
        );
    
        if (hasError) {
          toast.error("Please fill in all fields correctly before adding a new vehicle rate.");
          return; 
        }
    
        setVehicleRates((prev) => [
          ...prev,
          { type: "", rate: "", vehicleTypeError: "", vehicleRateError: "" },
        ]);
    };
  
   
  const handleVehicleTypeChange = (index, value) => {
      const newVehicleRates = [...vehicleRates];
      newVehicleRates[index].type = value;
    
      console.log(newVehicleRates[index].vehicleTypeError)
      if (value.length < 3) {
        newVehicleRates[index].vehicleTypeError = "Vehicle Type must be at least 3 characters.";
      } else {
        newVehicleRates[index].vehicleTypeError = "";
      }
    
      setVehicleRates(newVehicleRates);
    };
    
    const handleVehicleTypeBlur = (index) => {
      const newVehicleRates = [...vehicleRates];
      if (newVehicleRates[index].type.trim() === "") {
        newVehicleRates[index].vehicleTypeError = "Vehicle Type is required.";
      } else if (newVehicleRates[index].type.length < 3) {
        newVehicleRates[index].vehicleTypeError = "Vehicle Type must be at least 3 characters.";
      }
      setVehicleRates(newVehicleRates);
    };
    
   
    const handleVehicleRateChange = (index, value) => {
      const newVehicleRates = [...vehicleRates];
      newVehicleRates[index].rate = value;
    
     console.log(newVehicleRates.vehicleRateError)
      if (value.length < 1) {
        newVehicleRates[index].vehicleRateError = "Vehicle Rate is required.";
      }  else {
        newVehicleRates[index].vehicleRateError = ""; 
      }
    
      setVehicleRates(newVehicleRates);
    };
    const handleVehicleRateBlur = (index) => {
      const newVehicleRates = [...vehicleRates];
      if (newVehicleRates[index].rate.trim() === "") {
        newVehicleRates[index].vehicleRateError = "Vehicle Rate is required.";
      } else if (newVehicleRates[index].rate.length < 1) {
        newVehicleRates[index].vehicleRateError = "Vehicle Rate must be at least 1 character.";
      }
      setVehicleRates(newVehicleRates);
    };


    const deleteVehicleRate = (index) => {
      if (vehicleRates.length > 1) {
        setVehicleRates((prev) => prev.filter((_, i) => i !== index));
      }
    };

    
    const updateData=async()=>{
      toast.dismiss()
      if(startLocation ==="" || endlocation===""){
          toast.error("Please select start and end locations")
      }else if (startLocation=== endlocation){
        toast.error("Start and end locations cannot be same")
      }else if ( vehicleRates.some(rate => 
          rate.type === "" || rate.rate === "" 
        )){
          toast.error("vehicle Details are required")
      }else if(error.endlocation !=="" || error.startLocation !==""){
          toast.error("Please check error in locations")
      }else if( vehicleRates.some(rate => 
        rate.vehicleTypeError !=="" || rate.vehicleRateError !==""
        )){
          toast.error("Please check vehicle details")
  
      }else {
          sendData()
      }
    }
    const sendData= async()=>{
      const formattedVehicleRates = vehicleRates.map(({ type, rate }) => ({ type, rate }));
      
      try{
          const response = await client.post('/statepermit/update-state-permit', { 
              id:id,
              startLocation: startLocation,
              endLocation:endlocation,
              vehicleDetails: formattedVehicleRates
            })
         if (response.status===200){
          toast.success("State permit Update successfully")
          setVehicleRates([])
          setStartLocation("");
          setEndLocation("");
          setId("")
          setOpen(false)
          getStatePermit();
         }
  
    }catch(err){
      console.log(err)
    }
  }
  
  return (
    <Fragment>
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
              <li className="breadcrumb-item active">Manage/State Permit</li>
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
          <h3>Manage state Permit</h3>
          <div className="table-responsive">
            {statePermit.length > 0 ? (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr
                    style={{
                      borderBottom: "2px solid #ddd",
                      textAlign: "center",
                    }}
                  >
                    <th style={{ padding: "8px" }}>Start Location</th>
                    <th style={{ padding: "8px" }}>End Location</th>
                    <th style={{ padding: "8px" }}>Vehicle Types</th>
                    <th style={{ padding: "8px" }}>Permit Rate</th>
                    <th style={{ padding: "8px" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {statePermit.map((item, index) => (
                    <tr key={index}>
                      <td style={{ padding: "8px", textAlign: "center" }}>
                        {item.startLocation}
                      </td>
                      <td style={{ padding: "8px", textAlign: "center" }}>
                        {item.endLocation}
                      </td>
                      <td style={{ padding: "8px" }}>
                        <ul
                          style={{
                            listStyleType: "none",
                            padding: 0,
                            margin: 0,
                          }}
                        >
                          {item.vehicleDetails.map((value, index) => (
                            <li
                              key={index}
                              style={{
                                padding: "8px 0",
                                borderBottom:
                                  index !== item.vehicleDetails.length - 1
                                    ? "1px solid #ddd"
                                    : "none",
                              }}
                            >
                              {value.type}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td style={{ padding: "8px" }}>
                        <ul
                          style={{
                            listStyleType: "none",
                            padding: 0,
                            margin: 0,
                          }}
                        >
                          {item.vehicleDetails.map((value, index) => (
                           <li
                           key={index}
                           style={{
                             padding: "8px 0",
                             borderBottom:
                               index !== item.vehicleDetails.length - 1
                                 ? "1px solid #ddd"
                                 : "none",
                           }}
                         >Rs. {value.rate}</li>
                          ))}
                        </ul>
                      </td>
                      <td style={{ padding: "8px", textAlign: "center" }}>
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
                          title="Delete the State Permit Details"
                          description="Are you sure to delete thisState Permit Details?"
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
                <span
                  className="mb-2"
                  style={{
                    marginBottom: "12px",
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "#555",
                  }}
                >
                  No State Permit Available
                </span>

                <Button
                  color="primary"
                  variant="contained"
                  style={{
                    padding: "8px 16px",
                    fontWeight: "bold",
                    borderRadius: "8px",
                    boxShadow: "0 3px 6px rgba(0, 123, 255, 0.2)",
                  }}
                  onClick={() => {
                    navigate("/statepermit");
                  }}
                >
                  Add State Permit
                </Button>
              </div>
            )}
          </div>
        </div>
        <div>
          <Modal    show={open} onHide={handleCancleUpdate}>
            <Modal.Header closeButton>
            <Modal.Title>Update State Permit Rates Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                <div className="mt-2">
                <div>
                        <FormLabel>
                          <span>Start Location</span>
                        </FormLabel>
                      </div>
                      <div className="mt-1 p-3">
                      <TextField
                  label="Start Location"
                  slotProps={{
                    htmlInput: {
                      maxLength: 30,
                    },
                  }}
                  fullWidth
                  variant="outlined"
                  required
                  name="startLocation"
                  value={startLocation}
                  onChange={handleChange}
                  error={!!error.startLocation}
                  helperText={error.startLocation}
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
                    if (startLocation.length === 0 && e.key === " ") {
                      e.preventDefault();
                      return;
                    }

                    if (
                      !allowedKeys.includes(e.key) &&
                      !allowedCharPattern.test(e.key)
                    ) {
                      e.preventDefault();
                    }
                  }}/>
                        </div>
                        </div>
                </Form.Group>
                <Form.Group>
                <div className="mt-2">
                <div>
                        <FormLabel>
                          <span>End Location</span>
                        </FormLabel>
                      </div>
                      <div className="mt-1 p-3">
                      <TextField
                  label="End Location"
                  slotProps={{
                    htmlInput: {
                      maxLength: 30,
                    },
                  }}
                  fullWidth
                  variant="outlined"
                  required
                  name="endlocation"
                  value={endlocation}
                  onChange={handleChange}
                  error={!!error.endlocation}
                  helperText={error.endlocation}
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
                    if (endlocation.length === 0 && e.key === " ") {
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
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <h5 style={{ textAlign: "center" }}>Additional Vehicle Details*</h5>
                  <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                    <Button variant="contained" color="success" onClick={addVehicleRate}>
                      Add
                    </Button>
                  </Box>
                </div>
                {vehicleRates.map((vehicleRate, index) => (
                  <Grid container key={index} spacing={2} alignItems="center" style={{ marginBottom: "10px" }}>
                    <Grid item size={{xs:12,sm:4}} >
                      <TextField
                        label="Vehicle Type"
                        fullWidth
                        name="type"
                        value={vehicleRate.type}
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
                            if (vehicleRate.type.length === 0 && e.key === " ") {
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
                          onChange={(e) => handleVehicleTypeChange(index, e.target.value)}
                          onBlur={() => handleVehicleTypeBlur(index)} 
                        error={!!vehicleRate.vehicleTypeError}
                        helperText={vehicleRate.vehicleTypeError} 
                      />
                    </Grid>
                    <Grid item size={{xs:12,sm:4}}>
                      <TextField
                        label="Permit Rate"
                        fullWidth
                        name="rate"
                        value={vehicleRate.rate}
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
                            if (vehicleRate.rate.length === 0 && e.key === " ") {
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
                          onChange={(e) => handleVehicleRateChange(index, e.target.value)}
                          onBlur={() => handleVehicleRateBlur(index)}
                        error={!!vehicleRate.vehicleRateError}
                        helperText={vehicleRate.vehicleRateError}
                      />
                    </Grid>
                    <Grid item size={{xs:12,sm:2}}>
                      <Button variant="outlined" color="error" onClick={() => deleteVehicleRate(index)}>
                        Delete
                      </Button>
                    </Grid>
                  </Grid>
                ))}
                </Form.Group>
                <Modal.Footer>
                <Button  variant="contained" color="error" style={{
                  marginRight: "10px",
                }}
              onClick={handleCancleUpdate}
                >
                  Cancel
                </Button>
              <Button
                variant="contained"
               onClick={updateData}
                color="success"
              >
                Save changes
              </Button>
            </Modal.Footer>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </main>
    </Fragment>
  );
};

export default ManageStatePermit;
