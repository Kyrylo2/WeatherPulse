# 🌞 WeatherPulse 🌞

A real-time weather dashboard for Ukrainian cities built with React and Flask 🚀

## 🌍 Live Demo

Visit the live application at: https://kyrylo2.github.io/WeatherPulse

## 🌈 Features 🌈

- Real-time weather updates for major Ukrainian cities:
  - Kyiv 🏛️
  - Lviv 🎭
  - Odesa 🌊
  - Dnipro 🌉
  - Kharkiv 🏰
- Automatic updates every 10 seconds ⏰
- Display of temperature, humidity, wind speed, and weather conditions 🌡️
- Clean, modern UI using Material-UI components 💻

## 📚 Setup 📚

### 📁 Backend Setup 📁

1. Navigate to the server directory:
```bash
cd project/server
```

2. Install Python dependencies:
```bash
pip3 install -r requirements.txt
```

3. Set environment variable:
```bash
export OPENWEATHERMAP_API_KEY="your_api_key_here"
```

4. Start the Flask server:
```bash
python3 server.py
```

The server will run on port 8000 📈

### 📁 Frontend Setup 📁

1. Navigate to the React app directory:
```bash
cd project/react-app
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Environment Configuration:
   - For development: `.env.development` configures the API URL to `http://localhost:8000`
   - For production: `.env.production` configures the API URL to your deployed backend URL

4. Start the development server:
```bash
npm start
```

The app will be available at http://localhost:3000 📊

## 🚀 Deployment 🚀

### Backend Deployment (Heroku)

1. Create a new Heroku app:
```bash
heroku create weatherpulse-backend
```

2. Set the OpenWeatherMap API key:
```bash
heroku config:set OPENWEATHERMAP_API_KEY="your_api_key_here"
```

3. Deploy the backend:
```bash
git subtree push --prefix project/server heroku main
```

The backend will be available at `https://weatherpulse-backend.herokuapp.com`

### Frontend Deployment (GitHub Pages)

1. Update the backend URL in `.env.production` to point to your deployed backend:
```
REACT_APP_API_URL=https://your-backend-url.herokuapp.com
```

2. Deploy to GitHub Pages:
```bash
cd project/react-app
npm run deploy
```

The frontend will be deployed to https://kyrylo2.github.io/WeatherPulse

## 🔒 Security Note 🔒

Never commit your API keys to the repository 🚫. Always use environment variables for sensitive data 🔑.

## 📊 API Rate Limiting 📊

This application is designed to work within the OpenWeatherMap API free tier limits:
- Maximum 60 calls per minute ⏰
- Current implementation:
  - 5 cities updated every 10 seconds ⏰
  - Total: ~30 API calls per minute 📊

## 💻 Development 💻

- Backend: Flask with Python 3 🐍
- Frontend: React with Material-UI 📈
- API: OpenWeatherMap 🌡️
- Real-time updates using threading and queue system 🕒
- Environment-specific configuration using `.env` files

## 🤝 Contributing 🤝

If you would like to contribute to this project, please fork the repository and submit a pull request.

## 📜 License 📜

This project is licensed under the MIT License.
