const apiUrl = 'https://free-ap-south-1.cosmocloud.io/development/api/geodata';
const headers = {
    'Content-Type': 'application/json',
    'projectId': '67081f88fc3c8a64f75beab4',
    'environmentId': '6706553059c9b368f802aa16'
};

// Function to fetch all GeoData and display it
function fetchGeoData() {
    document.getElementById('loadingMessage').style.display = 'block'; // Show loading message

    fetch(apiUrl, {
        method: 'GET',
        headers: headers
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch GeoData');
        }
        return response.json();
    })
    .then(data => {
        const geoDataList = document.getElementById('geoDataList');
        geoDataList.innerHTML = ''; // Clear the list before displaying new data

        data.forEach(location => {
            const listItem = document.createElement('li');
            listItem.textContent = `Location: ${location.locationName}, Lat: ${location.latitude}, Long: ${location.longitude}`;
            geoDataList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    })
    .finally(() => {
        document.getElementById('loadingMessage').style.display = 'none'; // Hide loading message
    });
}

// Function to add a new location
function addLocation(event) {
    event.preventDefault(); // Prevent the default form submission

    const locationName = document.getElementById('locationName').value;
    const latitude = parseFloat(document.getElementById('latitude').value);
    const longitude = parseFloat(document.getElementById('longitude').value);

    const newLocation = {
        locationName: locationName,
        latitude: latitude,
        longitude: longitude
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(newLocation) // Convert the object to a JSON string
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add new location'); // Handle non-200 response
        }
        return response.json(); // Parse the JSON response
    })
    .then(data => {
        console.log('Location added:', data); // Log the response
        fetchGeoData(); // Refresh the list of locations
    })
    .catch(error => {
        console.error('Error:', error); // Log any errors
    });
}

// Function to fetch GeoData by ID
function fetchGeoDataById(id) {
    fetch(`${apiUrl}/${id}`, {
        method: 'GET',
        headers: headers
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch GeoData by ID');
        }
        return response.json();
    })
    .then(data => {
        console.log('Fetched GeoData by ID:', data);
        // Process the data as needed
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Function to update a GeoData entry
function updateGeoData(id, updatedLocation) {
    fetch(`${apiUrl}/${id}`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(updatedLocation)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update GeoData');
        }
        return response.json();
    })
    .then(data => {
        console.log('GeoData updated:', data);
        fetchGeoData(); // Refresh the list
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Function to replace a GeoData entry
function replaceGeoData(id, newLocation) {
    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(newLocation)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to replace GeoData');
        }
        return response.json();
    })
    .then(data => {
        console.log('GeoData replaced:', data);
        fetchGeoData(); // Refresh the list
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Function to delete a GeoData entry
function deleteGeoData(id) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
        headers: headers
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete GeoData');
        }
        console.log('GeoData deleted successfully');
        fetchGeoData(); // Refresh the list
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Attach event listeners
document.getElementById('addLocationForm').addEventListener('submit', addLocation);

// Fetch GeoData on page load
fetchGeoData();
