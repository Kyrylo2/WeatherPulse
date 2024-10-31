from flask import Flask, jsonify
from flask_cors import CORS
import threading
import queue
import requests
import time
import sys
import os

app = Flask(__name__)
CORS(app)

# Queue to store weather data
data_queue = queue.Queue()

# List of Ukrainian cities
cities = ["Kyiv", "Lviv", "Odesa", "Dnipro", "Kharkiv"]

# Check for config file and API key
try:
    from config import API_KEY
except ImportError:
    print("Error: config.py not found!")
    print("Please copy config.template.py to config.py and add your OpenWeatherMap API key")
    sys.exit(1)

if not API_KEY or API_KEY == "your_api_key_here":
    print("Error: Invalid API key!")
    print("Please update config.py with your OpenWeatherMap API key")
    sys.exit(1)

def fetch_weather(city):
    """Fetch weather data for a given city and put it into the queue."""
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric&lang=en"
    try:
        print(f"Fetching weather data for {city}...")
        response = requests.get(url)
        if response.status_code == 200:
            data_queue.put(response.json())
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
        # This makes 30 requests per minute (5 cities × 6 cycles)
        # Still well within the 60 calls/minute limit
        time.sleep(10)

@app.route('/data', methods=['GET'])
def get_data():
    """API endpoint to retrieve weather data from the queue."""
    print("Received request for weather data")
    data_list = []
    while not data_queue.empty():
        data_list.append(data_queue.get())
    print(f"Returning {len(data_list)} weather records")
    return jsonify(data_list)

if __name__ == '__main__':
    print("Starting WeatherPulse server...")
    # Start the weather worker thread
    weather_thread = threading.Thread(target=weather_worker, daemon=True)
    weather_thread.start()
    print("Weather worker thread initialized")
    # Run the Flask server
    print("Starting Flask server on port 8000...")
    app.run(host='0.0.0.0', port=8000, debug=False)
