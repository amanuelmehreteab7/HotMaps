fourSquareFunction();

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

var catID = $('#cat');

function addCheckBox(place) {
  var pTag = $('<p>');

  var input = $('<input type="checkbox"/>');
  input.attr('id', place.cat);

  var label = $('<label>');
  label.attr('for', place.cat);
  label.text(place.cat);

  pTag.append(input);
  pTag.append(label);
  catID.append(pTag);
}

function fourSquareFunction() {
  var places = [];

  var museum = '4bf58dd8d48988d181941735';
  var musicClub = '4bf58dd8d48988d1e5931735';
  var theatre = '4bf58dd8d48988d137941735';
  var stadium = '4bf58dd8d48988d184941735';
  var specialEvent = '4d4b7105d754a06373d81259';
  var resteraunt = '4d4b7105d754a06374d81259';
  var bar = '4d4b7105d754a06376d81259';
  var sports = '4f4528bc4b90abdf24c9de85';
  var farmersMarket = '4bf58dd8d48988d1fa941735';


  var url = 'https://api.foursquare.com/v2/venues/search?' +
    'll=40.7484,-73.9857&' +
    'client_id=PDKD4SZGV2WUM3HW00FFLWJGUMMLSFLMG4UGKN4DEGDH0GWB&' +
    'client_secret=JWQ5SO32GUFAKVDX5QWE1PPIHSKER40VTOWT01PUSA1O42TS&' +
    'v=20170101&' +
    'categoryId=' + bar;

    console.log(url)

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

        addCheckBox(place);
        places.push(place);
      }

    });
}
