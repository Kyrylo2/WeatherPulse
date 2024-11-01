import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog } from 'weather-icons-react';

function WeatherCard({ data }) {
  if (!data) return null;

  const getWeatherIcon = (weatherId) => {
    const iconProps = { size: 48, color: '#1976d2' };
    
    if (weatherId >= 200 && weatherId < 300) return <WiThunderstorm {...iconProps} />;
    if (weatherId >= 300 && weatherId < 600) return <WiRain {...iconProps} />;
    if (weatherId >= 600 && weatherId < 700) return <WiSnow {...iconProps} />;
    if (weatherId >= 700 && weatherId < 800) return <WiFog {...iconProps} />;
    if (weatherId === 800) return <WiDaySunny {...iconProps} />;
    if (weatherId > 800) return <WiCloudy {...iconProps} />;
    
    return <WiDaySunny {...iconProps} />;
  };

  return (
    <Card elevation={3}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {data.weather && data.weather[0] && getWeatherIcon(data.weather[0].id)}
          <Box sx={{ ml: 2 }}>
            <Typography variant="h6" component="div">
              {data.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.weather && data.weather[0] ? data.weather[0].description : ''}
            </Typography>
          </Box>
        </Box>

        <Typography variant="h4" component="div" sx={{ mb: 2 }}>
          {data.main ? `${Math.round(data.main.temp)}°C` : ''}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            Humidity: {data.main ? `${data.main.humidity}%` : ''}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Wind: {data.wind ? `${data.wind.speed} m/s` : ''}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default WeatherCard;
