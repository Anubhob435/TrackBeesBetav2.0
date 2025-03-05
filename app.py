from flask import Flask, request, jsonify, render_template, redirect, url_for, session
import requests
import json
import os
import mysql.connector
from dotenv import load_dotenv
import googlemaps

load_dotenv()  # Load environment variables from .env file

app = Flask(__name__, static_url_path='/static')
app.secret_key = 'your_secret_key'  # Required for session management


# Update imports
import google.generativeai as genai

# Get the Gemini API key from environment variables
gemini_api_key = os.getenv('GEMINI_API_KEY')
if not gemini_api_key:
    raise ValueError("GEMINI_API_KEY not found in environment variables. Make sure it's set in the .env file.")

# Configure Gemini with the API key
genai.configure(api_key=gemini_api_key)

# Define a model
model = genai.GenerativeModel('gemini-1.5-flash')


#
# Constants for database connection
DB_HOST = "buh89x1pi8cgvaw4161i-mysql.services.clever-cloud.com"
DB_USER = "ucwyejivetooukiz"
DB_PASSWORD = "aAo8DieytbUo0FiYV4RY"
DB_NAME = "buh89x1pi8cgvaw4161i"

INITIAL_BALANCE = 3000

# Function to connect to the database
def connect_to_db():
    return mysql.connector.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME
    )

API_KEY = 'rxS3WOVB7zNbC0kvfLtpljJVa6lAqoIZpoqsytwU'
REQUEST_ID = 'YOUR_REQUEST_ID'

# Route to serve the main index page
@app.route('/')
def index():
    return render_template('index.html')

# Route to handle form submission
@app.route('/submit', methods=['POST'])
def submit():
    destination1 = request.form.get('destination1')
    destination2 = request.form.get('destination2')
    return f"<h1>Destination 1: {destination1}, Destination 2: {destination2}</h1>"



# Remove the duplicate chat route and update the API endpoint
@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        message = request.json.get('message')
        if not message:
            return jsonify({'error': 'No message provided'}), 400

        # Generate response using Gemini
        response = model.generate_content(message)
        
        # Check if response has text attribute
        if hasattr(response, 'text'):
            return jsonify({'response': response.text})
        else:
            # Handle the case where response might be in a different format
            return jsonify({'response': str(response)})
            
    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")  # For debugging
        return jsonify({'error': 'Failed to get response from AI'}), 500

@app.route('/chat')
def chat_page():
    return render_template('chat/chat.html')

# Route to handle search
@app.route('/search', methods=['POST'])
def search():
    search_query = request.form.get('search_query')
    return f"<h1>You searched for: {search_query}</h1>"

# Route to get route information
@app.route('/get_route', methods=['POST'])
def get_route():
    data = request.get_json()
    origin = data.get('origin')
    destination = data.get('destination')

    print(origin, destination)

    if not origin or not destination:
        return jsonify({'error': 'Origin and destination are required'}), 400

    try:
        origin_lat, origin_lng = map(float, origin.split(','))
        destination_lat, destination_lng = map(float, destination.split(','))

        url = f'https://api.olamaps.io/routing/v1/directions/basic?origin={origin_lat},{origin_lng}&destination={destination_lat},{destination_lng}&api_key={API_KEY}'

        response = requests.post(url, headers={'X-Request-Id': REQUEST_ID})
        response_data = response.json()

        if 'routes' not in response_data or len(response_data['routes']) == 0:
            return jsonify({'error': 'No route found'}), 404

        route = response_data['routes'][0]
        distance = route['summary']['distance']
        duration = route['summary']['duration']
        steps = [step['instruction'] for step in route['legs'][0]['steps']]

        route_info = {
            'distance': distance,
            'duration': duration,
            'steps': steps
        }

        os.makedirs(os.path.join(app.root_path, 'static/js'), exist_ok=True)

        with open(os.path.join(app.root_path, 'static/js/route.json'), 'w') as json_file:
            json.dump(route_info, json_file, indent=4)

        return jsonify({'message': 'Route information saved to static/js/route.json'})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Route for registration page
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        firstname = request.form['firstname']
        lastname = request.form['lastname']
        username = request.form['username']
        phone = request.form['phone']
        email = request.form['email']
        password = request.form['password']
        role = request.form['role']
        name = f"{firstname} {lastname}"

        conn = connect_to_db()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO users (username, password, role, first_name, last_name, email, phone_number) VALUES (%s, %s, %s, %s, %s, %s, %s)",
            (username, password, role, firstname, lastname, email, phone)
        )
        conn.commit()
        cursor.close()
        conn.close()

        return redirect(url_for('index'))  # Changed to redirect to index page

    return render_template('register.html')

# Route for login page
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        phone = request.form['phone']
        password = request.form['password']

        conn = connect_to_db()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE phone_number = %s", (phone,))
        user = cursor.fetchone()
        cursor.close()
        conn.close()

        if user:
            if user[2] == password:
                session['user_id'] = user[0]  # Store user ID in session
                return redirect(url_for('afterlog'))
            else:
                return render_template('login.html', error_message="Incorrect password. Please try again.")
        else:
            return render_template('login.html', error_message="Account not found. Please check your phone number.")

    return render_template('login.html')

# Route for the map page
@app.route('/map')
def map():
    return render_template('map.html')

# Route for the busgroup page
@app.route('/busgroup')
def busgroup():
    return render_template('busgroup.html')

# Route for the busradio page
@app.route('/busradio')
def busradio():
    return render_template('busradio.html')

# Route for the afterlog page (tiles.html)
@app.route('/afterlog')
def afterlog():
    return render_template('afterlog/tiles.html')

# Route for the UI page
@app.route('/ui')
def ui():
    return render_template('ui.html')

# Route for the need help page
@app.route('/needhelp')
def needhelp():
    return render_template('needhelp.html')

# API route to serve the coordinates from JSON
@app.route('/api/coordinates')
def get_coordinates():
    with open('data/coordinates.json') as f:
        data = f.read()
    return jsonify(data)

# Additional API routes for other data files if needed
@app.route('/api/themes')
def get_themes():
    with open('data/themes.json') as f:
        data = f.read()
    return jsonify(data)

@app.route('/api/darkmode')
def get_darkmode_styles():
    with open('data/dark-mode-style.json') as f:
        data = f.read()
    return jsonify(data)

@app.route('/save_selected_location', methods=['POST'])
def save_selected_location():
    location = request.json
    try:
        with open('static/js/route.json', 'r+') as file:
            data = json.load(file)
            data['routeData'].append(location)
            file.seek(0)
            json.dump(data, file, indent=4)
        return jsonify({"message": "Selected location saved successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/save_route_json', methods=['POST'])
def save_route_json():
    route_data = request.json
    try:
        with open('static/js/route.json', 'w') as file:
            json.dump(route_data, file, indent=4)
        return jsonify({"message": "Route data saved successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/save_top_suggestion', methods=['POST'])
def save_top_suggestion():
    suggestion = request.json
    try:
        with open('static/js/top_suggestion.json', 'w') as file:
            json.dump(suggestion, file, indent=4)
        return jsonify({"message": "Top suggestion saved successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/save_top_suggestion_1', methods=['POST'])
def save_top_suggestion_1():
    suggestion = request.json
    try:
        with open('static/js/top_suggestion_1.json', 'w') as file:
            json.dump(suggestion, file, indent=4)
        return jsonify({"message": "Top suggestion for destination 1 saved successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/save_top_suggestion_2', methods=['POST'])
def save_top_suggestion_2():
    suggestion = request.json
    try:
        with open('static/js/top_suggestion_2.json', 'w') as file:
            json.dump(suggestion, file, indent=4)
        return jsonify({"message": "Top suggestion for destination 2 saved successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/get_route_from_suggestions', methods=['POST'])
def get_route_from_suggestions():
    try:
        with open('static/js/top_suggestion_1.json', 'r') as file:
            suggestion1 = json.load(file)
        with open('static/js/top_suggestion_2.json', 'r') as file:
            suggestion2 = json.load(file)

        origin_lat = suggestion1['geometry']['location']['lat']
        origin_lng = suggestion1['geometry']['location']['lng']
        destination_lat = suggestion2['geometry']['location']['lat']
        destination_lng = suggestion2['geometry']['location']['lng']

        url = "https://api.olamaps.io/routing/v1/directions"
        api_key = API_KEY
        x_request_id = REQUEST_ID

        params = {
            'origin': f'{origin_lat},{origin_lng}',
            'destination': f'{destination_lat},{destination_lng}',
            'api_key': api_key
        }

        headers = {
            'X-Request-Id': x_request_id
        }

        response = requests.post(url, headers=headers, params=params)

        if response.status_code == 200:
            data = response.json()
            overview_polyline = data['routes'][0]['overview_polyline']

            # Decode the polyline
            decoded_points = googlemaps.convert.decode_polyline(overview_polyline)

            # Convert decoded points to a list of (longitude, latitude) tuples
            points_list = [[point['lng'], point['lat']] for point in decoded_points]

            with open('static/js/coordinates.json', 'w') as json_file:
                json.dump(points_list, json_file)

            return jsonify({'message': 'Route information saved to static/js/coordinates.json', 'draw_polygon': True})

        else:
            return jsonify({'error': f"Request failed with status code: {response.status_code}", 'details': response.text}), 500

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Running the app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
