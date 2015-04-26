var socket = io();
function log() {return  $('h1#head')[0];}

socket.on('connection', function(socket) {
    log().textContent = 'Connection established.';
});

socket.on('disconnect', function() {
    console.log('Connection closed.');
});

socket.on('newData', function(lon, lat) {
    $('#lon')[0].textContent = "Longitude: " + lon;
    $('#lat')[0].textContent = "Latitude:" + lat;
});