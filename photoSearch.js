var sidePanelPhoto = $(".photoURL");

function photoSearch(venueId) {

  var venueId = venueId;
  var squareURL = 'https://api.foursquare.com/v2/venues/' +
    venueId + '/' +
    'photos?' +
    'client_id=' + clientID + '&' +
    'client_secret=' + clientSecret + '&' +
    'v=' + now;
    console.log(squareURL);


  $.ajax({
    url: squareURL,
    method: "GET"
  }).done(function(data) {

    var photoData = data.response.photos;
    var prefix = photoData.items[0].prefix;
    var suffix = photoData.items[0].suffix;
    var size = 'width300'; // size of side panel in width

    var photoURL = prefix + size + suffix;

    sidePanelPhoto.attr('src', photoURL);

    //set photo in here.

  });
}
