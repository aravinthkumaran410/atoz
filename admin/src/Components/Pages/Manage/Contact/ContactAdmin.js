import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Breadcrumbs,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Divider,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import "./Contactadmin.css";
import toast from "react-hot-toast";
import client from "../../../Common/Client/Client";

function ContactAdmin() {
  const [adminList, setAdminList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [errors, setErrors] = useState({
    title:"",
    email:"",
    phone:"",
    phone1:"",
    address:""

  });

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        setLoading(true);
        const response = await client.get(
          "/admin/getAdmins"
        );
        setAdminList(response.data);
        setCurrentAdmin(response.data[0]);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          toast.error("Login again");
        } else {
          toast.error("Failed to fetch contact details");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchAdminDetails();
  }, []);

  const handleEditClick = () => setIsEditing(true);


  const errorMessage = (fieldName, fieldValue) => {
    let message;
    if (fieldName) {
      if (fieldValue === "") {
        message = "";
      }
    }

    if(fieldName==="title"){
      if(fieldValue.length<3){
        message="Please enter a valid Title"
        }else{
          message="";
        }
    }

    if(fieldName==="address"){
      if(fieldValue.length<10){
        message="Please enter a valid address"
        }else{
          message="";
        }

    }
    if (fieldName === "phone") {
      // Remove non-numeric characters for validation
      const numericValue = fieldValue.replace(/[^0-9]/g, "");

      if (numericValue.length < 10) {
        message = "Phone number needs 10 characters";
      } else if (numericValue.length > 10) {
        message = "Phone number is too long";
      } else {
        const prefix = parseInt(numericValue.slice(0, 2), 10);
        if (!(prefix >= 63 && prefix <= 99)) {
          message = "Invalid Phone Number";
        } else {
          message = "";
        }
      }
    }
    if (fieldName === "phone1") {
      // Remove non-numeric characters for validation
      const numericValue = fieldValue.replace(/[^0-9]/g, "");

      if (numericValue.length < 10) {
        message = "Phone number needs 10 characters";
      } else if (numericValue.length > 10) {
        message = "Phone number is too long";
      } else {
        const prefix = parseInt(numericValue.slice(0, 2), 10);
        if (!(prefix >= 63 && prefix <= 99)) {
          message = "Invalid Phone Number";
        } else {
          message = "";
        }
      }
    }

    

    if (fieldName === "email") {
      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{2,}@[a-zA-Z-]+\.[a-zA-Z-]{2,}$/;
      if (!emailRegex.test(fieldValue)) {
        message = `Email is Invalid`;
      } else {
        message = "";
      }
    }


  
   

 
    return { message: message };
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    const err = errorMessage(name, value).message;

    setErrors((prevError) => ({
      ...prevError,
      [name]: err,
    }));
    setCurrentAdmin({
      ...currentAdmin,
      [e.target.name]: e.target.value,
    });
    setHasChanges(true);
  };

  const validateFields = () => {
    toast.dismiss();
    const newErrors = {
      title: !currentAdmin.title ? "Please enter a title" : errors.title,
      phone: !currentAdmin.phone ? "Primary Phone is required" : errors.phone,
      phone1: errors.phone1,
      address: !currentAdmin.address ? "Address is required" : errors.address,
      email: !currentAdmin.email ? "Email is required" : errors.email,
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((err) => err); // returns true if no errors
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hasChanges) return;

    if (!validateFields()) {
      toast.error("Please fix the errors before submitting.");
      return;
    }



    try {
      await client.post(
        '/admin/updateAdmin',
        currentAdmin,{
          withCredentials:true
        }
      );
      setIsEditing(false);
      setHasChanges(false);
      toast.success("Details updated successfully!");
      setAdminList((prevList) =>
        prevList.map((admin) =>
          admin._id === currentAdmin._id ? currentAdmin : admin
        )
      );
    } catch (err) {
      if (err.response && err.response.status === 401) {
        toast.error("Login again");
      } else {
        toast.error("Failed to Update contact details");
      }
    }

  
    
  };

  console.log(errors)

  return (
    <main id="main" className="main">
      <Container maxWidth="lg">
        <Box py={4} className="contact-admin">
          <div className="pagetitle">
            <Typography variant="h4" gutterBottom className="page-title">
              Dashboard
            </Typography>
            <Breadcrumbs aria-label="breadcrumb">
              <Link to="/" className="breadcrumb-link">
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Home
              </Link>
              <Typography className="breadcrumb-text">Contact</Typography>
            </Breadcrumbs>
          </div>

          <Grid container spacing={4} mt={4}>
            <Grid item xs={12} md={6}>
              <Card className="form-card">
                <CardContent>
                  <Typography variant="h6" gutterBottom className="form-title">
                    {isEditing ? "Update Admin" : "Admin Details"}
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <form onSubmit={handleSubmit} className="admin-form">
                    {loading ? (
                      <CircularProgress />
                    ) : currentAdmin ? (
                      <>
                        <TextField
                          fullWidth
                          slotProps={{
                            htmlInput: {
                              maxLength: 20,
                            },
                          }}
                          label="Title"
                          name="title"
                          value={currentAdmin.title}
                          onChange={isEditing ? handleChange : null}
                          margin="normal"
                          variant="outlined"
                          required
                          InputProps={{
                            readOnly: !isEditing,
                          }}
                          className="input-field"
                          error={!!errors.title}
                          helperText={errors.title}
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
                            if (currentAdmin.title.length === 0 && e.key === " ") {
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
                        <TextField
                          fullWidth
                          label="Primary Phone"
                          slotProps={{
                            htmlInput: {
                              maxLength: 10,
                            },
                          }}
                          name="phone"
                          value={currentAdmin.phone}
                          onChange={isEditing ? handleChange : null}
                          margin="normal"
                          variant="outlined"
                          required
                          InputProps={{
                            readOnly: !isEditing,
                          }}
                          className="input-field"
                          error={!!errors.phone}
                          helperText={errors.phone}
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
        
                            if (currentAdmin.phone.length === 0 && e.key === " ") {
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
                        <TextField
                          fullWidth
                          label="Alternate Phone"
                          slotProps={{
                            htmlInput: {
                              maxLength: 10,
                            },
                          }}
                          name="phone1"
                          value={currentAdmin.phone1 || ""}
                          onChange={isEditing ? handleChange : null}
                          margin="normal"
                          variant="outlined"
                          InputProps={{
                            readOnly: !isEditing,
                          }}
                          className="input-field"
                          error={!!errors.phone1}
                          helperText={errors.phone1}
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
        
                            if (currentAdmin.phone.length === 0 && e.key === " ") {
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
                        <TextField
                          fullWidth
                          label="Address"
                          slotProps={{
                            htmlInput: {
                              maxLength: 300,
                            },
                          }}
                          name="address"
                          value={currentAdmin.address}
                          onChange={isEditing ? handleChange : null}
                          margin="normal"
                          variant="outlined"
                          multiline
                          rows={4}
                          required
                          InputProps={{
                            readOnly: !isEditing,
                          }}
                          className="input-field"
                          error={!!errors.address}
                          helperText={errors.address}
                          onKeyDown={(e) => {
                            const allowedKeys = [
                              "Backspace",
                              "ArrowLeft",
                              "ArrowRight",
                              "Delete",
                              "Tab",
                              " ",
                            ];
                      
        
                            if (currentAdmin.address.length === 0 && e.key === " ") {
                              e.preventDefault();
                              return;
                            }
        
                           
                          }}
                        />
                        <TextField
                          fullWidth
                          label="Email"
                          name="email"
                          value={currentAdmin.email}
                          onChange={isEditing ? handleChange : null}
                          margin="normal"
                          variant="outlined"
                          required
                          InputProps={{
                            readOnly: !isEditing,
                          }}
                          className="input-field"
                          error={!!errors.email}
                          helperText={errors.email}
                          onKeyDown={(event) => {
                            if (event.key === " ") {
                              event.preventDefault(); // Prevent space from being entered
                            }
                          }}
                        />
                        {isEditing ? (
                          <Button
                            variant="contained"
                            type="submit"
                            fullWidth
                            className="update-button"
                          >
                            Update Admin
                          </Button>
                        ) : (
                          <Button
                            variant="outlined"
                            onClick={handleEditClick}
                            fullWidth
                            className="edit-button"
                          >
                            Edit
                          </Button>
                        )}
                      </>
                    ) : (
                      <Typography variant="body1">
                        No admin details available.
                      </Typography>
                    )}
                  </form>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card className="details-card">
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    className="details-title"
                  >
                    Contact Admins
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Grid container spacing={2}>
                    {adminList.map((admin) => (
                      <Grid item xs={12} key={admin._id}>
                        <Card className="admin-card" variant="outlined">
                          <CardContent>
                            <Typography
                              variant="h6"
                              className="admin-name"
                              gutterBottom
                            >
                              {admin.title}
                            </Typography>
                            <Typography variant="body2" className="admin-info">
                              Primary Phone: {admin.phone}
                            </Typography>
                            <Typography variant="body2" className="admin-info">
                              Alternate Phone: {admin.phone1 || "N/A"}
                            </Typography>
                            <Typography variant="body2" className="admin-info">
                              Address: {admin.address}
                            </Typography>
                            <Typography variant="body2" className="admin-info">
                              Email: {admin.email}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </main>
  );
}

export default ContactAdmin;