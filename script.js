var api_key = 'AIzaSyALhVNfaKgpvJuLqX6VuPljcwgUcEj_qHw'
var fscoordinates = []; //This will hold our array of objects which is the response from FourSquare
var map;
var markers = [];

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {
      lat: 38.8961336,
      lng: -77.0028392
    }
  });
}

//Creating a request to search four square
function searchFourSquare(search) {

  var clientID = 'WH0QFEZQIC5FOAJTI2EIZNGUPNGVJFPCLFMDD4NLDSITUSVY';
  var clientSecret = 'PDNYILQOD54ECFYKY2HPWNOHF3HRS4SHCSALCKEE3U1ZY3HE';

  //Creating a call to moment'js in order to add to the end of the squareURL
  var now = moment().format("YYYYMMDD");

  // search radius
  var radius = 8000; // meters

  //URL endpoint for foursquare which contains the city of Washington DC hardcoded in for now
  // on checkbox click trigger this search!!!
  var squareURL = 'https://api.foursquare.com/v2/venues/search?' +
    // 'near=Washington&' +
    'll=38.894470,-77.036583&' + // Washington DC Coord
    'client_id=' + clientID + '&' +
    'client_secret=' + clientSecret + '&' +
    'categoryId=' + search + '&' +
    'radius=' + radius + '&' +
    'v=' + now;
  // Radius search term to improve results. Right now it might default to
  // something that is really small. Causing the cluster around white house.

  //Making a call to the url for the city in order to display the popular locations
  $.ajax({
    url: squareURL,
    method: "GET"
  }).done(function(data) {

    // For each of the venue responses matching the city, loop through and create an array of objects
    var venues = data.response.venues;

    for (var i = 0; i < venues.length; i++) {

      var name = venues[i].name;
      var cat = venues[i].categories[0].name;
      var lat = venues[i].location.lat;
      var lng = venues[i].location.lng;
      var url = venues[i].url;
      var hereNow = venues[i].hereNow.count;

      var venue = new Venue(name, cat, lat, lng, url, hereNow);

      fscoordinates.push(venue);

    } // Completes the loop through add all responses to an array of objects
    //Loop through all of the objects to display all markers on the map
    for (var j = 0; j < fscoordinates.length; j++) {
      // var latLng = new google.maps.LatLng(fscoordinates[j].lat, fscoordinates[j].lng);\
      var latLng = {
        lat: fscoordinates[j].lat,
        lng: fscoordinates[j].lng
      }
      addMarker(latLng);
    } // Completes the loop through the array of objects
    console.log('venues: ', fscoordinates);
  }); // Completes the function that pulls down the response
} // Completes the entire function that searches foursquare

// Adds a marker to the map and push to the array.
function addMarker(latLng) {
  var marker = new google.maps.Marker({
    position: latLng,
    map: map
  });
  markers.push(marker)
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
 function clearMarkers() {
   setMapOnAll(null);
 }

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  fscoordinates = [];
  markers = [];
}
