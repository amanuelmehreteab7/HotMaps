var api_key = 'AIzaSyALhVNfaKgpvJuLqX6VuPljcwgUcEj_qHw';
var map;
var fscoordinates = []; //This will hold our array of objects which is the response from FourSquare
var results = 20
var locat = 'Washington'
var categoryId
var mLat = 38.8961336
var mLgt = -77.0028392
var buttonClicked

//Initilizing the map from Google Maps API documentation
var map;
    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: new google.maps.LatLng(mLat,mLgt),

      });

  //When the map is initialized, we should search FourSquare and place all the markers

  // searchFourSquare();
}

    //Creating a request to search four square
    function searchFourSquare(){
      var clientID = 'Z3ZK4RYUU12ONLPWGOTA5DY3KOTMYFIVRFEOWW0KZ3VB13TF';
      var clientSecret = 'JRZK5DZC5GJVEFTIOEJVEGH14KPSI5V5XUJWPD3KTYFXEQK1';

      //Creating a call to moment'js in order to add to the end of the squareURL
      var now = moment().format("YYYYMMDD");

      //URL endpoint for foursquare which contains the city of Washington DC hardcoded in for now

            var squareURL = 'https://api.foursquare.com/v2/venues/search?near='+ locat +'&client_id=' + clientID + '&limit=50' + '&client_secret=' + clientSecret + '&v=' + now;

    // Use this URL later to search by category
    //   var squareURL = 'https://api.foursquare.com/v2/venues/search?near='+ locat +'&categoryId=' + categoryId +'&client_id=' + clientID + '&limit=' + results + '&client_secret=' + clientSecret + '&v=' + now;


      //Making a call to the url for the city in order to display the popular locations
      $.ajax({
        url: squareURL,
        method: "GET"
      }).done(function(response){

        console.log(response);

        // For each of the venue responses matching the city, loop through and create an array of objects
        // console.log(response);
        for (var i = 0; i < response.response.venues.length; i++) {
          fscoordinates.push({
            name: response.response.venues[i].name,
            lat:response.response.venues[i].location.lat,
            lng: response.response.venues[i].location.lng,
            hereNow:response.response.venues[i].hereNow.count,
            id:response.response.venues[i].categories[0].id,
            categoriy: response.response.venues[i].categories[0].pluralName,
            checkinsCount: response.response.venues[i].stats.checkinsCount
          })

              mLat = response.response.venues[0].location.lat;
              mLgt = response.response.venues[0].location.lng;
                map = new google.maps.Map(document.getElementById('map'), {
                zoom: 12,
                center: new google.maps.LatLng(mLat,mLgt),
                  });

          //Loop through all of the objects to display all markers on the map

          for (var j = 0; j < fscoordinates.length; j++) {
            var latLng = new google.maps.LatLng(fscoordinates[j].lat,fscoordinates[j].lng);
            var marker = new google.maps.Marker({
              position: latLng,
              map: map
            });
          } // Completes the loop through the array of objects
      } // Completes the loop through add all responses to an array of objects

      // sort object by chekin count

      for (var i = 0; i < fscoordinates.length; i++) {
        for (var j=i+1; j < fscoordinates.length; j++) {
          if (fscoordinates[i].checkinsCount < fscoordinates[j].checkinsCount)
          {
            t=fscoordinates[i];
            fscoordinates[i] = fscoordinates[j];
            fscoordinates[j] = t
          }
        }
      }

      // _.orderBy(fscoordinates, ['checkinsCount', 'hereNow'], ['desc', 'desc']);

      console.log("==============log Object after sort=========================");
      console.log(fscoordinates);

      // create an object with uniques category IDs

      var uniqueObject = [];
      uniqueObject = _.uniqBy(fscoordinates, 'id')
      console.log("==============log unique Object=========================");
      console.log(uniqueObject);

      // select the top 10 categories
      
        uniqueObject.splice([9],uniqueObject.length - 10)

      console.log('========top Ten=========');
      console.log(uniqueObject);


    }); // Completes the function that pulls down the response

  } // Completes the entire function that searches foursquare


  // Click event search(){
  $('#searchCity').on('click', function(event) {
    console.log('searchCity Button - Clicked');
    event.preventDefault();
    locat = $('#search').val().trim();
    console.log('Var Location' + locat);

    // use later for search by category and restrict the number of results
    // results = $('#resultsNumber').val().trim()
    // console.log('Var results' + results);
    // categoryId  = $('#categories').val().trim()
    // console.log('var categories' + categoryId);

    fscoordinates = []
    $('#header').html('<h2>' + 'What is Happening in ' + locat + '</h2>');
    searchFourSquare()
  })

  $(document).ready(function() {
    $('select').material_select();
  });
