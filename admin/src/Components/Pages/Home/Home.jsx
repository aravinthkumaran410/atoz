import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { toast } from 'react-hot-toast';
import './Home.css';
import client from '../../Common/Client/Client';

const Home = () => {
  const [trafficCount, setTrafficCount] = useState(0);
  const [oneWayCount, setOneWayCount] = useState(0);
  const [roundWayCount, setRoundWayCount] = useState(0);
  const [recentBookings, setRecentBookings] = useState([]);
  const [error, setError] = useState('');

  // Function to fetch one-way trip data
  const getOneWayTrip = async () => {
    try {
      const response = await client.get("/onewaytrip/get-one-way-trip");
      if (response.status === 200) {
        setOneWayCount(response.data.length); // Set one-way trip count
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to Fetch the One Way Trip");
    }
  };

  // Function to fetch round-way trip data
  const getRoundWayTrip = async () => {
    try {
      const response = await client.get("/roundtrip/get-round-way-trip");
      if (response.status === 200) {
        setRoundWayCount(response.data.length); // Set round-way trip count
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to Fetch the Round Way Trip");
    }
  };

  // Function to fetch recent bookings
  const fetchRecentBookings = async () => {
    try {
      const response = await client.get("/taxibook/getbookings",{
        withCredentials:true
      });
      if (response.status === 200) {
        setRecentBookings(response.data.slice(0, 5)); // Fetch the last 5 bookings
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch recent bookings");
    }
  };

  // Fetch total traffic count and other trip counts
  useEffect(() => {
    const fetchTrafficCount = async () => {
      try {
        const response = await client.get('/traffic/gettraffic');
        const trafficData = response.data.Traffiname || [];
        setTrafficCount(trafficData.length);
      } catch (error) {
        setError('Error fetching total traffic data.');
      }
    };

    fetchTrafficCount();
    getOneWayTrip();
    getRoundWayTrip();
    fetchRecentBookings(); // Call to fetch recent bookings
  }, []);

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
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
        </div>

        {/* Dashboard Summary Boxes */}
        <Grid container spacing={2} sx={{ mt: 3, p: 3 }}>
          {/* Total Traffic Count Box */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ bgcolor: '#D76C82', color: 'black', p: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" align="center">Total Traffic</Typography>
                <Typography variant="h4" align="center">{trafficCount}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* One-Way Traffic Count Box */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ bgcolor: '#243642', color: '#fff', p: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" align="center">One-Way Traffic</Typography>
                <Typography variant="h4" align="center">{oneWayCount}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Round-Way Traffic Count Box */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ bgcolor: '#C1E2A4', color: 'black', p: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" align="center">Round-Way Traffic</Typography>
                <Typography variant="h4" align="center">{roundWayCount}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Recent Bookings Table */}
        <div style={{ marginTop: '20px' }}>
          <Typography variant="h5" align="center">Recent Bookings</Typography>
          <TableContainer component={Paper} style={{ marginTop: "20px", overflowX: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Trip Type</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Pickup Location</TableCell>
                  <TableCell>Pickup Date</TableCell>
                  <TableCell>Pickup Time</TableCell>
                  <TableCell>Return Date</TableCell> {/* Added return date */}
                  <TableCell>Return Time</TableCell> {/* Added return time */}
                </TableRow>
              </TableHead>
              <TableBody>
                {recentBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>{booking.name}</TableCell>
                    <TableCell>{booking.tripType}</TableCell>
                    <TableCell>{booking.phone}</TableCell>
                    <TableCell>{booking.pickupLocation}</TableCell>
                    <TableCell>{booking.pickupDate}</TableCell>
                    <TableCell>{booking.pickupTime}</TableCell>
                    <TableCell>{booking.returnDate || '-'}</TableCell> {/* Display return date or dash */}
                    <TableCell>{booking.returnTime || '-'}</TableCell> {/* Display return time or dash */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        {/* Error handling */}
        {error && (
          <Typography color="error" align="center" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </main>
    </Fragment>
  );
};

export default Home;