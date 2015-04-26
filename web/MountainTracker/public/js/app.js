var waypoints = [];
var markers = [];
var map;
var polyLine;
var marker;
$( document ).ready(function() {

    var rendererOptions = {
        draggable: true
    };

    var Bulgaria = new google.maps.LatLng(41.61466951550686,23.53847655634091);

    function initialize() {
        var mapOptions = {
            zoom: 7,
            center: Bulgaria,
            mapTypeId:google.maps.MapTypeId.HYBRID
        };
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        google.maps.event.addDomListener(window, 'load', initialize);

        marker = new google.maps.Marker({
            map: map,
            draggable: true,
            position: new google.maps.LatLng(41.61466951550686,23.53847655634091)
        });
        google.maps.event.addListener(marker, 'position_changed', updateMarker);
    }

    $.get("tracks", function (tracks) {

        $.each(tracks, function (i, track) {
            $("#trackList").append('<li><a href="#" id="' + track['data'] + '">' + track['title'] + '</a></li>');
        });

        $("#trackList a").click(function () {
            loadTrack($(this).attr('id'), false);
        });
    });

    google.maps.event.addDomListener(window, 'load', initialize);
});

function loadTrack(trackId, use_markers) {

    if(polyLine){
        polyLine.setMap(null);
    }
    waypoints = [];

    markers.forEach(function (marker) {
        console.log(marker);
        if(marker != undefined){
            marker.setMap(null);
        }
    });

    markers = [];
    $.get("gps/?select=gpx_parsed&_id=" + trackId, function (response) {
        var gpx_data = response[0]['gpx_parsed'];
        console.log(response);
        $.each(gpx_data, function (i, gpx) {
            var position = {"lat": gpx['lat'], "lng": gpx['lon']};
            waypoints.push(position);
            console.log(position);
            if(use_markers){
                var marker = new google.maps.Marker({
                    map: map,
                    draggable: true,
                    position: new google.maps.LatLng(position['lat'], position['lng'])
                });

                markers.push(marker);
                google.maps.event.addListener(marker, 'position_changed', update);
            }
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

function update() {
    $.each(markers, function(i){
        waypoints[i] = markers[i].getPosition();
    });
    polyLine.setPath(waypoints);
}

function updateMarker() {
    $("#checkpoint_lat").val(marker.getPosition()['k']);
    $("#checkpoint_lon").val(marker.getPosition()['D']);
}
