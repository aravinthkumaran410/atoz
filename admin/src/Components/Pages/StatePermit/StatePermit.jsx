import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { TextField, Button, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import toast from "react-hot-toast";
import client from "../../Common/Client/Client";

const StatePermit = () => {
  const [startLocation, setStartLocation] = useState("");
  const [endlocation, setEndLocation] = useState("");
  const [vehicleRates, setVehicleRates] = useState([{ type: "", rate: "", vehicleTypeError: "", vehicleRateError: "" }]);
  const [error, setError] = useState({
    startLocation: "",
    endlocation: "",
  });

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
  


//   const handleAdditionalBlur = (index, field, e) => {
//     const { value } = e.target;
//     const newVehicleRates = [...vehicleRates];

//     if (value === "") {
//       if (field === "type") {
//         newVehicleRates[index].vehicleTypeError = "Vehicle Type is required.";
//       } else if (field === "rate") {
//         newVehicleRates[index].vehicleRateError = "Permit Rate is required.";
//       }
//     } else {
//       if (field === "type") {
//         newVehicleRates[index].vehicleTypeError = "";
//       } else if (field === "rate") {
//         newVehicleRates[index].vehicleRateError = "";
//       }
//     }

//     setVehicleRates(newVehicleRates);
//   };

  const deleteVehicleRate = (index) => {
    if (vehicleRates.length > 1) {
      setVehicleRates((prev) => prev.filter((_, i) => i !== index));
    }
  };


  const handleSubmit=async()=>{
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
    console.log(formattedVehicleRates)
    
    try{
        const response = await client.post('/statepermit/add-state-permit', { 
            startLocation: startLocation,
            endLocation:endlocation,
            vehicleDetails: formattedVehicleRates
          })
       if (response.status===200){
        toast.success("State permit added successfully")
        setStartLocation("");
        setEndLocation("");
        setVehicleRates([{ type: "", rate: "", vehicleTypeError: "", vehicleRateError: "" }]);
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
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active">State Permit </li>
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
        <div
          className="card"
          style={{ width: "100%", maxWidth: "700px", padding: " 20px" }}
        >
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
              Add State Permit Details
            </h5>
          </div>
          <form noValidate autoComplete="off" style={{ width: "100%" }}>
            <Grid container spacing={2}>
              <Grid item size={{ xs: 12, sm: 6 }}>
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
                  }}
                />
              </Grid>
              <Grid item size={{ xs: 12, sm: 6 }}>
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
              </Grid>
              <Grid item size={{xs:12}}>
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
                    <Grid item size={{xs:12,sm:5}} >
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
                    <Grid item size={{xs:12,sm:5}}>
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
              </Grid>
              <Grid>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </section>
    </Fragment>
  );
};

export default StatePermit;
