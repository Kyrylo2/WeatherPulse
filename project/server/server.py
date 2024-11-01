from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_talisman import Talisman
import threading
import requests
import time
import sys
import os

app = Flask(__name__)

# Security headers with Talisman
Talisman(app, 
    content_security_policy={
        'default-src': "'self'",
        'img-src': '*',
        'connect-src': ["'self'", "https://api.openweathermap.org"]
    },
    force_https=True
)

# Rate limiting
limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    default_limits=["100 per day", "10 per minute"]
)

# Get API key from environment variable
API_KEY = os.environ.get('OPENWEATHER_API_KEY')
if not API_KEY:
    print("Error: OPENWEATHER_API_KEY environment variable not set!")
    sys.exit(1)

# Configure CORS with specific origins
ALLOWED_ORIGINS = [
    "https://kyrylo2.github.io",
    "http://localhost:3000"  # for development
]

CORS(app, resources={
    r"/data": {
        "origins": ALLOWED_ORIGINS,
        "methods": ["GET", "OPTIONS"],
        "allow_headers": ["Content-Type"],
        "max_age": 3600
    }
})

# Dictionary to store the latest weather data for each city
weather_data = {}
data_lock = threading.Lock()

# List of Ukrainian cities
cities = ["Kyiv", "Lviv", "Odesa", "Dnipro", "Kharkiv"]

def fetch_weather(city):
    """Fetch weather data for a given city and store it in the weather_data dict."""
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric&lang=en"
    try:
        print(f"Fetching weather data for {city}...")
        response = requests.get(url, timeout=10)  # Added timeout
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
            
        # Wait before next update (increased to reduce API calls)
        time.sleep(300)  # 5 minutes

@app.route('/data', methods=['GET'])
@limiter.limit("10 per minute")  # Rate limiting per endpoint
def get_data():
    """API endpoint to retrieve weather data."""
    try:
        # Validate request origin
        origin = request.headers.get('Origin', '')
        if origin and origin not in ALLOWED_ORIGINS:
            return jsonify({"error": "Unauthorized"}), 403

        with data_lock:
            data_list = list(weather_data.values())
        
        if not data_list:
            return jsonify({"error": "No weather data available"}), 503
            
        return jsonify(data_list)
    except Exception as e:
        print(f"Error processing request: {str(e)}", file=sys.stderr)
        return jsonify({"error": "Internal server error"}), 500

@app.errorhandler(429)
def ratelimit_handler(e):
    """Handle rate limit exceeded errors."""
    return jsonify({"error": "Rate limit exceeded"}), 429

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
