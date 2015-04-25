$.extend({
    waypoint: function(gpx_data){
        return new google.maps.LatLng(gpx_data['lat'], gpx_data['lon']);
    }
})

var waypoints = [];
var map;

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

        //calcRoute();
    }
/*
    function calcRoute() {
        var request = {
            origin: new google.maps.LatLng(41.61466951550686, 23.53847655634091),
            destination: new google.maps.LatLng(43.99315175518877, 22.885365995155503),
            //waypoints:[{location: new google.maps.LatLng(41.614655162258444, 23.538355493044712)}, {location: new google.maps.LatLng(41.614718087716696, 23.538256009373384)}],
            travelMode: google.maps.TravelMode.WALKING
        };
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });
    }
    function computeTotalDistance(result) {
        var total = 0;
        var myroute = result.routes[0];
        for (var i = 0; i < myroute.legs.length; i++) {
            total += myroute.legs[i].distance.value;
        }
        total = total / 1000.0;
        document.getElementById('total').innerHTML = total + ' km';
    }*/

    $.get("tracks/201309071750", function(response){
        var gpx_data = response['gpx']['trk']['trkseg']['trkpt'];
        console.log(gpx_data);

        $.each(gpx_data, function(i, gpx){
            console.log(gpx);
            waypoints.push({"lat":gpx['lat'], "lng":gpx['lon']});
        });
/*

        var route =  {
            origin: $.waypoint(gpx_data[0]),
            destination: $.waypoint(gpx_data[gpx_data.length - 1]),
            travelMode: google.maps.TravelMode.WALKING
        };

        $.each(gpx_data, function(i, gpx){
            console.log(gpx);
            waypoints.push({"lat":gpx['lat'], "lng":gpx['lon']});
        });

        //console.log(route.waypoints);

        directionsService.route(route, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });
*/
        var polyOptions = {
            strokeColor: '#FF0000',
            strokeOpacity:.5,
            strokeWeight: 7,
            map: map
        };
        poly = new google.maps.Polyline(polyOptions);
        poly.setPath(waypoints);

        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < waypoints.length; i++) {
            bounds.extend(new google.maps.LatLng(waypoints[i]['lat'],waypoints[i]['lng']));
        }
        bounds.getCenter();
        
        map.fitBounds(bounds);
    });

    google.maps.event.addDomListener(window, 'load', initialize);
});
