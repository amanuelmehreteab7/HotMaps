var api_key = 'AIzaSyALhVNfaKgpvJuLqX6VuPljcwgUcEj_qHw'
var map;
var markers = [];
var mapLat = 38.8961336;
var mapLgt = -77.0028392;
var area = 'Washington';
var search;
var searchBar = true;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {
      lat: mapLat,
      lng: mapLgt
    },
    styles: mapStyles
  });
}

console.log("hello");
//Creating a request to search four square
// stop this function after we get all places.
function searchFourSquare(search) {
  var fscoordinates = []; //This will hold our array of objects which is the response from FourSquare

  // var clientID = 'PDKD4SZGV2WUM3HW00FFLWJGUMMLSFLMG4UGKN4DEGDH0GWB';
  // var clientSecret = 'JWQ5SO32GUFAKVDX5QWE1PPIHSKER40VTOWT01PUSA1O42TS';
  var clientID = 'Z3ZK4RYUU12ONLPWGOTA5DY3KOTMYFIVRFEOWW0KZ3VB13TF';
  var clientSecret = 'JRZK5DZC5GJVEFTIOEJVEGH14KPSI5V5XUJWPD3KTYFXEQK1';

  //Creating a call to moment'js in order to add to the end of the squareURL
  var now = moment().format("YYYYMMDD");

  // search radius
  var radius = 8000; // meters

  // URL endpoint for foursquare which contains the city of Washington DC hardcoded in for now
  // on checkbox click trigger this search!!!
  if (searchBar === true) {
    // One search for area.
    var squareURL = 'https://api.foursquare.com/v2/venues/search?' +
      'near=' + area + '&' +
      'client_id=' + clientID + '&' +
      'client_secret=' + clientSecret + '&' +
      'radius=' + radius + '&' +
      'limit=20' + '&' +
      'v=' + now;

    // One search for category
  } else {
    var squareURL = 'https://api.foursquare.com/v2/venues/search?' +
      'near=' + area + '&' +
      'client_id=' + clientID + '&' +
      'client_secret=' + clientSecret + '&' +
      'categoryId=' + search + '&' +
      'radius=' + radius + '&' +
      'limit=20' + '&' +
      'v=' + now;
  }

  //Making a call to the url for the city in order to display the popular locations
  $.ajax({
    url: squareURL,
    method: "GET"
  }).done(function(data) {

    // For each of the venue responses matching the city, loop through and create an array of objects
    var venues = data.response.venues;
    // console.log(venues);
    //sorts the response by most checkinsCount
    venues.sort(function(a, b) {
      return b.stats.checkinsCount - a.stats.checkinsCount;
    });

    for (var i = 0; i < venues.length; i++) {

      if (typeof(venues[i].categories) === 'undefined' || venues[i].categories.length ==0){
        var cat = "still undefined";
        var checkinsCount = 0;
        var category_Id = "still undefined"

      } else {

        var cat = venues[i].categories[0].name;
        var checkinsCount = venues[i].stats.checkinsCount;
        var category_Id = venues[i].categories[0].id
      }

      var name = venues[i].name;
      var lat = venues[i].location.lat;
      var lng = venues[i].location.lng;
      var address = venues[i].location.address;
      var venueId = venues[i].id;
      var url = venues[i].url;
      var hereNow = venues[i].hereNow.count;
      var checkinsCount = venues[i].stats.checkinsCount;
      var categoryId = venues[i].categories[0].id;
      var twitter = venues[i].contact.twitter;
      console.log(twitter)
      var venue = new Venue(name, cat, lat, lng, address, venueId, url, hereNow, checkinsCount, categoryId, twitter);

      fscoordinates.push(venue);
    }

    console.log(fscoordinates);

    if (searchBar === true) {
      searchCategories(fscoordinates);

    } else {
      console.log('fscoord: ', fscoordinates);
      searchVenues(fscoordinates);

    }
  }); // Completes the function that pulls down the response
} // Completes the entire function that searches foursquare

// triggered on search
function searchCategories(places) {

  // create an array of object with unique category IDs
  var uniqueCategory = [];
  uniqueCategory = _.uniqBy(places, 'categoryId');

  // select the top 10 categories
  uniqueCategory.splice([9], uniqueCategory.length - 10)
  var topTen = uniqueCategory;
  // This is generating new buttons on every button click. Just want to do this on search
  allBtns(topTen);
}

// triggered on button click
function searchVenues(places) {
  console.log('places: ', places);
  for (var i = 0; i < places.length; i++) {
    var latLng = {
      lat: places[i].lat,
      lng: places[i].lng
    }
    var categoryId = places[i].categoryId;
    var name = places[i].name;
    var hereNow = places[i].name;
    var url = places[i].url;
    var address = places[i].address;
    var twitter = places[i].twitter;
    console.log(twitter);

    addMarker(latLng, categoryId);

    lint(name, hereNow, address, url, twitter);

    updateTable(name, hereNow, address, url, categoryId);
    // add
  }
}

// Adds a marker to the map and push to the array.
function addMarker(latLng, id) {
  var marker = new google.maps.Marker({
    position: latLng,
    map: map,
    store_id: id
  });
  markers.push(marker);
  // console.log(marker.store_id);

  whyNot = (e) => {
    for (i = 0; i < markers.length; i++) {
      if (markers[i].store_id == e) {
        google.maps.event.trigger(markers[i], 'click');
      }
    }
  }

  lint = (name, hereNow, address, url, twitter) => {
    marker.addListener('click', function() {
      updateAndOpenDiscovery(name, hereNow, address, url);
      updateTwitterTimeline(twitter);
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

// searching for city triggers location change on map and generating of categories
// Trigger search event
$('#searchCity').on('click', function(event) {
  searchBar = true;
  event.preventDefault();

  // area = $('#search').val().trim();
  area = 'Washington';

  searchFourSquare(search);
  // searchCategories(places);
})

$('#search').keypress(function(e) {
  if (e.which == 13) { //Enter key pressed
    $('#searchCity').click(); //Trigger search button click event
  }
});

$(document).ready(function(){
  // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();
});
