var updateDisoveryName = $(".disoveryName");
var updateDisoveryHereNow = $(".disoveryHereNow");
var updateDisoveryAddress = $(".disoveryAddress");
var updateDisoveryURL = $(".disoveryURL");

activateSidePanel = (name, hereNow, disoveryAddress, disoveryURL) => {

  updateDisoveryName.text(name);
  updateDisoveryHereNow.text(hereNow);
  updateDisoveryAddress.text(disoveryAddress);
  updateDisoveryURL.text(disoveryURL);

  $('#cat').hide();
  $('#searchBtn').hide();
  $('#open-panel').click()

}
