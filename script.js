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

var map;
    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: new google.maps.LatLng(38.8961336,-77.0028392),
        mapTypeId: 'terrain'

      });
  mapCoordinates();
}

    function mapCoordinates() {
      for (var i = 0; i < coordinates.length; i++) {
        var latLng = new google.maps.LatLng(coordinates[i][0],coordinates[i][1]);
        console.log(latLng);
        var marker = new google.maps.Marker({
          position: latLng,
          map: map
        });
      }
    }
