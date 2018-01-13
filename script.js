var api_key = 'AIzaSyALhVNfaKgpvJuLqX6VuPljcwgUcEj_qHw'
var searchLocation;
var searchLatitude;
var searchLongitude;
var map;
var coordinates = [
  [38.9125591, -77.0361521],
  [38.9125591, -77.0361521],
  [38.9125591, -77.0361521],
  [38.9125591, -77.0361521],
  [38.8835686, -77.0818237],
  [38.8981414, -77.0668551],
  [38.8893706, -77.0200036],
  [38.8912662, -77.0282541],
  [38.8881601, -77.0220566],
  [38.8977158, -77.0261858],
];

initMap();

function initMap() {
  var uluru = {
    lat: 38.8961336,
    lng: -77.0028392
  };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: uluru
  });
  multipleCoordinates();
  // var marker = new google.maps.Marker({
  //   position: uluru,
  //   map: map
  // });
}

function placeMarker(lat, long) {
  var uluru = {
    lat: lat,
    long: long
  }
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}

function centerMap(lat, long) {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: uluru
  });
}

function multipleCoordinates() {
  for (var i = 0; i < coordinates.length; i++) {
    var uluru = {
      lat: coordinates[i][0],
      lng: coordinates[i][1]
    }

    // var latLng = new google.maps.LatLng(coordinates[i][0], coordinates[i][1]);
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
  }
}

// Get the value of the search term
// $("#search").keypress(function(e) {
//     if(e.which == 13) {
//       event.preventDefault();
//       searchLocation = $("#search").val().trim();
//         console.log('search Location ' + searchLocation);
//         searchCoordinates();
//
//         // $("#searchDirections").hide();
//         // initMap();
//     }
// });
//
// //Need to convert the search term into latitude and longitude in order to find the center of the Maps
//
// function searchCoordinates() {
//   var coordinatesQueryURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + searchLocation + '&key=' + api_key;
//
//   $.ajax({
//     url: coordinatesQueryURL,
//     method: "GET"
//   }).done(function(response) {
//     console.log('query url ' + coordinatesQueryURL);
//     console.log(response);
//     for (var i = 0; i < response.results.length; i++) {
//       searchLatitude = parseFloat(response.results[0].geometry.location.lat)
//       searchLongitude = parseFloat(response.results[0].geometry.location.lng)
//       coordinates = {
//         lat: searchLatitude,
//         lng: searchLongitude
//       };
//       console.log(coordinates);
//     }
//     // placeMarker(coordinates.lat,coordinates.lng);
//   });
// }
//
// $(document).ready(function(){
//   function initMap(){
//     var coordinates = {
//       lat: 38.9071923,
//       lng: searchLongitude
//     };
//
//     var map = new google.maps.Map(document.getElementById('map'), {
//            zoom: 4,
//            center: coordinates
//          });
//     // $("#map").append(map)
//   }
//
// })
