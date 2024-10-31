import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ThemeProvider } from '@mui/material/styles';
import WeatherCard from './WeatherCard';
import { AppBar, Toolbar, Typography, Container, Grid, Box } from '@mui/material';
import theme from './theme';

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/data`);
        setWeatherData(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Unable to fetch weather data. Please try again later.");
        // Don't update weatherData on error to keep showing last valid data
      }
    };

    fetchData();
    // Update every 10 seconds to match backend's update cycle
    const interval = setInterval(fetchData, 10000);

    return () => clearInterval(interval);
  }, [API_URL]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        minHeight: '100vh',
        backgroundColor: 'background.default',
        pb: 4
      }}>
        <AppBar position="static" elevation={0}>
          <Toolbar>
            <Typography 
              variant="h6" 
              component="div"
              sx={{ 
                fontWeight: 'bold',
                letterSpacing: 1
              }}
            >
              Погода України
            </Typography>
          </Toolbar>
        </AppBar>
        <Container sx={{ mt: 4 }}>
          {error && (
            <Typography 
              color="error" 
              align="center" 
              sx={{ mb: 2 }}
            >
              {error}
            </Typography>
          )}
          <Grid container spacing={3}>
            {weatherData.map((data, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <WeatherCard data={data} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
