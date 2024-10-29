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

function ContactAdmin() {
  const [adminList, setAdminList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:8000/admin/getAdmins"
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

  const handleChange = (e) => {
    setCurrentAdmin({
      ...currentAdmin,
      [e.target.name]: e.target.value,
    });
    setHasChanges(true);
  };

  const validateFields = () => {
    toast.dismiss()
    const newErrors = {};
    if (!currentAdmin.title) {
     toast.error('Please select a title')
    }
    if (!currentAdmin.phone || !/^\d+$/.test(currentAdmin.phone)) {
      newErrors.phone = "Primary Phone is required and must be numeric.";
    }
    if (currentAdmin.phone1 && !/^\d+$/.test(currentAdmin.phone1)) {
      newErrors.phone1 = "Alternate Phone must be numeric if provided.";
    }
    if (!currentAdmin.address) {
      newErrors.address = "Address is required.";
    }
    if (!currentAdmin.email || !/\S+@\S+\.\S+/.test(currentAdmin.email)) {
      newErrors.email = "Email is required and must be a valid email address.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hasChanges) return;

    if (!validateFields()) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    try {
      await axios.post(
        'http://localhost:8000/admin/updateAdmin',
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
                        />
                        <TextField
                          fullWidth
                          label="Primary Phone"
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
                        />
                        <TextField
                          fullWidth
                          label="Alternate Phone"
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
                        />
                        <TextField
                          fullWidth
                          label="Address"
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