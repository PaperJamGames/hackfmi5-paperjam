var waypoints = [];
var map;
var polyLine;
$( document ).ready(function() {

    var rendererOptions = {
        draggable: true
    };

    var poly;
    var geodesicPoly;

    var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);;
    var directionsService = new google.maps.DirectionsService();

    var Bulgaria = new google.maps.LatLng(41.61466951550686,23.53847655634091);

    function initialize() {

        var mapOptions = {
            zoom: 7,
            center: Bulgaria,
            mapTypeId:google.maps.MapTypeId.HYBRID
        };
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        directionsDisplay.setMap(map);

        google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
            computeTotalDistance(directionsDisplay.getDirections());
        });
    }

    $.get("tracks/all", function (tracks) {

        $.each(tracks, function (i, track) {
            $("#trackList").append('<li><a href="#"">' + track['trackId'] + '</a></li>');
        });

        $("#trackList a").click(function () {
            loadTrack($(this).text());
        });
    });

    google.maps.event.addDomListener(window, 'load', initialize);
});

function loadTrack(trackId) {
    if(polyLine){
        polyLine.setMap(null);
    }
    waypoints = [];
    $.get("tracks/" + trackId, function (response) {
        var gpx_data = response['gpx']['trk']['trkseg']['trkpt'];
        console.log(gpx_data);

        $.each(gpx_data, function (i, gpx) {
            console.log(gpx);
            waypoints.push({"lat": gpx['lat'], "lng": gpx['lon']});
        });

        var polyOptions = {
            strokeColor: '#FF0000',
            strokeOpacity: .5,
            strokeWeight: 7,
            map: map
        };

        polyLine = new google.maps.Polyline(polyOptions);
        polyLine.setPath(waypoints);

        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < waypoints.length; i++) {
            bounds.extend(new google.maps.LatLng(waypoints[i]['lat'], waypoints[i]['lng']));
        }
        bounds.getCenter();

        map.fitBounds(bounds);
    });
}