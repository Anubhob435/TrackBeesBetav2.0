import requests
import googlemaps
import json

# Define the API endpoint and parameters
url = "https://api.olamaps.io/routing/v1/directions"
api_key = "rxS3WOVB7zNbC0kvfLtpljJVa6lAqoIZpoqsytwU"  # Replace with your actual API key
x_request_id = "your_request_id_here"  # Replace with your actual request ID

# Parameters without waypoints
params = {
    'origin': ' 22.459057, 88.379041',
    'destination': '22.560322, 88.490434',
    'api_key': api_key
}
# Headers
headers = {
    'X-Request-Id': x_request_id
}

# Make the POST request
response = requests.post(url, headers=headers, params=params)

# Check if the request was successful
if response.status_code == 200:

    data = response.json()
    overview_polyline = data['routes'][0]['overview_polyline']
    
    # Decode the polyline
    decoded_points = googlemaps.convert.decode_polyline(overview_polyline)
    
    # Convert decoded points to a list of (longitude, latitude) tuples
    points_list = [[point['lng'], point['lat']] for point in decoded_points]

    with open('data.json', 'w') as json_file:
    # Step 3: Convert the Python array to JSON and write it to the file
        json.dump(points_list, json_file)

    print("Array has been written to data.json")
    
    print(points_list)

else:
    print(f"Request failed with status code: {response.status_code}")
    print(response.text)  # Display the error message
