import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TextField, Button, Box } from "@mui/material";
import toast from "react-hot-toast";
import client from "../../Common/Client/Client";
const OtherRate = () => {
    const [type,setType]=useState("");
    const [rate, setRate] = useState("");
    const [comment,setComment]=useState("")
    const [error, setError] = useState({
        type:"",
        rate:"",
        comment:""
    });

    //change

    const errorMessage = (fieldName, fieldValue) => {
        let message;
        if (fieldName) {
          if (fieldValue === "") {
            message = "";
          }
        }
    
        if (fieldName === "type") {
          if (fieldValue.length > 0 && fieldValue.length < 3) {
            message = "Type must be at least 3 characters long";
          } else {
            message = "";
          }
        }
    
        if (fieldName === "rate") {
          if (fieldValue.length > 0 && fieldValue.length < 3) {
            message = "Rate must be at least 3 characters long";
          } else {
            message = "";
          }
        }

        if (fieldName === "comment") {
            if (fieldValue.length > 0 && fieldValue.length < 3) {
              message = "Comments must be at least 3 characters long";
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
    
        if (name === "type") {
          setType(value);
        } else if(name==="rate"){
          setRate(value);
        }else{
            setComment(value);
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


      const handleSubmit=()=>{
        toast.dismiss()
        if(type==="" || rate===""){
            toast.error("Please fill in all fields");
            
        }else if(error.type !==""){
            toast.error(error.type)

        }else if(error.rate !==""){
            toast.error(error.rate)
        }else if(error.comment !==""){
            toast.error(error.comment)
        }else {
            sendData()
        }
      }

    const sendData=async()=>{
        try{
            const response = await client.post('/otherrate/add-other-rate', {
                type:type,
                rate:rate,
                comment:comment
            },{
              withCredentials:true
            });
            if(response.status===200){
                toast.success("Rate added successfully");
                setType("");
                setRate("");
                setComment("")
            }
        }catch(err){
            if (err.response && err.response.status === 401) {
                toast.error("Login again");
              } else {
                toast.error("Failed to add other rate details");
              }
        }
    }
  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Dashboard</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active">Other Rate </li>
          </ol>
        </nav>
      </div>
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
              Add Other Rate Details
            </h5>
          </div>
          <form noValidate autoComplete="off" style={{ width: "100%" }}>
            <div className="form-group">
            <Box sx={{ marginBottom: "20px" }}>
            <TextField
                  label="Type"
                  slotProps={{
                    htmlInput: {
                      maxLength: 30,
                    },
                  }}
                  fullWidth
                  variant="outlined"
                  required
                  name="type"
                  value={type}
                  onChange={handleChange}
                  error={!!error.type}
                  helperText={error.type}
                  onBlur={handleBlur}
                  onKeyDown={(e) => {
                   
                    if (type.length === 0 && e.key === " ") {
                      e.preventDefault();
                      return;
                    }

                  
                  }}
                />
                </Box>

<Box sx={{ marginBottom: "20px" }}>

<TextField
                  label="Rate"
                  slotProps={{
                    htmlInput: {
                      maxLength: 30,
                    },
                  }}
                  fullWidth
                  variant="outlined"
                  required
                  name="rate"
                  value={rate}
                  onChange={handleChange}
                  error={!!error.rate}
                  helperText={error.rate}
                  onBlur={handleBlur}
                  onKeyDown={(e) => {
                 
                    if (rate.length === 0 && e.key === " ") {
                      e.preventDefault();
                      return;
                    }

                  
                  }}
                />
</Box>
<Box sx={{ marginBottom: "20px" }}>
                <TextField
                  label="Comments"
                  slotProps={{
                    htmlInput: {
                      maxLength: 100,
                    },
                  }}
                  fullWidth
                  multiline
                  rows={4}
                
                  variant="outlined"
                  name="comment"
                  value={comment}
                  onChange={handleChange}
                  error={!!error.comment}
                  helperText={error.comment}
                  onKeyDown={(e) => {
                  
                    if (rate.length === 0 && e.key === " ") {
                      e.preventDefault();
                      return;
                    }

                  
                  }}
                />
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
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default OtherRate;
