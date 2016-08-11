 $(document).ready(function() {

var currentURL = window.location.origin;
$.get(currentURL + "/locations", function(mapData){
 var map;
 var bounds = new google.maps.LatLngBounds();
 //30.298063, -97.785785 middle of lake austin
 var markersArray = [];

 // Display a map on the page
 map = new google.maps.Map(document.getElementById("map"));

 //geolocation//
 var gotCurrentLocation = false;
 var curPos = {};
 var curMarker = new google.maps.Marker({});
 if (navigator.geolocation) {
   navigator.geolocation.getCurrentPosition(function(position) {
     curPos = {
       lat: position.coords.latitude,
       lng: position.coords.longitude
     };
     console.log("curPos.lat = "+ curPos.lat );
     console.log("curPos.lng = "+ curPos.lng);
     gotCurrentLocation = true;
     curMarker = new google.maps.Marker({
       position: curPos,
       map: map,
       title: "current location",
       icon: {
         path: google.maps.SymbolPath.CIRCLE,
         scale: 4
       }
     });
   }, function() {
     handleLocationError(true, infoWindow, map.getCenter());
     console.log("handleLocationError(true");
   });
 } else {
   // Browser doesn't support Geolocation
   handleLocationError(false, infoWindow, map.getCenter());
   console.log("handleLocationError(false,");
 }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
  }
  //end geolocation//
  //Voting location markers
  var markers = [];
  for (var i = 0; i < mapData.length; i++) {
    markers.push({
      location_name:  mapData[i].location_name,
      lat:            mapData[i].latitude,
      lng:            mapData[i].longitude
    });
  }
  // Display multiple markers on a map
  var infoWindow = new google.maps.InfoWindow();
  var marker;
  var i;
  // Loop through our array of markers & place each one on the map
  for( i = 0; i < mapData.length; i++ ) {
    //trap for incorrect lat or lng
    if (typeof markers[i].lat === "number" || typeof markers[i].lng === "number") {
      var position = new google.maps.LatLng(markers[i].lat, markers[i].lng);
      bounds.extend(position);
      marker = new google.maps.Marker({
        position:   position,
        map:        map,
        title:      markers[i].location_name
        });
      markersArray.push(marker);
      // Allow each marker to have an info window
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          //infoWindow.setContent('We need to put something meaningful here!!!');
          //infoWindow.setContent(infoWindowContent[i][0]);
          infoWindow.setContent('<div class="info_content">' +
          //'<p><a href="'+mapData[i].url+'" target="_blank">' + mapData[i].location_name + '</a></p>'+
          i +': We need to put something meaningful here!!!</div>');
          marker.addListener('click', function() {
            infoWindow.open(map, marker);
          });
        }
      })(marker, i));
      //add code to change the color desired
      console.log("mapData["+i+"].line_length = "+mapData[i].line_length +" -- "+mapData[i].location_name)
      if( mapData[i].line_length === null ){
        //out of time frame line is gray
        marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png')
      } else if(mapData[i].line_length < 2){
        //short line is green
        marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
      } else if(mapData[i].line_length === 2){
        //medium line is yellow
        marker.setIcon('http://maps.google.com/mapfiles/ms/icons/yellow-dot.png')
      }else{
        //long line is red
        marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png')
      }
    // Automatically center the map fitting all markers on the screen
    map.fitBounds(bounds);
    }
  }
});

