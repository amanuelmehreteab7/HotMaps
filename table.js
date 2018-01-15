var tableBodyID = $('#addRow');

function updateTable(name, hereNow, address, url) {

  // document.getElementById("table").clear();
  // document.getElementById("table").style.display="table";

  var rTag = $('<tr>');

  rTag.attr('class', 'delete');
  var tableLocationName = $('<td>');
  tableLocationName.text(name);

  var tableHereNow = $('<td>');
  tableHereNow.text(hereNow);

  var tableAddress = $('<td>')
  tableAddress.text(address);

  var tableURL = $('<td>')

  var ah = $('<a>');
  ah.attr('href', url);
  ah.text('Visit their site');

  rTag.append(tableLocationName);
  rTag.append(tableHereNow);
  rTag.append(tableAddress);
  rTag.append(tableURL);
  tableURL.append(ah)
  tableBodyID.append(rTag);
}
