# WeatherPulse

A weather application that displays real-time weather information for Ukrainian cities. The application consists of a Python Flask backend deployed on Heroku and a React frontend deployed on GitHub Pages.

## Security Features

- Rate limiting to prevent abuse
- Secure CORS configuration
- Security headers with Flask-Talisman
- Environment-based configuration
- API key protection

## Prerequisites

- Node.js (version specified in .nvmrc)
- Python 3.8+
- Heroku CLI
- Git

## Backend Deployment (Heroku)

1. Login to Heroku:
```bash
heroku login
```

2. Set environment variables on Heroku:
```bash
heroku config:set OPENWEATHER_API_KEY=your_api_key
```

3. Deploy to Heroku:
```bash
git push heroku main
```

4. Verify the deployment:
```bash
heroku logs --tail
```

## Frontend Deployment (GitHub Pages)

1. Create `.env.production` file in `project/react-app/` (do not commit this file):
```
REACT_APP_API_BASE_URL=https://your-heroku-app.herokuapp.com
REACT_APP_BACKEND_URL=/data
REACT_APP_ENABLE_LOGGING=false
REACT_APP_UPDATE_INTERVAL=300000
```

2. Install dependencies:
```bash
cd project/react-app
npm install
```

3. Deploy to GitHub Pages:
```bash
npm run deploy
```

## Local Development

1. Backend Setup:
```bash
# Create virtual environment
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set environment variables
export OPENWEATHER_API_KEY=your_api_key  # On Windows: set OPENWEATHER_API_KEY=your_api_key

# Run server
python project/server/server.py
```

2. Frontend Setup:
```bash
cd project/react-app

# Install dependencies
npm install

# Create .env.development
echo "REACT_APP_API_BASE_URL=http://localhost:8000" > .env.development
echo "REACT_APP_BACKEND_URL=/data" >> .env.development

# Start development server
npm start
```

## Security Best Practices

1. Never commit sensitive information (API keys, credentials) to the repository
2. Use environment variables for configuration
3. Keep dependencies updated
4. Use HTTPS for all API communications
5. Implement rate limiting to prevent abuse
6. Configure CORS properly
7. Use security headers

## Maintenance

1. Regularly update dependencies:
```bash
# Frontend
npm audit
npm update

# Backend
pip list --outdated
pip install -U -r requirements.txt
```

2. Monitor Heroku logs:
```bash
heroku logs --tail
```

3. Check GitHub Pages deployment status in repository settings

## Troubleshooting

1. If the backend fails to start:
- Check if environment variables are set correctly
- Verify Heroku logs for errors
- Ensure all dependencies are installed

2. If frontend deployment fails:
- Check if gh-pages branch exists
- Verify GitHub Pages settings in repository
- Ensure homepage in package.json is correct

3. If API calls fail:
- Verify CORS settings
- Check rate limits
- Ensure API key is valid

## License

MIT
