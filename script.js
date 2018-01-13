var api_key = 'AIzaSyALhVNfaKgpvJuLqX6VuPljcwgUcEj_qHw';
var searchLocation;
var searchLatitude;
var searchLongitude;
var map;
var fscoordinates;
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

var map;
    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: new google.maps.LatLng(38.8961336,-77.0028392),
        mapTypeId: 'terrain'

      });
  mapCoordinates();
  searchFourSquare();
}

    function mapCoordinates() {
      for (var i = 0; i < coordinates.length; i++) {
        var latLng = new google.maps.LatLng(coordinates[i][0],coordinates[i][1]);
        var marker = new google.maps.Marker({
          position: latLng,
          map: map
        });
      }
    }

    //Creating a request to search four square
    function searchFourSquare(){
      var clientID = 'WH0QFEZQIC5FOAJTI2EIZNGUPNGVJFPCLFMDD4NLDSITUSVY';
      var clientSecret = 'PDNYILQOD54ECFYKY2HPWNOHF3HRS4SHCSALCKEE3U1ZY3HE';

      //Creating a call to moment'js in order to add to the end of the squareURL
      var now = moment().format("YYYYMMDD");
      var squareURL = 'https://api.foursquare.com/v2/venues/search?near=Washington&client_id=' + clientID + '&client_secret=' + clientSecret + '&v=' + now;

      //Making a call to the url for the city in order to display the popular locations
      $.ajax({
        url: squareURL,
        method: "GET"
      }).done(function(response){
        for (var i = 0; i < response.response.venues[i].length; i++) {
          fscoordinates = new Object();

          fscoordinates.name = response.response.venues[i].name;
          fscoordinates.lat = response.response.venues[i].location.lat;
          fscoordinates.lng = response.response.venues[i].location.lng;
          fscoordinates.hereNow = response.response.venues[i].hereNow.count;
          console.log(fscoordinates);
      }

    });
  }
