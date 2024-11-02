import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid, Card, CardContent, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import { toast } from 'react-hot-toast';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SwapCallsIcon from '@mui/icons-material/SwapCalls';
import './Home.css';
import client from '../../Common/Client/Client';
import backgroundImage from '../../../Assets/Images/car.jpg';
import onewayImage from '../../../Assets/Images/cars.jpg';
import twowayImage from '../../../Assets/Images/carss.jpg';

const Home = () => {
  const [trafficCount, setTrafficCount] = useState(0);
  const [oneWayCount, setOneWayCount] = useState(0);
  const [roundWayCount, setRoundWayCount] = useState(0);
  const [recentBookings, setRecentBookings] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const [traffic, oneway, roundway, bookings, contacts] = await Promise.all([
        client.get('/traffic/gettraffic'),
        client.get("/onewaytrip/get-one-way-trip"),
        client.get("/roundtrip/get-round-way-trip"),
        client.get("/taxibook/getbookings", { withCredentials: true }),
        client.get("/usercontact/get-user-contact", { withCredentials: true })
      ]);
      setTrafficCount(traffic.data.Traffiname.length || 0);
      setOneWayCount(oneway.data.length || 0);
      setRoundWayCount(roundway.data.length || 0);
      setRecentBookings(bookings.data.slice(0, 5));
      setUsers(contacts.data.slice(0, 5));
    } catch (err) {
      toast.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
  if(token){
    fetchData();
  }
   
  }, []);

  return (
    <Fragment>
      <main id="main" className="main" style={{ backgroundColor: '#F9F9F9', padding: '20px' }}>
        <div className="pagetitle">
          <h1 style={{ fontWeight: 'bold', color: '#333' }}>Dashboard</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/" style={{ color: '#6C757D' }}>Home</Link>
              </li>
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
        </div>

        <Grid container spacing={3} sx={{ mt: 2, mb: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                position: 'relative',
                color: '#000',
                p: 3,
                boxShadow: '0 0 40px 5px rgb(0 0 0 / 5%)',
                borderRadius: 2,
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${onewayImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'brightness(0.5)',
                  zIndex: 1,
                },
                '&:hover': {
                  transform: 'scale(1.02)',
                  transition: '0.3s',
                },
              }}
            >
              <CardContent sx={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#fff' }}>
                <TrendingUpIcon sx={{ fontSize: 40, color: '#fbc02d' }} />
                <Typography variant="h6" align="center">One-Way Trip</Typography>
                <Typography variant="h4" align="center">{oneWayCount}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                position: 'relative',
                bgcolor: '#fbc02d',
                color: '#000',
                p: 3,
                boxShadow: '0 0 40px 5px rgb(0 0 0 / 5%)',
                borderRadius: 2,
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${twowayImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: 0.6,
                  zIndex: 1,
                },
                '&:hover': {
                  transform: 'scale(1.02)',
                  transition: '0.3s',
                },
              }}
            >
              <CardContent sx={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <SwapCallsIcon sx={{ fontSize: 40, color: '#fbc02d' }} />
                <Typography variant="h6" align="center" sx = {{color: "#fff"}}>Round-Way Trip</Typography>
                <Typography variant="h4" align="center" sx = {{color: "#fff"}}>{roundWayCount}</Typography>
              </CardContent>
            </Card>
          </Grid>

      <Grid item xs={12} sm={6} md={4}>
  <Card
    sx={{
      position: 'relative',
      color: 'white',
      p: 3,
      boxShadow: '0 0 40px 5px rgb(0 0 0 / 5%)',
      borderRadius: 2,
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.6,
        zIndex: 1,
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark overlay with 40% opacity
        zIndex: 2,
      },
      '&:hover': {
        transform: 'scale(1.02)',
        transition: '0.3s',
      },
    }}
  >
    <CardContent sx={{ position: 'relative', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <DirectionsCarIcon sx={{ fontSize: 40, color: '#fbc02d' }} />
      <Typography variant="h6" align="center">Total Traffic</Typography>
      <Typography variant="h4" align="center">{trafficCount}</Typography>
    </CardContent>
  </Card>
</Grid>

        </Grid>

        {/* Recent Bookings Table */}
        <div style={{ marginTop: '20px' }}>
          <Typography variant="h5" align="center" style={{ fontWeight: 'bold', color: '#333' }}>Recent Bookings</Typography>
          <TableContainer component={Paper} sx={{ mt: 2, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#333' }}>
                  {['Name', 'Trip Type', 'Phone', 'Pickup Location','Drop Location','Total Distance','Total Fare', 'Pickup Date', 'Pickup Time', 'Return Date', 'Return Time'].map(header => (
                    <TableCell key={header} sx={{ color: '#FFD700' }}>{header}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {recentBookings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center">Currently No bookings available</TableCell>
                  </TableRow>
                ) : (
                  recentBookings.map((booking, index) => (
                    <TableRow key={index} hover sx={{ '&:hover': { backgroundColor: '#fbc02d', transition: 'background-color 0.3s', color: '#333' } }}>
                      <TableCell>{booking.name}</TableCell>
                      <TableCell>{booking.tripType}</TableCell>
                      <TableCell>{booking.phone}</TableCell>
                      <TableCell>{booking.pickupLocation}</TableCell>
                      <TableCell>{booking.dropLocation}</TableCell>
                      <TableCell>{booking.distance}</TableCell>
                      <TableCell>{booking.total}</TableCell>
                      <TableCell>{new Date(booking.pickupDate).toLocaleDateString()}</TableCell>
                      <TableCell>{booking.pickupTime}</TableCell>
                      <TableCell>{booking.returnDate ? new Date(booking.returnDate).toLocaleDateString() : '-'}</TableCell>
                      <TableCell>{booking.returnDate ? booking.returnTime : '-'}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        {/* Recent User Contacts Table */}
     <div style={{ marginTop: '20px' }}>
  <Typography variant="h5" align="center" style={{ fontWeight: 'bold', color: '#333' }}>Recent User Contacts</Typography>
  <TableContainer component={Paper} sx={{ mt: 2, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', borderRadius: 2 }}>
    <Table>
      <TableHead>
        <TableRow sx={{ backgroundColor: '#333' }}>
          {['Name', 'Email', 'Phone', 'Message'].map(header => (
            <TableCell key={header} sx={{ color: '#FFD700' }}>{header}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {users.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} align="center">Currently No user contacts available</TableCell>
          </TableRow>
        ) : (
          users.map((user, index) => (
            <TableRow key={index} hover sx={{ '&:hover': { backgroundColor: '#fbc02d', transition: 'background-color 0.3s', color: '#333' } }}>
              <TableCell>{user.name}</TableCell>
              <TableCell>
                <a href={`mailto:${user.email}`} style={{ textDecoration: 'underline', color: '#333' }}>
                  {user.email}
                </a>
              </TableCell>
              <TableCell>
                <a href={`tel:${user.phoneNumber}`} style={{ textDecoration: 'underline', color: '#333' }}>
                  {user.phoneNumber}
                </a>
              </TableCell>
              <TableCell>{user.message}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  </TableContainer>
</div>

      </main>
    </Fragment>
  );
};

export default Home;