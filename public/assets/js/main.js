var mapObj = {};
$(document).ready(function() {
  var markersArray = [];
  var map;
  var currentURL = window.location.origin;
  $.get(currentURL + "/locations", function(mapData){
    mapObj = mapData;

    var bounds = new google.maps.LatLngBounds();
    //30.298063, -97.785785 middle of lake austin


    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map"));
    var gotCurrentLocation = false;
    var curPos = {};






//geo function
var getGeoLocation =  function(map, callback){
      //geolocation//

    var curMarker = new google.maps.Marker({});
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        curPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      //console.log("xxx curPos.lat = "+ curPos.lat );
      //console.log("curPos.lng = "+ curPos.lng);
      //console.log(callback);
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
    // getCurrentPosition error handler
    function() {
      handleLocationError(true, infoWindow, map.getCenter());
      console.log("handleLocationError(true");
    });
      // end getCurrentPosition error handler
    } else {
    // Browser doesn't support Geolocation
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
    //end geolocation//
//callback(map, curPos);
}
//end geo function
//marker function
getGeoLocation(map, function(){
//var setMapMarkers = function(map, curPos){
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
var fenceColor = "";
        //add code to change the color desired
        //console.log("mapData["+i+"].line_length = "+mapData[i].line_length +" -- "+mapData[i].location_name)
        if( mapData[i].line_length === null ){
          //out of time frame line is blue
          marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png')
          fenceColor = "#0000FF";
        } else if(mapData[i].line_length < 2){
          //short line is green
          marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
          fenceColor = "#00FF00";
        } else if(mapData[i].line_length === 2){
          //medium line is yellow
          marker.setIcon('http://maps.google.com/mapfiles/ms/icons/yellow-dot.png')
          fenceColor = "#00FFFF";
        }else{
          //long line is red
          marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png')
          fenceColor = "#FF0000";
        }
      // Automatically center the map fitting all markers on the screen
      map.fitBounds(bounds);
      }
    //geofences
    var fenceCoords = [
        {lat: mapData[i].latitude + 0.0002, lng: mapData[i].longitude + 0.0002},
        {lat: mapData[i].latitude - 0.0002, lng: mapData[i].longitude + 0.0002},
        {lat: mapData[i].latitude - 0.0002, lng: mapData[i].longitude - 0.0002},
        {lat: mapData[i].latitude + 0.0002, lng: mapData[i].longitude - 0.0002}
      ];

      //var thisPlace = [];
      //console.log("curPos.lat = "+curPos.lat);
      var thisPlace = new google.maps.LatLng(curPos.lat, curPos.lng);

      var thisFence = new google.maps.Polygon({
        paths: fenceCoords,
        strokeColor: fenceColor,
        strokeOpacity: 1.0,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map
        });

      // console.log("thisPlace = "+ thisPlace );
      // console.log("thisFence = "+ thisFence);
      var resultContains = google.maps.geometry.poly.containsLocation(thisPlace, thisFence);
      if (resultContains) {
        console.log("You are close enough to "+ mapData[i].location_name + " to enter line length data");
      } else{
        console.log("You are not close enough to "+ mapData[i].location_name + " to enter line length data");
      }

/////////////////////

      google.maps.event.addListener(thisFence, 'click', (function(thisFence, i, resultContains) {

        return function(event) {
          var lineData = mapData[i].line_length;
          if (typeof(lineData) !== "number") {
            lineData=0;
          }
          var contentString = '<p><a href="/location/'+mapData[i].id+'/' +lineData+'/'+resultContains+'">'+mapData[i].location_name+'</a></p>';
          console.log("contentString = "+contentString)
  infoWindow.setContent(contentString);
  infoWindow.setPosition(event.latLng);
  console.log("asd")
  console.log(thisFence.latLng)
 // thisFence.addListener('click', function() {
              infoWindow.open(map, thisFence);
            //});
            //infoWindow.setContent('We need to put something meaningful here!!!');
            // //infoWindow.setContent(infoWindowContent[i][0]);
            // infoWindow.setContent('<div class="info_content">' +
            // //'<p><a href="'+mapData[i].url+'" target="_blank">' + mapData[i].location_name + '</a></p>'+
            // i +': We need to put something meaningful here!!!</div>');
            // marker.addListener('click', function() {
            //   infoWindow.open(map, marker);
            // });
          }
        })(thisFence, i, resultContains));



///////////////////
        // Allow each geofence to have an info window
        // thisFence.addListener('click', showMe);

// function showMe(event) {
//   console.log($(event).;
//   // if (typeof(lineData) !== "number" ) {
//   //   lineData = 0;
//   // }
//   alert("clicked")
//   var contentString = '<a href="/location/'+mapData[i].id+'/' +lineData+'/'+resultContains+'"></a>';
//   infoWindow.setContent(contentString);
//   infoWindow.setPosition(event.latLng);
//   infoWindow.open(map);
//         // // Since this polygon has only one path, we can call getPath() to return the
//         // // MVCArray of LatLngs.
//         // var vertices = this.getPath();

//         // var contentString = '<b>Bermuda Triangle polygon</b><br>' +
//         //     'Clicked location: <br>' + event.latLng.lat() + ',' + event.latLng.lng() +
//         //     '<br>';

//         // // Iterate over the vertices.
//         // for (var i =0; i < vertices.getLength(); i++) {
//         //   var xy = vertices.getAt(i);
//         //   contentString += '<br>' + 'Coordinate ' + i + ':<br>' + xy.lat() + ',' +
//         //       xy.lng();
//         // }

//         // // Replace the info window's content and position.
//         // infoWindow.setContent(contentString);
//         // infoWindow.setPosition(event.latLng);

//         // infoWindow.open(map);
//       }
//     //end geofences
       }

     });
//end marker function
//getGeoLocation(map, setMapMarkers);

   });
});

