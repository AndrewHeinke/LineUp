 //var mapobj = require("./mapobj.js")
 $(document).ready(function() {

var currentURL = window.location.origin;
$.get(currentURL + "/locations", function(mapData){
    // console.log("mapData.length = "+mapData.length);
    // console.log("mapData[0].location_name = "+ mapData[0].location_name);
    var map;
    var bounds = new google.maps.LatLngBounds();
    var markersArray = [];
    // var map;
    // var bounds = new google.maps.LatLngBounds();
    // var mapOptions = {
    //     mapTypeId: 'roadmap'
    // };

    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map"));
    map.setTilt(45);

var markers = [];
for (var i = 0; i < mapData.length; i++) {
    markers.push({location_name:   mapData[i].location_name,
                               lat:   mapData[i].latitude,
                               lng:   mapData[i].longitude});
}
for (var i = 0; i < markers.length; i++) {
    console.log("markers[ " +i+" ].location_name = " + markers[i].location_name);
    console.log("markers[ " +i+" ].lat = " + markers[i].lat);
    console.log("markers[ " +i+" ].lng = " + markers[i].lng);
    console.log("typeOf lat = " + typeof markers[i].lat)
}
//     // console.log("xxxmarkers = "+xxxmarkers);
// //dummy data
// //{lat: 30.503, lng: -97.689};
//  //   var myLatLng1 = {lat: 30.9, lng: -97.1};
// //================================================
// // data format var markers = [
// //        ['London Eye, London', lat   , lng   ],
// //        ['London Eye, London', 30.503,-97.689],
// //=================================================
//     // Multiple Markers
//     var markers = [
//         ['London Eye, London', 30.503,-97.689],
//         ['Palace of Westminster, London', 30.9,-97.1]
//     ];

//     // Info Window Content
//     var infoWindowContent = [
//         ['<div class="info_content">' +
//         '<h3>London Eye</h3>' +
//         '<p>The London Eye is a giant Ferris wheel situated on the banks of the River Thames. The entire structure is 135 metres (443 ft) tall and the wheel has a diameter of 120 metres (394 ft).</p>' +        '</div>'],
//         ['<div class="info_content">' +
//         '<h3>Palace of Westminster</h3>' +
//         '<p>The Palace of Westminster is the meeting place of the House of Commons and the House of Lords, the two houses of the Parliament of the United Kingdom. Commonly known as the Houses of Parliament after its tenants.</p>' +
//         '</div>']
//     ];

//     // Display multiple markers on a map
//     var infoWindow = new google.maps.InfoWindow(), marker, i;

//     // Loop through our array of markers & place each one on the map
//     for( i = 0; i < markers.length; i++ ) {
//         var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
//         bounds.extend(position);
//         marker = new google.maps.Marker({
//             position: position,
//             map: map,
//             title: markers[i][0]
//         });

//         // Allow each marker to have an info window
//         google.maps.event.addListener(marker, 'click', (function(marker, i) {
//             return function() {
//                 infoWindow.setContent(infoWindowContent[i][0]);
//                 infoWindow.open(map, marker);
//             }
//         })(marker, i));

//         // Automatically center the map fitting all markers on the screen
//         map.fitBounds(bounds);
//     }

//     // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
//     var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
//         //this.setZoom(10);
//         google.maps.event.removeListener(boundsListener);
//     });

// })();
     //just incase there are markers already on the map
        //clear markers
        clearMarkers(markersArray);
        // Display multiple markers on a map
         var infoWindow = new google.maps.InfoWindow(), marker, i;

     // Loop through our array of markers & place each one on the map
         for( i = 0; i < mapData.length; i++ ) {
             //trap for missing lat or lng
             if (markers[i].lat === null || markers[i].lng === null) {
                 console.log("mapData[i].lat = "+markers[i].lat + " mapData[i].lng = " + markers[i].lng + " i = "+i)
            }
             else{
                var position = new google.maps.LatLng(markers[i].lat, markers[i].lng);
                console.log("position = "+ bounds);
                 bounds.extend(position);

                 marker = new google.maps.Marker({
                     position: position,
                     map: map,
                     title: markers[i].location_name
                 });
console.log("line111");
                 markersArray.push(marker);
                 // Allow each marker to have an info window
                 google.maps.event.addListener(marker, 'click', (function(marker, i) {
                 return function() {
                         //infoWindow.setContent(infoWindowContent[i][0]);
                         infoWindow.setContent('<div class="info_content">' +
 //                                            '<p><a href="'+mapData[i].url+'" target="_blank">' + mapData[i].location_name + '</a></p>'+
                                             'xxxx</div>');
                         marker.addListener('click', function() {
                             infoWindow.open(map, marker);
                         });
                     }
                 })(marker, i));
console.log("line 125");
    //             //add code to change the color desired
                 if(i===0){
                     marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
                 }
                 else if(i===1){
                    marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png')
                 }
                 else{
                     marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png')
                 }
                 // Automatically center the map fitting all markers on the screen
                 map.fitBounds(bounds);
                         console.log("bounds = "+ bounds);
             }
         }
     });

    function clearMarkers(markersArray){
        console.log("line 143");
        //passed an array with the gogle maps marker objects saved when the markers are created
        for (var i = 0; i < markersArray.length; i++) {
            markersArray[i].setMap(null);
        }
        markersArray = [];
        bounds = new google.maps.LatLngBounds();
     }
});