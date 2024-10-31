import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ThemeProvider } from '@mui/material/styles';
import WeatherCard from './WeatherCard';
import { AppBar, Toolbar, Typography, Container, Grid, Box } from '@mui/material';
import theme from './theme';

function App() {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios.get('http://localhost:8000/data')
        .then(response => {
          setWeatherData(response.data);
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    };

    fetchData();
    // Update every 10 seconds to match backend's update cycle
    const interval = setInterval(fetchData, 10000);

    return () => clearInterval(interval);
  }, []);

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
