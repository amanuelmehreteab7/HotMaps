var api_key = 'AIzaSyALhVNfaKgpvJuLqX6VuPljcwgUcEj_qHw'
var fscoordinates = []; //This will hold our array of objects which is the response from FourSquare
var map;
var markers = [];
// var id;

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

  var clientID = 'Z3ZK4RYUU12ONLPWGOTA5DY3KOTMYFIVRFEOWW0KZ3VB13TF';
  var clientSecret = 'JRZK5DZC5GJVEFTIOEJVEGH14KPSI5V5XUJWPD3KTYFXEQK1';

  //Creating a call to moment'js in order to add to the end of the squareURL
  var now = moment().format("YYYYMMDD");

  // search radius
  var radius = 8000; // meters

  //URL endpoint for foursquare which contains the city of Washington DC hardcoded in for now
  // on checkbox click trigger this search!!!
  var squareURL = 'https://api.foursquare.com/v2/venues/search?' +
    // 'near=Washington&' +
     // use + '?' +
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

//sorts the response by most hereNows
    sorted = data.response.venues.sort(function(a, b){
     return b.hereNow.count - a.hereNow.count;
    })

    // For each of the venue responses matching the city, loop through and create an array of objects
    var venues = data.response.venues;
    console.log(venues);

    for (var i = 0; i < venues.length; i++) {

      var name = venues[i].name;
      var cat = venues[i].categories[0].name;
      var lat = venues[i].location.lat;
      var lng = venues[i].location.lng;
      var url = venues[i].url;
      var hereNow = venues[i].hereNow.count;
      var address = venues[i].location.address;
      var id = venues[i].id;
      // return id;
      // console.log(id);

      var venue = new Venue(name, cat, lat, lng, url, hereNow);

      fscoordinates.push(venue);
      var latLng = {
        lat: fscoordinates[i].lat,
        lng: fscoordinates[i].lng
      }
      addMarker(latLng, id);
      lint(name, hereNow, address, url);

      updateTable(name, hereNow, address, url, id)


    } // Completes the loop through add all responses to an array of objects
    //Loop through all of the objects to display all markers on the map
    // for (var j = 0; j < fscoordinates.length; j++) {
    //   // var latLng = new google.maps.LatLng(fscoordinates[j].lat, fscoordinates[j].lng);\
    //   var latLng = {
    //     lat: fscoordinates[j].lat,
    //     lng: fscoordinates[j].lng
    //   }
    //   addMarker(latLng, id);
    //   lint(name, hereNow, address, url);

      // updateTable(name, hereNow, address, url)

      // console.log(hereNow);
    // } // Completes the loop through the array of objects
    // console.log('venues: ', fscoordinates);
  }); // Completes the function that pulls down the response
} // Completes the entire function that searches foursquare

// Adds a marker to the map and push to the array.
function addMarker(latLng, id) {
  var marker = new google.maps.Marker({
    position: latLng,
    map: map,
    store_id: id
  });
  markers.push(marker)
  // console.log(marker.store_id);

  whyNot = (e)  => {
    for(i = 0; i < markers.length; i++)
    {
      if (markers[i].store_id == e)
      {
        google.maps.event.trigger(markers[i], 'click');
      }
  }
  }

lint = (name , hereNow, address, url) => {
  marker.addListener('click', function() {
      updateAndOpenDiscovery(name, hereNow, address, url);
      // console.log(marker.store_id);

    });
}
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
