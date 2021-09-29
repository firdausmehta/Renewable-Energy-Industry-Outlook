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

// add light tile layer
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
    id: 'mapbox/light-v9',
    attribution: "UNC Bootcamp"
}).addTo(map);

//  add states lines data to the map
L.geoJson(statesData).addTo(map);

//  assign our data route to a variable
var data_url = "/api/state_energy";
