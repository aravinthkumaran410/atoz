import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { Modal } from "antd"; // Import Modal from Ant Design
import "./TaxiBooking.css"; // Import CSS for styling
import toast from "react-hot-toast";
import client from "../../../Common/Client/Client";

function TaxiBooking() {
  const [tripType, setTripType] = useState("all");
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [totalBookings, setTotalBookings] = useState(0);

  const fetchUserDetails = async (type) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.get(
        `/taxibook/getbookings`,{
          withCredentials:true
        }
      );
      const allBookings = response.data;

      // Set total bookings for pagination
      setTotalBookings(allBookings.length);

      if (type === "all") {
        setUserDetails(allBookings);
      } else {
        const filteredBookings = allBookings.filter(
          (booking) => booking.tripType === type
        );
        setUserDetails(filteredBookings);
      }
    } catch (err) {
      toast.error("Failed to fetch user details");
    } finally {
      setLoading(false);
    }
  };

  const handleAllTripsClick = () => {
    setTripType("all");
    fetchUserDetails("all");
  };

  const handleSingleTripClick = () => {
    setTripType("one-way");
    fetchUserDetails("one-way");
  };

  const handleRoundTripClick = () => {
    setTripType("round-trip");
    fetchUserDetails("round-trip");
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Confirm Deletion",
      content:
        "Are you sure you want to delete this booking? This action cannot be undone.",
      okButtonProps: {
        style: {
          backgroundColor: "#fbc02d",
          borderColor: "black",
          color: "black",
        },
      },
      cancelButtonProps: {
        style: {
          backgroundColor: "#c42419",
          borderColor: "black",
          color: "white",
        },
      },
      onOk: async () => {
        try {
       const response=await client.post(
            `/taxibook/deletebookings`,{
              id:id
            },{
              withCredentials:true
            }
          );

          if(response.status===200){
            fetchUserDetails(tripType === "all" ? "all" : tripType);
            toast.success("Booking deleted successfully!");
          }
          
        } catch (err) {
          if (err.response && err.response.status === 401) {
            toast.error("Login again");
          } else {
            toast.error("Error while delete.please try again");
          }
        }
      },
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    fetchUserDetails(tripType);
  }, [tripType]);

  // Pagination logic
  const indexOfLastBooking = currentPage * itemsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - itemsPerPage;
  const currentBookings = userDetails.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

  const totalPages = Math.ceil(totalBookings / itemsPerPage);

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Dashboard</h1>

        <nav style={{ marginTop: "10px" }}>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active">Manage/Taxi Booking</li>
          </ol>
        </nav>
      </div>

      <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#fbc02d",
            color: "Black",
            borderRadius: "10px",
            boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
            "&:hover": {
              bgcolor: "black",
              color: "#fbc02d",
              boxShadow: "0 5px 10px rgba(0,0,0,0.3)",
              transition: "background-color 0.3s, box-shadow 0.3s",
            },
            padding: "10px 20px",
            fontWeight: "bold",
          }}
          onClick={handleAllTripsClick}
        >
          All Bookings
        </Button>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#fbc02d",
            color: "Black",
            borderRadius: "10px",
            boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
            "&:hover": {
              bgcolor: "black",
              color: "#fbc02d",
              boxShadow: "0 5px 10px rgba(0, 0, 0, 0.3)",
              transition: "background-color 0.3s, box-shadow 0.3s",
            },
            padding: "10px 20px",
            fontWeight: "bold",
          }}                        
          onClick={handleSingleTripClick}
        >
          Single Trip
        </Button>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#fbc02d",
            color: "Black",
            borderRadius: "10px",
            boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
            "&:hover": {
              bgcolor: "black",
              color: "#fbc02d",
              boxShadow: "0 5px 10px rgba(0, 0, 0, 0.3)",
              transition: "background-color 0.3s, box-shadow 0.3s",
            },
            padding: "10px 20px",
            fontWeight: "bold",
          }}
          onClick={handleRoundTripClick}
        >
          Rounded Trip
        </Button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {userDetails.length === 0 ? (
        <p className="no-bookings">
          No bookings now. Soon we will get the bookings.
        </p>
      ) : (
        <>
          <TableContainer
            component={Paper}
            style={{ marginTop: "20px", overflowX: "auto" }}
          >
            <Table>
              <TableHead>
                <TableRow style={{ color: "black", fontSize: "18px" }}>
                  <TableCell>Name</TableCell>
                  <TableCell>Trip Type</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Pickup Location</TableCell>
                  <TableCell>Drop Location</TableCell>
                  <TableCell>Total Distance</TableCell>
                  <TableCell>Total Fare</TableCell>
                  <TableCell>Pickup Date</TableCell>
                  <TableCell>Pickup Time</TableCell>
                
                  {/* Conditionally render Return Date and Return Time columns */}
                  {(tripType === "all" || tripType === "round-trip") && (
                    <>
                      <TableCell>Return Date</TableCell>
                    
                    </>
                  )}
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentBookings.map((user) => (
                  <TableRow key={user._id} className="del-row">
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.tripType}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.pickupLocation}</TableCell>
                    <TableCell>{user.dropLocation}</TableCell>
                    <TableCell>{user.distance}</TableCell>
                    <TableCell>{user.total}</TableCell>
                    <TableCell>{formatDate(user.pickupDate)}</TableCell>
                    <TableCell>{user.pickupTime}</TableCell>
                    {/* Render Return Date and Return Time only if tripType is 'all' or 'round-trip' */}
                    {(tripType === "all" || tripType === "round-trip") && (
                      <>
                        {user.tripType === "one-way" ? (
                          <>
                            <TableCell>-</TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell>{formatDate(user.returnDate)}</TableCell>
                          
                          </>
                        )}
                      </>
                    )}
                    <TableCell>
                      <Button
                        onClick={() => handleDelete(user._id)}
                        sx={{
                          bgcolor: "darkred",
                          color: "white",
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination Controls */}
          <div style={{ marginTop: "20px" }}>
            <Button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              variant="outlined"
            >
              Previous
            </Button>
            <Button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              variant="outlined"
            >
              Next
            </Button>
            <p style={{ display: "inline", marginLeft: "10px" }}>
              Page {currentPage} of {totalPages}
            </p>
          </div>
        </>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </main>
  );
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
}

export default TaxiBooking;