import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  InputAdornment,
  Fade,
  Card,
  CardContent,
  Stack,
  Snackbar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";

function Tariff() {
  const [trafficName, setTrafficName] = useState("");
  const [trafficList, setTrafficList] = useState([]);
  const [displayedTraffic, setDisplayedTraffic] = useState(15);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchTraffic = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/traffic/gettraffic"
        );
        const trafficNames = response.data.Traffiname || [];
        setTrafficList(trafficNames.map((name) => String(name)));
      } catch (error) {
        setError("Error fetching traffic names.");
      }
    };
    fetchTraffic();
  }, []);

  const handleInputChange = (e) => setTrafficName(e.target.value);
  const handleSearchChange = (e) =>
    setSearchQuery(e.target.value.toLowerCase());

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedName = trafficName.trim();
    if (!trimmedName) return setError("Please enter a traffic name.");

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/traffic/addtraffic",
        {
          Traffiname: trimmedName,
        }
      );
      setTrafficList((prev) => [...prev, response.data.data.Traffiname]);
      setTrafficName("");
      setSuccess("Traffic name added successfully!");
    } catch (error) {
      setError("Error adding traffic name. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${name}?`
    );
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `http://localhost:8000/traffic/deletetraffic/${id}/${name}`
        );
        console.log(response);

        setTrafficList((prev) => prev.filter((item) => item !== name));
        setSuccess("Traffic name deleted successfully!");
      } catch (error) {
        setError("Error deleting traffic name. Please try again.");
      }
    }
  };

  const filteredList = trafficList
    .filter(
      (name) =>
        typeof name === "string" && name.toLowerCase().includes(searchQuery)
    )
    .slice(0, displayedTraffic);

  const loadMore = () => setDisplayedTraffic((prev) => prev + 15);
  const showLess = () => setDisplayedTraffic(15);

  const handleCloseSnackbar = () => {
    setError("");
    setSuccess("");
  };

  return (
    <div
      style={{
        backgroundColor: "#f0f5f9",
        minHeight: "100vh",
        padding: "20px 0",
      }}
    >
      <main className="main">
        <div className="pagetitle" style={{ color: "#333" }}>
          <h1>Dashboard</h1>
          <nav style={{ marginTop: "10px" }}>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/" style={{ color: "#333" }}>
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item active" style={{ color: "#333" }}>
                Manage/Tariff
              </li>
            </ol>
          </nav>
        </div>

        <Container
          maxWidth="md"
          sx={{
            mt: 4,
            bgcolor: "#fff",
            color: "#333",
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" gutterBottom align="center">
            Add New Traffic
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Don't enter existing Tariff"
              variant="outlined"
              fullWidth
              value={trafficName}
              onChange={handleInputChange}
              required
              margin="normal"
              sx={{ bgcolor: "#fff", borderRadius: 1 }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={
                !trafficName.trim() ||
                trafficList.includes(trafficName) ||
                loading
              }
              sx={{
                mt: 2,
                bgcolor: "#f9c20c",
                color: "black",
                "&:hover": { bgcolor: "#f9c20c" },
              }}
            >
              {loading ? "Adding..." : "Add Traffic Name"}
            </Button>
          </form>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            All Traffic
          </Typography>
          <TextField
            label="Search Traffic Names"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange}
            margin="normal"
            sx={{ bgcolor: "#fff", borderRadius: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <Grid container spacing={2} sx={{ mt: 3 }}>
            {filteredList.length > 0 ? (
              filteredList.map((name, index) => (
                <Fade in={true} timeout={500} key={index}>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Card
                      sx={{
                        bgcolor: "#f9c20c",
                        borderRadius: 2,
                        boxShadow: 2,
                        "&:hover": {
                          transform: "scale(1.05)",
                          transition: "transform 0.2s ease-in-out",
                          boxShadow: 4,
                        },
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="subtitle1"
                          align="center"
                          sx={{
                            color: "#333",
                            fontWeight: "bold",
                            letterSpacing: 1,
                          }}
                        >
                          {name}
                        </Typography>
                        <Stack
                          direction="row"
                          justifyContent="center"
                          spacing={1}
                          sx={{ mt: 1 }}
                        >
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => handleDelete(name)}
                            startIcon={<DeleteIcon />}
                          >
                            Delete
                          </Button>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                </Fade>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  align="center"
                  sx={{ color: "#333" }}
                >
                  No traffic names found.
                </Typography>
              </Grid>
            )}
          </Grid>

          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{ mt: 2 }}
          >
            {filteredList.length >= displayedTraffic && (
              <Button
                variant="outlined"
                onClick={loadMore}
                sx={{
                  bgcolor: "#f9c20c",
                  color: "black",
                  "&:hover": { bgcolor: "#f9c20c" },
                }}
              >
                Load More
              </Button>
            )}
            {displayedTraffic > 15 && (
              <Button
                variant="outlined"
                onClick={showLess}
                sx={{
                  bgcolor: "#f9c20c",
                  color: "black",
                  "&:hover": { bgcolor: "#f9c20c" },
                }}
              >
                Show Less
              </Button>
            )}
          </Stack>
        </Container>
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={error}
        />
        <Snackbar
          open={!!success}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={success}
        />
      </main>
    </div>
  );
}

export default Tariff;