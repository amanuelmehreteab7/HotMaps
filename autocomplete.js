function initialize() {

var input = document.getElementById('search');
var autocomplete = new google.maps.places.Autocomplete(input);
}

google.maps.event.addDomListener(window, 'load', initialize);

console.log("Hello");
