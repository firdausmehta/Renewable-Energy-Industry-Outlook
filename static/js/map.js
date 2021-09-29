// create our base map
var mapboxAccessToken = API_KEY;

var map = L.map("map", {
    // layers: one_year
}).setView([37.8, -96], 4);

// create a function to resize the map for small screens
reZoomMap(); 

window.addEventListener("resize", function() {
    reZoomMap();
});