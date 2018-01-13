var api_key = 'AIzaSyALhVNfaKgpvJuLqX6VuPljcwgUcEj_qHw'
var searchLocation;
var searchLatitude;
var searchLongitude;
var coordinates;




function initMap() {
  var uluru = {
    lat: coordinates.lat,
    lng: coordinates.lng
  };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
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

// Get the value of the search term
$("#search").keypress(function(e) {
    if(e.which == 13) {
      event.preventDefault();
      searchLocation = $("#search").val().trim();
        console.log('search Location ' + searchLocation);
        searchCoordinates();

        // $("#searchDirections").hide();
        // initMap();
    }
});
//
// //Need to convert the search term into latitude and longitude in order to find the center of the Maps
//
function searchCoordinates (){
  var coordinatesQueryURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + searchLocation + '&key=' + api_key;

  $.ajax({
    url: coordinatesQueryURL,
    method: "GET"
  }).done(function(response){
    console.log('query url ' + coordinatesQueryURL);
    console.log(response);
    for (var i = 0; i < response.results.length; i++) {
      searchLatitude = parseFloat(response.results[0].geometry.location.lat)
      searchLongitude = parseFloat(response.results[0].geometry.location.lng)
      coordinates = {
            lat: searchLatitude,
            lng: searchLongitude
          };
          console.log(coordinates);
    }
    initMap();
    // placeMarker(coordinates.lat,coordinates.lng);
  });
}
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
