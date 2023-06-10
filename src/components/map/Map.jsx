import React, { useEffect, useState } from 'react';
import './map.css';

const Map = () => {
  const [map, setMap] = useState(null);
  const [bounds, setBounds] = useState(null);
  const [infoWindow, setInfoWindow] = useState(null);
  const [currentInfoWindow, setCurrentInfoWindow] = useState(null);
  const [service, setService] = useState(null);
  const [infoPaneOpen, setInfoPaneOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    // Initialize variables
    const bounds = new window.google.maps.LatLngBounds();
    const infoWindow = new window.google.maps.InfoWindow();
    setBounds(bounds);
    setInfoWindow(infoWindow);
    setCurrentInfoWindow(infoWindow);

    // Try HTML5 geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMap(
            new window.google.maps.Map(document.getElementById('map'), {
              center: pos,
              zoom: 15,
            })
          );
          bounds.extend(pos);

          infoWindow.setPosition(pos);
          infoWindow.setContent('Location found.');
          infoWindow.open(map);
          map.setCenter(pos);

          // Call Places Nearby Search on user's location
          getNearbyPlaces(pos);
        },
        () => {
          // Browser supports geolocation, but user has denied permission
          handleLocationError(true, infoWindow);
        }
      );
    } else {
      // Browser doesn't support geolocation
      handleLocationError(false, infoWindow);
    }
  }, []);

  // Handle a geolocation error
  const handleLocationError = (browserHasGeolocation, infoWindow) => {
    // Set default location to Sydney, Australia
    const pos = { lat: -33.856, lng: 151.215 };
    setMap(
      new window.google.maps.Map(document.getElementById('map'), {
        center: pos,
        zoom: 15,
      })
    );

    // Display an InfoWindow at the map center
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? 'Geolocation permissions denied. Using default location.'
        : 'Error: Your browser doesn\'t support geolocation.'
    );
    infoWindow.open(map);
    setCurrentInfoWindow(infoWindow);

    // Call Places Nearby Search on the default location
    getNearbyPlaces(pos);
  };

  // Perform a Places Nearby Search Request
  const getNearbyPlaces = position => {
    const request = {
      location: position,
      rankBy: window.google.maps.places.RankBy.DISTANCE,
      keyword: 'sushi',
    };

    const service = new window.google.maps.places.PlacesService(map);
    setService(service);
    service.nearbySearch(request, nearbyCallback);
  };

  const nearbyCallback = (results, status) => {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      createMarkers(results);
    }
  };

  const createMarkers = places => {
    places.forEach(place => {
      const marker = new window.google.maps.Marker({
        position: place.geometry.location,
        map: map,
        title: place.name,
      });

      window.google.maps.event.addListener(marker, 'click', () => {
        const request = {
          placeId: place.place_id,
          fields: [
            'name',
            'formatted_address',
            'geometry',
            'rating',
            'website',
            'photos',
          ],
        };

        service.getDetails(request, (placeResult, status) => {
          showDetails(placeResult, marker, status);
        });
      });

      // Adjust the map bounds to include the location of this marker
      bounds.extend(place.geometry.location);
    });

    map.fitBounds(bounds);
  };

  const showDetails = (placeResult, marker, status) => {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      const placeInfowindow = new window.google.maps.InfoWindow();
      const rating = placeResult.rating ? placeResult.rating : 'None';
      placeInfowindow.setContent(
        `<div><strong>${placeResult.name}</strong><br>Rating: ${rating}</div>`
      );
      placeInfowindow.open(marker.map, marker);
      currentInfoWindow.close();
      setCurrentInfoWindow(placeInfowindow);
      showPanel(placeResult);
    } else {
      console.log('showDetails failed: ' + status);
    }
  };

  const showPanel = placeResult => {
    setInfoPaneOpen(true);
    setSelectedPlace(placeResult);
  };

  return (
    <div>
      <div id="panel" className={infoPaneOpen ? 'open' : ''}>
        {selectedPlace && (
          <>
            {selectedPlace.photos && (
              <img
                className="hero"
                src={selectedPlace.photos[0].getUrl()}
                alt={selectedPlace.name}
              />
            )}
            <h1 className="place">{selectedPlace.name}</h1>
            {selectedPlace.rating && (
              <p className="details">
                Rating: {selectedPlace.rating} &#9733;
              </p>
            )}
            <p className="details">{selectedPlace.formatted_address}</p>
            {selectedPlace.website && (
              <p className="details">
                <a href={selectedPlace.website} target="_blank" rel="noreferrer">
                  {selectedPlace.website}
                </a>
              </p>
            )}
          </>
        )}
      </div>
      <div id="map"></div>
    </div>
  );
};

export default Map;