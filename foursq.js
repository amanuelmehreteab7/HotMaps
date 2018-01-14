class Place {
  constructor(name, cat, lat, lng, url, hereNow) {
    this.name = name;
    this.cat = cat;
    this.lat = lat;
    this.lng = lng;
    this.url = url;
    this.hereNow = hereNow;
  }
}

// FourSquare API
function fourSquareFunction(search) {
  var places = [];

  var radius = 8000; // meters

  // on checkbox click trigger this search!!!

  var url = 'https://api.foursquare.com/v2/venues/search?' +
    'll=38.894470,-77.036583&' +
    'client_id=PDKD4SZGV2WUM3HW00FFLWJGUMMLSFLMG4UGKN4DEGDH0GWB&' +
    'client_secret=JWQ5SO32GUFAKVDX5QWE1PPIHSKER40VTOWT01PUSA1O42TS&' +
    'v=20170101&' + // time to be changed...
    'categoryId=' + search + '&' +
    'radius=' + radius + '&';

  $.ajax({
    url: url,
    method: 'GET'
  }).done(
    function(data) {

      var venues = data.response.venues;

      for (var i = 0; i < venues.length; i++) {

        var name = venues[i].name;
        var cat = venues[i].categories[0].name;
        var lat = venues[i].location.lat;
        var lng = venues[i].location.lng;
        var url = venues[i].url;
        var hereNow = venues[i].hereNow.count;

        var place = new Place(name, cat, lat, lng, url, hereNow);

        places.push(place);
      }
      console.log(places);
    });
}
