# WeatherPulse 🌞

A weather application that fetches data for the following cities:

* Kyiv 🇺🇦
* Lviv 🇺🇦
* Odesa 🇺🇦
* Dnipro 🇺🇦
* Kharkiv 🇺🇦

## Features

* Fetches weather data from the OpenWeatherMap API 🌡️
* Updates weather data every 10 seconds ⏰
* Displays weather data in a user-friendly format 📊

## Technologies Used

* Python 🐍
* Flask 🌟
* OpenWeatherMap API 🌡️

## Prerequisites

* Python 3.8 or higher 🐍
* pip package manager 📦
* Node.js and npm for the React app 📈

## Installation

1. Clone the repository 📁
2. Install the required dependencies using `pip install -r requirements.txt` 📦
3. Install the required dependencies for the React app using `npm install` 📈
4. Create a new file called `config.py` and add your OpenWeatherMap API key 📝

## Running the Project

1. Run the Flask server using `python server.py` 🌟
2. Run the React app using `npm start` 📈

## API Endpoints

* `/data`: Returns the weather data for all cities 🌡️

## Notes

* The application uses a queue to store the weather data 📝
* The weather data is updated every 10 seconds ⏰

### Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request 🤝

### License

This project is licensed under the MIT License 📜
