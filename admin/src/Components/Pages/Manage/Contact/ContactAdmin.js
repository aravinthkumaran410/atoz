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
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import HomeIcon from "@mui/icons-material/Home";
import "./Contactadmin.css";

function ContactAdmin() {
  const [adminList, setAdminList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState(null);

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:8000/admin/getAdmins"
        );
        setAdminList(response.data);
        setCurrentAdmin(response.data[0]);
      } catch (error) {
        console.error("Error fetching admin details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminDetails();
  }, []);

  const handleEditClick = () => setIsEditing(true);

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Phone number is invalid")
      .required("Primary Phone is required"),
    phone1: Yup.string().matches(
      /^[0-9]*$/,
      "Alternate Phone must be a number"
    ),
    address: Yup.string().required("Address is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const handleFormSubmit = async (values) => {
    try {
      await axios.put(
        `http://localhost:8000/admin/updateAdmin/${currentAdmin._id}`,
        values
      );
      setIsEditing(false);
      alert("Details updated successfully!");
      setAdminList((prevList) =>
        prevList.map((admin) =>
          admin._id === currentAdmin._id ? values : admin
        )
      );
      setCurrentAdmin(values);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
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

                  {loading ? (
                    <CircularProgress />
                  ) : currentAdmin ? (
                    <Formik
                      initialValues={currentAdmin}
                      validationSchema={validationSchema}
                      onSubmit={handleFormSubmit}
                      enableReinitialize
                    >
                      {({ isSubmitting }) => (
                        <Form className="admin-form">
                          <Field
                            as={TextField}
                            fullWidth
                            label="Title"
                            name="title"
                            margin="normal"
                            variant="outlined"
                            required
                            InputProps={{
                              readOnly: !isEditing,
                            }}
                            className="input-field"
                            helperText={<ErrorMessage name="title" />}
                            error={Boolean(ErrorMessage.name)}
                          />
                          <Field
                            as={TextField}
                            fullWidth
                            label="Primary Phone"
                            name="phone"
                            margin="normal"
                            variant="outlined"
                            required
                            InputProps={{
                              readOnly: !isEditing,
                            }}
                            className="input-field"
                            helperText={<ErrorMessage name="phone" />}
                            error={Boolean(ErrorMessage.phone)}
                          />
                          <Field
                            as={TextField}
                            fullWidth
                            label="Alternate Phone"
                            name="phone1"
                            margin="normal"
                            variant="outlined"
                            InputProps={{
                              readOnly: !isEditing,
                            }}
                            className="input-field"
                            helperText={<ErrorMessage name="phone1" />}
                            error={Boolean(ErrorMessage.phone1)}
                          />
                          <Field
                            as={TextField}
                            fullWidth
                            label="Address"
                            name="address"
                            margin="normal"
                            variant="outlined"
                            multiline
                            rows={4}
                            required
                            InputProps={{
                              readOnly: !isEditing,
                            }}
                            className="input-field"
                            helperText={<ErrorMessage name="address" />}
                            error={Boolean(ErrorMessage.address)}
                          />
                          <Field
                            as={TextField}
                            fullWidth
                            label="Email"
                            name="email"
                            margin="normal"
                            variant="outlined"
                            required
                            InputProps={{
                              readOnly: !isEditing,
                            }}
                            className="input-field"
                            helperText={<ErrorMessage name="email" />}
                            error={Boolean(ErrorMessage.email)}
                          />
                          {isEditing ? (
                            <Button
                              variant="contained"
                              type="submit"
                              fullWidth
                              disabled={isSubmitting}
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
                        </Form>
                      )}
                    </Formik>
                  ) : (
                    <Typography variant="body1">
                      No admin details available.
                    </Typography>
                  )}
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