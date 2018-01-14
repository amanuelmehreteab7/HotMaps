// Initialize checkboxes
var catId = $('#cat');

for (var i = 0; i < categories.length; i++) {
  addCheckBox(categories[i]);
}

// On click search for 'button that was clicked'
$('.cat').on('click', function() {
  var search = $(this).attr('data-catId');
  console.log('searchID: ', search);

  fourSquareFunction(search);
});

// Add checkbox with search categoryID to data attribute
function addCheckBox(place) {

  var pTag = $('<p>');

  var input = $('<input type="checkbox"/>');
  input.attr('id', place.name);
  input.attr('data-catId', place.id);
  input.addClass('cat');

  var label = $('<label>');
  label.attr('for', place.name);
  label.text(place.name);

  pTag.append(input);
  pTag.append(label);
  catId.append(pTag);
}
