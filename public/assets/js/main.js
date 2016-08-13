$(document).ready(function() {
  var markersArray = [];
  var map;
  var  contentArray = [];
  var currentURL = window.location.origin;
  $.get(currentURL + "/locations", function(mapData){
    var bounds = new google.maps.LatLngBounds();

    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map"));
    var gotCurrentLocation = false;
    var curPos = {};

    //geolocation function
    var getGeoLocation =  function(map, callback){
      //geolocation//
      var curMarker = new google.maps.Marker({});
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          curPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
            };
          callback();
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
        },
        function() { // getCurrentPosition error handler
          handleLocationError(true, infoWindow, map.getCenter());
          console.log("handleLocationError(true");
        }); // end getCurrentPosition error handler
      } else {
        // if Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
        console.log("handleLocationError(false,");
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        console.log("handleLocationError has run")
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
          'Error: The Geolocation service failed.' :
          'Error: Your browser doesn\'t support geolocation.');
      }

    } //end geolocation function
    //
    //call getGeoLocation function with setmarkers as callback function
    getGeoLocation(map, function(){
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

      // Loop through our mapData array of voting locations & place marker on map for each
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
          markersArray.push(marker); //this will be used later to update the info window content
          //fill contentArray
          var currentContent = "";
          var lineLengthText = "";
          currentContent = '<div class="info_content">' + '<p> You are currently at '+ markers[i].location_name + '</p>'
          if (markers[i].line_length === 1) {
            lineLengthText = "Currently the line is short.";
          } else if (markers[i].line_length === 2) {
            lineLengthText = "Currently the line is medium.";
          } else if (markers[i].line_length === 3) {
            lineLengthText = "Currently the line is Long.";
          } else {
            lineLengthText = "We apologize for the inconvenience, but there is insufficient data for the line length. "
          }
          currentContent += '<p>'+lineLengthText+'</p> </div>';
          console.log("currentContent = "+currentContent);
          contentArray.push(currentContent);
          console.log("contentArray[i] = "+contentArray[i])
          //end fill contentArray
          // Allow each marker to be clickable to open info window
          // google.maps.event.addListener(marker, 'click', (function(marker, i) {
          //   return function() {
          //     infoWindow.setContent(contentArray[i]);
          //     marker.addListener('click', function() {
          //       infoWindow.open(map, marker);
          //     });
          //   }
          // })(marker, i));
          var fenceEdgeColor = "";
          var fenceFillColor = "";
          if( mapData[i].line_length === null ){
            //out of time frame line is blue
            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png')
            fenceEdgeColor = "#0000FF";
            fenceFillColor = ""
          } else if(mapData[i].line_length < 2){
            //short line is green
            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
            fenceEdgeColor = "#00FF00";
            fenceFillColor = "#66FF33";
          } else if(mapData[i].line_length === 2){
            //medium line is yellow
            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/yellow-dot.png')
            fenceEdgeColor = "#FFFF00";
            fenceFillColor = "#FFFF66";
          }else{
            //long line is red
            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png')
            fenceEdgeColor = "#FF0000";
            fenceFillColor = "#FF5050";
          }
        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
        }
        //geofences square around the map marker
        var fenceCoords = [
         {lat: mapData[i].latitude + 0.00025, lng: mapData[i].longitude + 0.0003},
         {lat: mapData[i].latitude - 0.00025, lng: mapData[i].longitude + 0.0003},
         {lat: mapData[i].latitude - 0.00025, lng: mapData[i].longitude - 0.0003},
         {lat: mapData[i].latitude + 0.00025, lng: mapData[i].longitude - 0.0003}
        ];
       var thisPlace = new google.maps.LatLng(curPos.lat, curPos.lng);
       var thisFence = new google.maps.Polygon({
         paths: fenceCoords,
         strokeColor: fenceEdgeColor,
         strokeOpacity: 1.0,
         strokeWeight: 2,
         fillColor: fenceEdgeColor,
         fillOpacity: 0.35,
          map: map
        });
       var resultContains = google.maps.geometry.poly.containsLocation(thisPlace, thisFence);
        if (resultContains) {
          console.log("You are close enough to "+ mapData[i].location_name + " to enter line length data");
        } else{
          console.log("You are not close enough to "+ mapData[i].location_name + " to enter line length data");
        }
        var lineData = mapData[i].line_length;
        if (typeof(lineData) !== "number") {
          lineData=0;
        };
        console.log("b4 contentArray[i] = "+contentArray[i] + "i +"+i);
        contentArray[i] = contentArray[i]+' <p><a href="/location/'+mapData[i].id+'/' +lineData+'/'+resultContains+'"> Click here to add your line length data for '+mapData[i].location_name+'</a></p>';
        console.log("after contentArray[i] = "+contentArray[i] + "i +"+i);
        google.maps.event.addListener(thisFence, 'click', (function(thisFence, i, resultContains) {
          return function(event) {
            infoWindow.setContent(contentArray[i]);
            infoWindow.setPosition(event.latLng);
            infoWindow.open(map, thisFence);
          };
        })(thisFence, i, resultContains));
        var markerTemp = markersArray[i];
        google.maps.event.addListener(markerTemp, 'click', (function(markerTemp, i) {
            return function() {
              infoWindow.setContent(contentArray[i]);
              markersArray[i].addListener('click', function() {
                infoWindow.open(map, markerTemp);
              });
            }
          })(markerTemp, i));
      };
    });//end -- call getGeoLocation function with setmarkers as callback function
  }); // end $.get(currentURL
}); //$(document).ready

