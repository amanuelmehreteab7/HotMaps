var sidePanelPhoto = $(".photoURL");

//searches for a venue when a marker is selected
function photoSearch(venueId) {
  // Remove exisiting photo
  $('.background').empty();

  var venueId = venueId;
  var squareURL = 'https://api.foursquare.com/v2/venues/' +
    venueId + '/' +
    'photos?' +
    'client_id=' + clientID + '&' +
    'client_secret=' + clientSecret + '&' +
    'v=' + now;

  $.ajax({
    url: squareURL,
    method: "GET"
  }).done(function(data) {

    var photoData = data.response.photos;
    var prefix = photoData.items[0].prefix;
    var suffix = photoData.items[0].suffix;
    var size = 'width300'; // size of side panel in width

    var photoURL = prefix + size + suffix;

    var addImg = $('<img class="photoURL">');
    addImg.addClass('photoURL');

    //set photo in here.
    addImg.attr('src', photoURL);
    // addImg.append(sidePanelPhoto);
    $('.background').append(addImg);
  });
}
