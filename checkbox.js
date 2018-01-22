// Initialize checkboxes
var catId = $('#cat');

function allBtns(categories) {

  for (var i = 0; i < categories.length; i++) {
    oneRadioBtn(categories[i]);
  }
}

// On click search for 'button that was clicked'
$(document).on('click', 'input.cat', function() {
  searchBar = false;

  var searchId = $(this).attr('data-cat-id');

  deleteMarkers();

  searchFourSquare(searchId);
});

// Add button with search categoryID to data attribute
function oneRadioBtn(place) {

  var pTag = $('<p>');

  var input = $('<input type="radio"/>');
  input.attr('id', place.cat);
  input.attr('data-cat-id', place.categoryId);
  input.attr('name', 'group-cat')
  input.addClass('cat');

  var label = $('<label>');
  label.attr('for', place.cat);
  label.addClass('drk-organe-txt');
  label.text(place.cat);

  pTag.append(input);
  pTag.append(label);
  catId.append(pTag);
}
