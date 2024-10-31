import React from 'react';
import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import { Cloud, WbSunny, Grain, Opacity, Air } from '@mui/icons-material';

function WeatherCard({ data }) {
  const theme = useTheme();

  const getWeatherIcon = (main) => {
    switch (main) {
      case 'Clouds':
        return <Cloud sx={{ fontSize: 40, color: theme.palette.primary.main }} />;
      case 'Clear':
        return <WbSunny sx={{ fontSize: 40, color: theme.palette.primary.main }} />;
      case 'Rain':
        return <Grain sx={{ fontSize: 40, color: theme.palette.primary.main }} />;
      default:
        return <Cloud sx={{ fontSize: 40, color: theme.palette.primary.main }} />;
    }
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 2 
        }}>
          {getWeatherIcon(data.weather[0].main)}
          <Box sx={{ ml: 2 }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              {data.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.weather[0].description}
            </Typography>
          </Box>
        </Box>

        <Typography variant="h4" component="div" sx={{ 
          mb: 2,
          fontWeight: 'medium',
          color: theme.palette.primary.dark
        }}>
          {Math.round(data.main.temp)}°C
        </Typography>

        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 1 
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: 1
          }}>
            <Opacity sx={{ color: theme.palette.primary.light }} />
            <Typography variant="body2" color="text.secondary">
              Вологість: {data.main.humidity}%
            </Typography>
          </Box>

          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: 1
          }}>
            <Air sx={{ color: theme.palette.primary.light }} />
            <Typography variant="body2" color="text.secondary">
              Вітер: {data.wind.speed} м/с
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default WeatherCard;
