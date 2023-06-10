let map;
let directionsService;
let directionsDisplay;

function initMap() {
  // Create a map object
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 49.804495,  lng: 24.015470 },
    zoom: 18,
    mapTypeId: "terrain",
  });

  const trackPlanCoordinates = [
    { lat: 49.803388, lng: 24.016200 },
    { lat: 49.803388, lng: 24.016447 },
    { lat: 49.803388, lng: 24.016480 },
    { lat: 49.803500, lng: 24.016480 },
  ];
  const flightPath = new google.maps.Polyline({
    path: trackPlanCoordinates,
    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 7,
  });

  flightPath.setMap(map);


  // Initialize the Directions service and renderer
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(map);

  // Call the function to calculate and display the route
  calculateAndDisplayRoute();
};

function calculateAndDisplayRoute() {
  // Specify the origin and destination for the route
  //const origin = 'San Francisco, CA';
  //const destination = 'Los Angeles, CA';

  // Create a request object for the Directions service
  const request = {
    origin: origin,
    destination: destination,
    travelMode: google.maps.TravelMode.DRIVING
  };

  // Call the Directions service to calculate the route
  directionsService.route(request, function(response, status) {
    if (status === 'OK') {
      // Display the route on the map
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Error: ' + status);
    }
  });
}
  