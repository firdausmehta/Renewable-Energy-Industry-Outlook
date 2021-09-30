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

// create function that assigns colors for map & legend
function getColor(d) {
    return  d >       0  ? "#90e893":
            d > -100000  ? "#faffc7":
            d > -300000  ? "#f4ff73":
            d > -500000  ? "#fffb00":
            d > -1000000 ? "#ff9500":
            d > -2000000 ? "#f23c05":
            d > -3000000 ? "#DF1418":
            d > -5000000 ? "#b30505":
                           "#690202"                                  
}     

// Create Function for making the Map Legend
function makeLegend(map) {

    var legend = L.control({position: 'bottomright'});
        
    legend.onAdd = function (map) {
        // create a div for the legend
        var div = L.DomUtil.create('div', 'info legend');
            div.innerHTML += "<p><strong>Energy Difference <br>(in Billions of Btus)</br><strong></p>";
            grades = [ 2, -100000,-300000, -500000, -1000000, -3000000, -5000000]
            labels = [];
            grades1 = ["0 >","> -100,000","> -300,000", "> -500,000","> -1,000,000", "> -3,000,000", "> -5,000,000"]


            // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(grades[i] - 1) + '"></i> ' + 
                grades1[i] + '<br>' ;
        }        
        return div;
    };

    legend.addTo(map)
}
