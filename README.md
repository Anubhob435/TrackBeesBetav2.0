# Campus Navigation System

A web-based campus navigation system built with Flask, OlaMaps API, and MySQL. This application provides interactive maps, route planning, and real-time navigation features for university campuses.

## Features

- 🗺️ Interactive campus map using OlaMaps API
- 🔍 Search and autocomplete functionality
- 🚶‍♂️ Route calculation between points
- 🌓 Light/Dark mode toggle
- 💬 AI-powered chat assistance using Gemini API
- 👥 User authentication system
- 📱 Responsive design for mobile and desktop

## Prerequisites

- Python 3.8 or higher
- MySQL Database
- OlaMaps API key
- Gemini API key

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
Create a `.env` file in the root directory and add:
```
GEMINI_API_KEY=your_gemini_api_key
```

4. Set up the MySQL database:
- Use the provided credentials in app.py
- Database will be automatically initialized on first run

## Running the Application

1. Start the Flask server:
```bash
python app.py
```

2. Access the application:
Open your browser and navigate to `http://localhost:5000`

## Project Structure

```
project/
├── app.py              # Main Flask application
├── static/
│   ├── js/            # JavaScript files
│   ├── css/           # Stylesheets
│   └── data/          # JSON data files
├── templates/         # HTML templates
├── requirements.txt   # Project dependencies
└── .env              # Environment variables
```

## API Integration

- OlaMaps API for mapping and navigation
- Gemini API for AI chat assistance
- MySQL database for user management

## Security Notes

- Sensitive credentials should be stored in environment variables
- API keys should be kept confidential
- User passwords are stored securely in the database

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
