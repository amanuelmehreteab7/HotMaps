var updateDisoveryName = $(".disoveryName");
var updateDisoveryHereNow = $(".disoveryHereNow");
var updateDisoveryAddress = $(".disoveryAddress");
var updateDisoveryURL = $(".disoveryURL");

activateSidePanel = (name, venueId, hereNow, disoveryAddress, disoveryURL) => {

  updateDisoveryName.text(name);
  updateDisoveryAddress.html('<i class="material-icons">location_on</i>' + disoveryAddress);
  if (disoveryURL == undefined) {
    updateDisoveryURL.hide();
  } else {
    updateDisoveryURL.show();
    updateDisoveryURL.attr('href',disoveryURL);
  }

  $('#cat').hide();
  $('#searchBtn').hide();
  $('#open-panel').click()

  var venuePhoto = photoSearch(venueId);

}
