let map;
let directionsService;
let directionsDisplay;

const body={
  "field_id" : 3,
  "vehicle_id" : 1,
  "datetime1" : "2022-01-06 14:44:56",
  "datetime2" : "2024-02-06 12:12:12"
};

$.post("https://pavlodykyi.pythonanywhere.com/coord", body, (data, status) => {
  console.log(data);

  // Parse the response data and extract coordinates
  const coordinates = data.map(item => ({ lat: item.lat, lng: item.lng }));

  // Call the function to initialize the map with the parsed coordinates
  initMap(coordinates);
});

function initMap(coordinates) {
  // Create a map object
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 49.799091, lng: 23.862665 },
    zoom: 18,
    mapTypeId: "terrain",
  });

  const trackPlanCoordinates = [
    { lat: 49.799091, lng: 23.862665 },
    { lat: 49.802025, lng: 23.859915 },
    { lat: 49.799031, lng: 23.862500 },
    { lat: 49.801978, lng: 23.859737 },
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

  
};
// Call the function to calculate and display the route
  //calculateAndDisplayRoute();
// function calculateAndDisplayRoute() {

//   const request = {
//     origin: origin,
//     destination: destination,
//     travelMode: google.maps.TravelMode.DRIVING
//   };

//   directionsService.route(request, function(response, status) {
//     if (status === 'OK') {
//       directionsDisplay.setDirections(response);
//     } else {
//       window.alert('Error: ' + status);
//     }
//   });
// }
  