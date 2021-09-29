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

function reZoomMap() {
    var x = window.innerWidth || this.document.documentElement.clientWidth;

    if(x >= 600 && x <= 1000) {
        map.setView([37.8, -96], 3);
    } else if(x < 600) {
        map.setView([37.8, -96], 3);
    } else {
        map.setView([37.8, -96], 4);
    }
}
