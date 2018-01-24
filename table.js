var tableBodyID = $('#addRow');

function updateTable(name, hereNow, address, url, id) {

  // document.getElementById("table").clear();
  // document.getElementById("table").style.display="table";

  var rTag = $('<tr>');

  // rTag.attr('id', id)
  // rTag.attr("onclick", "tableClick(this.id)");
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
console.log(url);
  }
  else{
    console.log(url);
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
    console.log(e);
  }
