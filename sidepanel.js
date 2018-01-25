var updateDisoveryName = $(".disoveryName");
var updateDisoveryHereNow = $(".disoveryHereNow");
var updateDisoveryAddress = $(".disoveryAddress");
var updateDisoveryURL = $(".disoveryURL");

//Launches sidepanel when a marker is clicked

activateSidePanel = (name, venueId, hereNow, disoveryAddress, disoveryURL) => {

  updateDisoveryName.text(name);
  updateDisoveryAddress.html('<i class="material-icons">location_on</i>' + disoveryAddress);
  updateDisoveryURL.attr('href',disoveryURL);

  $('#cat').hide();
  $('#searchBtn').hide();
  $('#open-panel').click()

  var venuePhoto = photoSearch(venueId);

}
