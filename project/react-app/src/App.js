import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { ThemeProvider } from '@mui/material/styles';
import WeatherCard from './WeatherCard';
import { AppBar, Toolbar, Typography, Container, Grid, Box } from '@mui/material';
import theme from './theme';

const CITIES = ["Kyiv", "Lviv", "Odesa", "Dnipro", "Kharkiv"];

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(null);

  const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

  const fetchWeatherData = useCallback(async () => {
    if (!API_KEY) {
      setError("API key is not configured");
      return;
    }

    try {
      const promises = CITIES.map(city =>
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=en`)
      );
      
      const responses = await Promise.all(promises);
      setWeatherData(responses.map(response => response.data));
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Unable to fetch weather data. Please try again later.");
    }
  }, [API_KEY]);

  useEffect(() => {
    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 10000);
    return () => clearInterval(interval);
  }, [fetchWeatherData]);

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
