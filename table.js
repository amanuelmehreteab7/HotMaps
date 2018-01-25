var tableBodyID = $('#addRow');


//Add contect to the table based on the foursquare data
function updateTable(name, hereNow, address, url, id) {


  var rTag = $('<tr>');


  rTag.attr('class', 'delete');
  rTag.attr('id', id);
  var tableLocationName = $('<td>');
  tableLocationName.text(name);

  var tableHereNow = $('<td>');
  tableHereNow.text(hereNow);

  var tableAddress = $('<td>')
  tableAddress.text(address);

  var tableURL = $('<td>')

  if (url == undefined){
  }
  else{
    var ah = $('<a>');
    ah.attr('href', url);
    ah.text('Visit their site');
}

  rTag.append(tableLocationName);
  rTag.append(tableHereNow);
  rTag.append(tableAddress);
  rTag.append(tableURL);
  tableURL.append(ah)
  tableBodyID.append(rTag);
}
tableClick = (e)  => {
    whyNot(e);
  }
