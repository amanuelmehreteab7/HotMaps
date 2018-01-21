var  updateDisoveryName = $(".disoveryName");
var updateDisoveryHereNow = $(".disoveryHereNow");
var updateDisoveryAddress = $(".disoveryAddress");
var updateDisoveryURL = $ (".disoveryURL");

updateAndOpenDiscovery = (name, hereNow, disoveryAddress, disoveryURL) => {

  updateDisoveryName.text(name);
  updateDisoveryHereNow.text(hereNow);
  updateDisoveryAddress.text(disoveryAddress);
  updateDisoveryURL.text(disoveryURL);
  $('.tap-target').tapTarget('open');
  $('#cat').hide();
  $('#searchBtn').hide();

// if ($('.tap-target').tapTarget() == close;


}
