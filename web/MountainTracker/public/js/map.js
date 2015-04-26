var waypoints = [];
var markers = [];
var map;
var polyLine;
var marker;
$( document ).ready(function() {

    var rendererOptions = {
        draggable: true
    };

    var Bulgaria = new google.maps.LatLng(42.67435978649672, 23.330433696309797);

    function initialize() {
        var mapOptions = {
            zoom: 15,
            center: Bulgaria,
            mapTypeId:google.maps.MapTypeId.HYBRID
        };
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        google.maps.event.addDomListener(window, 'load', initialize);

        marker = new google.maps.Marker({
            map: map,
            draggable: true,
            position: new google.maps.LatLng(42.67435978649672, 23.330433696309797)
        });
        google.maps.event.addListener(marker, 'position_changed', updateMarker);
    }

    google.maps.event.addDomListener(window, 'load', initialize);
});

function loadTrack(trackId, use_markers) {

    if(polyLine){
        polyLine.setMap(null);
    }
    waypoints = [];

    var polyOptions = {
        strokeColor: '#FF0000',
        strokeOpacity: .5,
        strokeWeight: 7,
        map: map
    };

    polyLine = new google.maps.Polyline(polyOptions);
    polyLine.setPath(waypoints);
}

function updateMarker() {
    $("#checkpoint_lat").val(marker.getPosition()['k']);
    $("#waypoint_lat").val(marker.getPosition()['k']);
    $("#checkpoint_lon").val(marker.getPosition()['D']);
    $("#waypoint_lon").val(marker.getPosition()['D']);
}