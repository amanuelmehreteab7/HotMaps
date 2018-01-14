var api_key = 'AIzaSyALhVNfaKgpvJuLqX6VuPljcwgUcEj_qHw'
var fscoordinates = []; //This will hold our array of objects which is the response from FourSquare
var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: new google.maps.LatLng(38.8961336, -77.0028392),

  });

  //When the map is initialized, we should search FourSquare and place all the markers
  // searchFourSquare(search);
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

      //Loop through all of the objects to display all markers on the map
      for (var j = 0; j < fscoordinates.length; j++) {
        var latLng = new google.maps.LatLng(fscoordinates[j].lat, fscoordinates[j].lng);
        var marker = new google.maps.Marker({
          position: latLng,
          map: map
        });
      } // Completes the loop through the array of objects
    } // Completes the loop through add all responses to an array of objects
  }); // Completes the function that pulls down the response
} // Completes the entire function that searches foursquare
