const olaMaps = new OlaMapsSDK.OlaMaps({
    apiKey: 'rxS3WOVB7zNbC0kvfLtpljJVa6lAqoIZpoqsytwU' // Replace with your API key
});

let draggableMarker;
let myMap;
let markers = [];
let for_coor1 = [];
let for_coor2 = [];
let startLocation, endLocation;


const lightStyle = "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json";
const darkStyle = "https://api.olamaps.io/tiles/vector/v1/styles/default-dark-standard/style.json";

const searchNearbyBtn = document.getElementById('search-nearby-btn');
const searchBox = document.getElementById('search-box');

searchNearbyBtn.addEventListener('click', () => {
    searchBox.classList.toggle('hidden');
    searchBox.style.display = searchBox.style.display === 'block' ? 'none' : 'block';
});



function initializeMap(lat, lng) {
    myMap = olaMaps.init({
        style: "https://api.olamaps.io/tiles/vector/v1/styles/default-dark-standard/style.json", // Changed to dark style
        container: 'map',
        center: [lng, lat], // Note: [longitude, latitude]
        zoom: 15,
    });
    document.getElementById('map').style.display = 'block'; // Show map after initialization

    const coordinatesBox = document.getElementById('coordinates');
    coordinatesBox.innerText = `Coordinates: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;

    const navigationControls = olaMaps.addNavigationControls({
        showCompass: true,
        showZoom: true,
        visualizePitch: true,
    });

    myMap.addControl(navigationControls);
    myMap.dragRotate.enable(); // By default rotation is enabled

    // Add the line route to the map

    draggableMarker = olaMaps
        .addMarker({
            offset: [0, 6],
            anchor: 'bottom',
            color: 'Purple',
            draggable: true,
        })
        .setLngLat([lng, lat])
        .addTo(myMap);

    draggableMarker.on('drag', () => {
        const markerLngLat = draggableMarker.getLngLat();
        coordinatesBox.innerText = `Coordinates: ${markerLngLat.lat.toFixed(6)}, ${markerLngLat.lng.toFixed(6)}`;
    });

    function createBlackMarker(lng, lat, popupContent) {
        // Create the black marker
        const marker = olaMaps
          .addMarker({
            offset: [0, 6],
            anchor: 'bottom',
            color: 'black',
          })
          .setLngLat([lng, lat])
          .addTo(myMap);
      
        // Create and attach the popup to the marker
        const popup = olaMaps
          .addPopup({ offset: [0, -30], anchor: 'bottom' })
          .setHTML(`<div>${popupContent}</div>`);
      
        marker.setPopup(popup);
      
        // Add an event listener to toggle the popup when the marker is clicked
        marker.getElement().addEventListener('click', () => {
          popup.toggle();
        });
      
        return marker;
      }
      
      // Create markers with popups
      createBlackMarker(88.48991212354463, 22.56012824425916, 'University Of Engineering and Management, Kolkata');
      createBlackMarker(75.70074675144811, 27.212717721567905, 'University Of Engineering and Management, Jaipur');
      createBlackMarker(88.43049356248162, 22.57063063332899, 'IEM Ashram Building');
      createBlackMarker(88.43427805622171, 22.57499884931152, 'IEM Gurukul');
      createBlackMarker(88.43725556232607, 22.573225884222573, 'IEM Kolkata');
      
    setupGoBackButton();
}

function toggleMapStyle() {
    const sidePanel = document.getElementById('side-panel');
    const mapElement = document.getElementById('map');
    const isLightStyle = myMap.getStyle().sprite.includes("light");

    // Add fade effect
    mapElement.classList.add('fade');
    sidePanel.classList.add('fade');

    setTimeout(() => {
        const newStyle = isLightStyle
            ? "https://api.olamaps.io/tiles/vector/v1/styles/default-dark-standard/style.json"
            : "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json";

        myMap.setStyle(newStyle);

        // Remove fade class after style update
        setTimeout(() => {
            mapElement.classList.remove('fade');
            sidePanel.classList.remove('fade');
        }, 2000); // Match CSS fade duration
    }, 100); // Delay before switching styles
}

function setupGoBackButton() {
    const goBackButton = document.getElementById('go-back-btn');
    goBackButton.addEventListener('click', () => {
        if (draggableMarker) {
            const markerLngLat = draggableMarker.getLngLat();
            myMap.flyTo({
                center: [markerLngLat.lng, markerLngLat.lat],
                zoom: 15,
                duration: 1000 // Animation duration in milliseconds
            });
        } else {
            alert('Draggable marker not found.');
        }
    });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            startLocation = [lat, lng];
            initializeMap(lat, lng);
        }, function() {
            alert("Unable to retrieve your location");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// For testing with specific coordinates (22.560167875602794, 88.48990139531011)
initializeMap(22.560167875602794, 88.48990139531011);

function debounce(func, delay) {
    let debounceTimer;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
}


function handleAutocomplete(inputId, suggestionsId) {
    const inputElement = document.getElementById(inputId);
    const suggestionsElement = document.getElementById(suggestionsId);

    inputElement.addEventListener(
        'input',
        debounce(function () {
            const input = inputElement.value;
            const apiKey = 'rxS3WOVB7zNbC0kvfLtpljJVa6lAqoIZpoqsytwU';
            const url = `https://api.olamaps.io/places/v1/autocomplete?input=${encodeURIComponent(
                input
            )}&api_key=${apiKey}`;

            fetch(url, {
                method: 'GET',
                headers: {
                    'X-Request-Id': 'YOUR_REQUEST_ID',
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    suggestionsElement.innerHTML = ''; // Clear previous suggestions

                    if (data.predictions && data.predictions.length > 0) {
                        data.predictions.forEach((prediction) => {
                            const item = document.createElement('div');
                            item.className = 'suggestion-item';
                            item.textContent = prediction.description;

                            // Handle the click event
                            item.addEventListener('click', () => {
                                const location = prediction.geometry?.location;
                                if (location) {
                                    const lat = location.lat;
                                    const lng = location.lng;

                                    // Move the map to the selected location
                                    myMap.flyTo({
                                        center: [lng, lat],
                                        zoom: 15,
                                        duration: 1000,
                                    });

                                    // Place a red marker
                                    const marker = olaMaps
                                        .addMarker({
                                            offset: [0, 6],
                                            anchor: 'bottom',
                                            color: 'red',
                                        })
                                        .setLngLat([lng, lat])
                                        .addTo(myMap);

                                    // Add a popup with the selected place name
                                    const popup = olaMaps
                                        .addPopup({ offset: [0, -30], anchor: 'bottom' })
                                        .setHTML(`<div>${prediction.description}</div>`);

                                    marker.setPopup(popup);
                                    popup.toggle();

                                    // Clear suggestions
                                    suggestionsElement.innerHTML = '';
                                    inputElement.value = ''; // Optional: Clear the input field
                                } else {
                                    console.error('Location details missing for this prediction.');
                                }
                            });

                            suggestionsElement.appendChild(item);
                        });
                    } else {
                        const item = document.createElement('div');
                        item.className = 'suggestion-item';
                        item.textContent = 'No results found';
                        suggestionsElement.appendChild(item);
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }, 300)
    );

    let origin = null;
    let destination = null;
    
    function handleClickOnMap(event) {
        const lat = event.latlng.lat;
        const lng = event.latlng.lng;
    
        if (!origin) {
            // Set origin on first click
            origin = `${lat},${lng}`;
            console.log("Origin set:", origin);
        } else if (!destination) {
            // Set destination on second click
            destination = `${lat},${lng}`;
            console.log("Destination set:", destination);
            // Call the Flask API to get the route
            fetchRoute(origin, destination);
        }
    }
    
    function fetchRoute(origin, destination) {
        fetch('/get_route', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ origin, destination })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message);  // Success message
            } else {
                alert("Error: " + data.error);  // Error message
            }
        })
        .catch(error => console.error('Error fetching route:', error));
    }
    
    // Assuming you're using a map like Leaflet, attach the click event to the map.
    myMap.on('click', handleClickOnMap);
    
 // Hide suggestions if the user clicks outside the input or suggestions box
    document.addEventListener('click', (event) => {
        if (
            !suggestionsElement.contains(event.target) &&
            event.target !== inputElement
        ) {
            suggestionsElement.innerHTML = ''; // Clear suggestions
        }
    });
}


//let x_coordinates = [88.48984775052655, 22.560128244259160];
//let y_coordinates = [88.48745859470952, 22.596744505519403];
//let coordinates = [];
      

              
function drawPolygon() {
    console.log('Fetching the JSON file...');

    fetch('static/data/data.json')
        .then(response => response.json())
        .then(data => {
            console.log('Parsing the JSON data...');
            const x = data; // Ensure this is an array of coordinates

            console.log('Data:', x); // Output the array to verify

            // Add source and layer directly, assuming the map is already loaded
            if (myMap.getSource('route')) {
                myMap.removeLayer('route');
                myMap.removeSource('route');
            }

            myMap.addSource('route', {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'LineString',
                        coordinates: x,
                    },
                },
            });

            myMap.addLayer({
                id: 'route',
                type: 'line',
                source: 'route',
                layout: { 'line-join': 'round', 'line-cap': 'round' },
                paint: {
                    'line-color': '#f00',
                    'line-width': 4,
                },
            });
        })
        .catch(error => console.error('Error:', error.message));
}

// Ensure the map is loaded before calling drawPolygon
myMap.on('load', function() {
    document.getElementById('calculate-route-btn').disabled = false;
});



function calculateRoute(start, end) {
    const apiKey = 'rxS3WOVB7zNbC0kvfLtpljJVa6lAqoIZpoqsytwU'; // Replace with your API key
    const requestId = 'YOUR_REQUEST_ID'; // Replace with a unique request ID
    const url = `https://api.olamaps.io/routing/v1/directions?origin=${start[1]},${start[0]}&destination=${end[1]},${end[0]}&api_key=${apiKey}`;

    fetch(url, {
        method: 'GET',
        headers: {
            'X-Request-Id': requestId
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.routes && data.routes.length > 0) {
            const route = data.routes[0];
            const distance = route.distance.text;
            const duration = route.duration.text;
            
            alert(`Distance: ${distance}, Duration: ${duration}`);

            if (route.geometry) {
                addRouteToMap(route.geometry);
            } else {
                console.error('No geometry found in the route data');
            }
        } else {
            alert('No route found between these locations.');
        }
    })
    .catch(error => {
        console.error('Error calculating route:', error);
    });
}

getLocation();
handleAutocomplete('autocomplete-input-1', 'suggestions-1');
handleAutocomplete('autocomplete-input-2', 'suggestions-2');

window.addEventListener('load', () => {
    const overlay = document.getElementById('animation-overlay');
    overlay.classList.add('hidden');
    setTimeout(() => {
        document.getElementById('map').style.display = 'block';
    }, 1000);
});
