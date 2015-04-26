var FMI = new google.maps.LatLng(42.67435978649672, 23.330433696309797);
var socket = io();
var waypoints = [];
var map;
var polyLine;
var marker;
function log() {return  $('h1#head')[0];}

socket.on('connection', function(socket) {
    log().textContent = 'Connection established.';
});

socket.on('disconnect', function() {
    console.log('Connection closed.');
});

socket.on('newData', function(lat, lon) {
    if(marker){
        marker.setMap(null);
        var position = {"lat": lat, "lng": lon};
        waypoints.push(new google.maps.LatLng(lat, lon));

        marker = new google.maps.Marker({
            map: map,
            draggable: false,
            position: new google.maps.LatLng(lat, lon)
        });

        if(polyLine){
            polyLine.setMap(null);
        }

        var polyOptions = {
            strokeColor: '#FF0000',
            strokeOpacity: .5,
            strokeWeight: 7,
            map: map
        };

        polyLine = new google.maps.Polyline(polyOptions);
        polyLine.setPath(waypoints);
        console.log(waypoints);
    }
});

$( document ).ready(function() {

    function initialize() {
        var mapOptions = {
            zoom: 15,
            center: FMI,
            mapTypeId:google.maps.MapTypeId.HYBRID
        };
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        google.maps.event.addDomListener(window, 'load', initialize);

        marker = new google.maps.Marker({
            map: map,
            draggable: false,
            position: new google.maps.LatLng(42.67435978649672, 23.330433696309797)
        });

        var polyOptions = {
            strokeColor: '#FF0000',
            strokeOpacity: .5,
            strokeWeight: 7,
            map: map
        };

        polyLine = new google.maps.Polyline(polyOptions);
        polyLine.setPath(waypoints);
    }

    google.maps.event.addDomListener(window, 'load', initialize);
});