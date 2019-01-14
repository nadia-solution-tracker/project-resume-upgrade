function getLocation() {
    var x = document.getElementById("demo");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    }
    else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showError(error) {
	switch (error.code) {
	    case error.PERMISSION_DENIED:
	        alert("User denied the request for Geolocation.");
	        break;
	    case error.POSITION_UNAVAILABLE:
	        alert("Location information is unavailable.");
	        break;
	    case error.TIMEOUT:
	        alert("The request to get user location timed out.");
	        break;
	    case error.UNKNOWN_ERROR:
	        alert("An unknown error occurred.");
	        break;
	}
}

function showPosition(position) {
    var latitude = 43.5925;
    var longitude = -79.6382;
    var x = document.getElementById("demo");
    x.innerHTML = "Latitude: " + latitude +
        "<br>Longitude: " + longitude;
    var coords = new google.maps.LatLng(latitude, longitude);
    var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    var locations = [
        { lat: 43.5916, lng: -79.6435 },
        { lat: 43.5896, lng: -79.6462 }
    ];
    var mapOptions = {
        zoom: 18,
        center: coords,
        mapTypeControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(
        document.getElementById("mapPlaceholder"), mapOptions
    );
    
    var marker = new google.maps.Marker({
        position: coords,
        map: map,
        title: "Current location!"
    });
    
    var markers = locations.map(function(location, i) {
        return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
        });
    });
    var markerCluster = new MarkerClusterer(map, markers, {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    });
}