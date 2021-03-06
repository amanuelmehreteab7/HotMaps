var googleApi_key = 'AIzaSyALhVNfaKgpvJuLqX6VuPljcwgUcEj_qHw';
// var clientID = 'PDKD4SZGV2WUM3HW00FFLWJGUMMLSFLMG4UGKN4DEGDH0GWB';
// var clientSecret = 'JWQ5SO32GUFAKVDX5QWE1PPIHSKER40VTOWT01PUSA1O42TS';
// var clientID = 'Z3ZK4RYUU12ONLPWGOTA5DY3KOTMYFIVRFEOWW0KZ3VB13TF';
// var clientSecret = 'JRZK5DZC5GJVEFTIOEJVEGH14KPSI5V5XUJWPD3KTYFXEQK1';
var clientID = 'FKPEU53XWHVZ5GJJWFTRGHGW4I4KU1XJHYDUSPCAOK1LGYLJ';
var clientSecret = 'YH5BV2ZY45UCFCXH44GAT4NWM1RG1RDAK4KQQDDEUKO2JPDT';

//Creating a call to moment'js in order to add to the end of the squareURL
var now = moment().format("YYYYMMDD");

var map;
var markers = [];
var metersConversion = 1609.34;
var area = "Washington,%20DC,%20United%20States";
var radius = '16093.4';
var search;
var searchBar;
var fscoordinates;


//Creating a request to search four square
// stop this function after we get all places.
function searchFourSquare(search) {
  var fscoordinates = []; //This will hold our array of objects which is the response from FourSquare

  // URL endpoint for foursquare which contains the city of Washington DC hardcoded in for now
  // on checkbox click trigger this search!!!
  if (searchBar ===  true) {
    // One search for area.
    var squareURL = 'https://api.foursquare.com/v2/venues/search?' +
      'near=' + area + '&' +
      'client_id=' + clientID + '&' +
      'client_secret=' + clientSecret + '&' +
      'radius=' + radius + '&' +
      'limit=50' + '&' +
      'v=' + now;

    // One search for category
  }
  else if (searchBar === null){
    var squareURL = 'https://api.foursquare.com/v2/venues/search?' +
          'near=' + area + '&' +
          'client_id=' + clientID + '&' +
          'client_secret=' + clientSecret + '&' +
          'radius=' + radius + '&' +
          'limit=50' + '&' +
          'v=' + now;
  }
  else {

    var squareURL = 'https://api.foursquare.com/v2/venues/search?' +
      'near=' + area + '&' +
      'client_id=' + clientID + '&' +
      'client_secret=' + clientSecret + '&' +
      'categoryId=' + search + '&' +
      'radius=' + radius + '&' +
      'limit=50' + '&' +
      'v=' + now;
  }

  //Making a call to the url for the city in order to display the popular locations
  $.ajax({
    url: squareURL,
    method: "GET"
  }).done(function(data) {

    // For each of the venue responses matching the city, loop through and create an array of objects
    var venues = data.response.venues;
    //sorts the response by most checkinsCount
    venues.sort(function(a, b) {
      return b.stats.checkinsCount - a.stats.checkinsCount;
    });

    for (var i = 0; i < venues.length; i++) {

      if (typeof(venues[i].categories) === 'undefined' || venues[i].categories.length == 0) {
        var cat = "still undefined";
        var checkinsCount = 0;
        var categoryId = "still undefined"

      } else {

        var cat = venues[i].categories[0].name;
        var checkinsCount = venues[i].stats.checkinsCount;
        var categoryId = venues[i].categories[0].id
      }

      //Creating an array of objects that will contain all of the venues
      var name = venues[i].name;
      var lat = venues[i].location.lat;
      var lng = venues[i].location.lng;
      var address = venues[i].location.address;
      var venueId = venues[i].id;
      var url = venues[i].url;
      var hereNow = venues[i].hereNow.count;
      var checkinsCount = venues[i].stats.checkinsCount;
      var twitter = venues[i].contact.twitter;
      var venue = new Venue(name, cat, lat, lng, address, venueId, url, hereNow, checkinsCount, categoryId, twitter);

      //Push the newly created object into the fscoordinates
      fscoordinates.push(venue);
    }


    if (searchBar === true) {
      searchCategories(fscoordinates);

    } else {

      searchVenues(fscoordinates);

    }
  }); // Completes the function that pulls down the response
} // Completes the entire function that searches foursquare

// Initialize search
function initSearch() {
  searchBar = true;

  // clear existing buttons
  catId.empty();

  area = $('#search').val().trim();
  radius = $('#radius').val().trim() * metersConversion;

  searchFourSquare(search);
}

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
  $('#addRow').empty()
  for (var i = 0; i < 15; i++) {
    var latLng = {
      lat: places[i].lat,
      lng: places[i].lng
    }
    var categoryId = places[i].categoryId;
    var name = places[i].name;
    var venueId = places[i].venueId;
    var hereNow = places[i].hereNow;
    var url = places[i].url;
    var address = places[i].address;
    var twitter = places[i].twitter;

    addMarker(latLng, categoryId, i);

    lint(name, venueId, hereNow, address, url, twitter);

    updateTable(name, hereNow, address, url, categoryId);
  }
}

// Adds a marker to the map and push to the array.

function addMarker(latLng, id, number) {
  var colorGradient = ['#FF7C30', '#F07F3E', '#E1834D', '#D2875C', '#C38B6B', '#B58F79', '#A69388', '#979797', '#889BA6', '#799FB5', '#6BA3C3', '#5CA7D2', '#4DABE1', '#3EAFF0', '#30B3FF'];
  var icon = {
    path: 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z',
    fillColor: colorGradient[number],
    fillOpacity: 1,
    scale: 0.6,
    strokeColor: colorGradient[number]
  }

  var marker = new google.maps.Marker({
    position: latLng,
    map: map,
    icon: icon,
    store_id: id
  });
  markers.push(marker);

  whyNot = (e) => {
    for (i = 0; i < markers.length; i++) {
      if (markers[i].store_id == e) {
        google.maps.event.trigger(markers[i], 'click');
      }
    }
  }

  lint = (name, venueId, hereNow, address, url, twitter) => {
    marker.addListener('click', function() {
      setTimeout(function() {
        activateSidePanel(name, venueId, hereNow, address, url);
        updateTwitterTimeline(twitter);
        mixpanel.track(
          "Click on Marker",
          {"name": name,
          "venue Id": venueId,
          "Here Now": hereNow,
          "address": address,
          "url": url
          }
        )

      }, 100);
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

//Launches Google Maps asynchronously
function initAutocomplete() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 38.9071923,
      lng: -77.0368707
    },
    zoom: 12,
    styles: mapStyleHot,
    mapTypeId: 'roadmap'
  });

  // Create the search box and link it to the UI element.
  var input = document.getElementById('search');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);


  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
    if (places.length == 0) {
      return;
    }


    // For each place, get the location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    }); //Closing the function that returns the location on the map
    map.fitBounds(bounds);
    map.setZoom(12);
  }); //Closing the anonymous function that looks for the search
} // Close initAutocomplete function

// searching for city triggers location change on map and generating of categories
// Trigger search event on keypress
$('#search').keypress(function(e) {
  if (e.which == 13) {
    event.preventDefault();

    initSearch();
    mixpanel.track(
      "Search",
      {"City": area});
  }
});

// When you click on the floating quick filters, then trigger the map to show places based on the filter selected
$('.btn-floating').on('click', function(event) {
  search = $(this).attr('data-cat-id');;
  var buttonName = $(this).attr('data-tooltip')
  mixpanel.track("Quick Filter",
  {"Quick Filter Name": buttonName})
  searchFourSquare(search);
  searchBar = false;
  clearMarkers()
});

//reset the search when a new radius is selected
$('#radius').change(function() {
  event.preventDefault();

  //Track all quick filter button clicks
  mixpanel.track(
    "Radius Change",
    {"radius":this.value})

  initSearch();
})

//launch the table when the logo is clicked
$(document).ready(function() {
  // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
  mixpanel.track("Open Table")
  $('.modal').modal();
  $('select').material_select();
  searchBar = true;
  searchFourSquare(area);
  searchBar = null;
  searchFourSquare(area);

});

$(window).click(function() {
  restoreCat();
});

$(".button-collapse").sideNav();
