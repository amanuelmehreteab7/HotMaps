var api_key = 'AIzaSyALhVNfaKgpvJuLqX6VuPljcwgUcEj_qHw';
var map;
var fscoordinates = []; //This will hold our array of objects which is the response from FourSquare
var results = 20
var locat = 'Washington'
var categoryId
var mLat = 38.8961336
var mLgt = -77.0028392

//Initilizing the map from Google Maps API documentation
var map;
    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: new google.maps.LatLng(mLat,mLgt),

      });

  //When the map is initialized, we should search FourSquare and place all the markers

  // searchFourSquare();
}

    //Creating a request to search four square
    function searchFourSquare(){
      var clientID = 'WH0QFEZQIC5FOAJTI2EIZNGUPNGVJFPCLFMDD4NLDSITUSVY';
      var clientSecret = 'PDNYILQOD54ECFYKY2HPWNOHF3HRS4SHCSALCKEE3U1ZY3HE';

      //Creating a call to moment'js in order to add to the end of the squareURL
      var now = moment().format("YYYYMMDD");

      //URL endpoint for foursquare which contains the city of Washington DC hardcoded in for now
      // var squareURL = 'https://api.foursquare.com/v2/venues/search?near=Washington&client_id=' + clientID + '&client_secret=' + clientSecret + '&v=' + now;
      var squareURL = 'https://api.foursquare.com/v2/venues/search?near='+ locat +'&categoryId=' + categoryId +'&client_id=' + clientID + '&limit=' + results + '&client_secret=' + clientSecret + '&v=' + now;


      //Making a call to the url for the city in order to display the popular locations
      $.ajax({
        url: squareURL,
        method: "GET"
      }).done(function(response){

        // For each of the venue responses matching the city, loop through and create an array of objects

        for (var i = 0; i < response.response.venues.length; i++) {
          fscoordinates.push({
            name: response.response.venues[i].name,
            lat:response.response.venues[i].location.lat,
            lng: response.response.venues[i].location.lng,
            hereNow:response.response.venues[i].hereNow.count
          })
              // console.log(fscoordinates);

          //Loop through all of the objects to display all markers on the map

          for (var j = 0; j < fscoordinates.length; j++) {
            var latLng = new google.maps.LatLng(fscoordinates[j].lat,fscoordinates[j].lng);
            var marker = new google.maps.Marker({
              position: latLng,
              map: map
            });
          } // Completes the loop through the array of objects
      } // Completes the loop through add all responses to an array of objects
      // debugger
      // mLat = response.response.venues[0].location.lat;
      // console.log('Latitud coordinates' + mLat);
      // mLgt = response.response.venues[0].location.lng;
      // console.log('Longitud coordinates' + mLgt);
      // initMap()
    }); // Completes the function that pulls down the response
  } // Completes the entire function that searches foursquare


  // function search(){
  $('#searchCity').on('click', function(event) {
    console.log('searchCity Button - Clicked');
    event.preventDefault();
    locat = $('#search').val().trim();
    results = $('#resultsNumber').val().trim()
    categoryId  = $('#categories').val().trim()
    console.log('Var Location' + locat);
    console.log('Var results' + results);
    console.log('var categories' + categoryId);
    fscoordinates = []
    $('#header').html('<h2>' + 'What is Happening in ' + locat + '</h2>');
    searchFourSquare()
    initMap()
  })

  $(document).ready(function() {
    $('select').material_select();
  });
