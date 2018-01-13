var api_key = 'AIzaSyALhVNfaKgpvJuLqX6VuPljcwgUcEj_qHw'
var searchLocation;
var searchLatitude;
var searchLongitude;


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

//Need to convert the search term into latitude and longitude in order to find the center of the Maps

function searchCoordinates (){
  var coordinatesQueryURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + searchLocation + '&key=' + api_key;

  $.ajax({
    url: coordinatesQueryURL,
    method: "GET"
  }).done(function(response){
    console.log('query url ' + coordinatesQueryURL);
    console.log(response);
    for (var i = 0; i < response.results.length; i++) {
      searchLatitude = response.results[i].geometry.location.lat;
      searchLongitude = response.results[i].geometry.location.lng;
      initMap();
    }
  });
}

function initMap(){
  var coordinates = {
    lat: searchLatitude,
    lng: searchLongitude
  };

  var map = new google.maps.Map(document.getElementById('map'), {
         zoom: 4,
         center: coordinates
       });
}
