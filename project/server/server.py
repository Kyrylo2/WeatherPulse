from flask import Flask, jsonify
from flask_cors import CORS
import threading
import queue
import requests
import time
import sys
import os
from config import API_KEY

app = Flask(__name__)
# Configure CORS to allow requests from GitHub Pages
CORS(app, resources={
    r"/data": {
        "origins": [
            "http://localhost:3000",
            "https://kyrylo2.github.io"
        ],
        "methods": ["GET", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# Dictionary to store the latest weather data for each city
weather_data = {}
data_lock = threading.Lock()

# List of Ukrainian cities
cities = ["Kyiv", "Lviv", "Odesa", "Dnipro", "Kharkiv"]

if not API_KEY:
    print("Error: API_KEY not set in config.py!")
    sys.exit(1)

def fetch_weather(city):
    """Fetch weather data for a given city and store it in the weather_data dict."""
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric&lang=en"
    try:
        print(f"Fetching weather data for {city}...")
        response = requests.get(url)
        if response.status_code == 200:
            with data_lock:
                weather_data[city] = response.json()
            print(f"Successfully fetched data for {city}")
        else:
            print(f"Error fetching data for {city}: Status code {response.status_code}")
            print(f"Response: {response.text}")
    except Exception as e:
        print(f"An error occurred while fetching data for {city}: {str(e)}", file=sys.stderr)

def weather_worker():
    """Thread worker function to continuously update weather data."""
    print("Weather worker thread started")
    while True:
        threads = []
        # Fetch data for all cities concurrently
        for city in cities:
            thread = threading.Thread(target=fetch_weather, args=(city,))
            threads.append(thread)
            thread.start()
        
        # Wait for all threads to complete
        for thread in threads:
            thread.join()
            
        # Wait 10 seconds before next update
        time.sleep(10)

@app.route('/data', methods=['GET'])
def get_data():
    """API endpoint to retrieve weather data."""
    print("Received request for weather data")
    try:
        with data_lock:
            # Return all available weather data
            data_list = list(weather_data.values())
        print(f"Returning {len(data_list)} weather records")
        return jsonify(data_list)
    except Exception as e:
        print(f"Error processing request: {str(e)}", file=sys.stderr)
        return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    print("Starting WeatherPulse server...")
    # Start the weather worker thread
    weather_thread = threading.Thread(target=weather_worker, daemon=True)
    weather_thread.start()
    print("Weather worker thread initialized")
    # Run the Flask server
    port = int(os.environ.get('PORT', 8000))
    print(f"Starting Flask server on port {port}...")
    app.run(host='0.0.0.0', port=port, debug=False)
