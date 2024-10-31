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

2. Create configuration file:
```bash
cp config.template.py config.py
```

3. Edit `config.py` and add your OpenWeatherMap API key:
```python
API_KEY = "your_api_key_here"
```

4. Install Python dependencies:
```bash
pip3 install -r requirements.txt
```

5. Start the Flask server:
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

3. Start the development server:
```bash
npm start
```

The app will be available at http://localhost:3000 📊

## 🚀 Deployment 🚀

The frontend is deployed using GitHub Pages. To deploy updates:

1. Make your changes
2. Run the deploy command:
```bash
npm run deploy
```

The changes will be live at https://kyrylo2.github.io/WeatherPulse

## 🔒 Security Note 🔒

The `config.py` file containing your API key is excluded from version control for security 🔒. Never commit your API keys to the repository 🚫. Make sure to keep your API keys secure and private 🔑.

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

## 🤝 Contributing 🤝

If you would like to contribute to this project, please fork the repository and submit a pull request.

## 📜 License 📜

This project is licensed under the MIT License.
