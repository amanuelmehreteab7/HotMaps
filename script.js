// Get the value of the search term
var searchLocation;



$("#search").keypress(function(e) {
    if(e.which == 13) {
      event.preventDefault();
      searchLocation = $("#search").val().trim();
        console.log(searchLocation);
    }
});
