// Initialize checkboxes
var catId = $('#cat');
for (var i = 0; i < categories.length; i++) {
  addCheckBox(categories[i]);
}

// On click search for 'button that was clicked'
$('.cat').change(function() {
  var searchId = $(this).attr('data-cat-id');

  deleteMarkers();
  searchFourSquare(searchId);
});

// Add checkbox with search categoryID to data attribute
function addCheckBox(place) {

  var pTag = $('<p>');

  var input = $('<input type="radio"/>');
  input.attr('id', place.name);
  input.attr('data-cat-id', place.id);
  input.attr('name', 'group-cat')
  input.addClass('cat');

  var label = $('<label>');
  label.attr('for', place.name);
  label.text(place.name);

  pTag.append(input);
  pTag.append(label);
  catId.append(pTag);
}
