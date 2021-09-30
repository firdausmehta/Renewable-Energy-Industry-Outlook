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

// Create a Function that will make the map layer according to the Year Selected in the Map Control in the top right corner
function makeMap(year) {
    return new Promise((resolve, reject) => {
        d3.json(data_url, function(data){
    
            // loop through our data and join with states data
            for(var i = 0; i < data.length; i++) {
                for(var j = 0; j < statesData.features.length; j++) {
                    if(data[i].state === statesData.features[j].properties.name && data[i].year == year) {
                        statesData.features[j].properties.energy_difference = data[i].difference;
                        statesData.features[j].properties.produced_renewable = data[i].produced_renewable;
                        statesData.features[j].properties.total_consumed= data[i].total_consumed;
                        statesData.features[j].properties.population= data[i].population;
                        statesData.features[j].properties.energy_price= data[i].energy_price;
                        statesData.features[j].properties.year= data[i].year;
                    }
                }
            };

            // grab energy difference min and max values to create the color scale
            var min = Math.min.apply(null, data.difference);
            var max = Math.max.apply(null, data.difference);
        
            console.log('min, max:', min, max);
        
            // create style function 
            function style(feature) {
                return {
                    fillColor: getColor(feature.properties.energy_difference),
                    weight: 2,
                    opacity: 0.8,
                    color: 'gray',
                    fillOpacity: 0.8
                };
            }

              
            // add mouseover event for each feature to style and show popup
              function onEachFeature(feature, layer) {
                layer.on('mouseover', function(e) {
                    layer.setStyle({
                        weight: 5,
                        color: '#666',
                        dashArray: '',
                        fillOpacity: 1
                    });

                    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                        this.bringToFront();
                    }
                    layer.openPopup();
                }).on('mouseout', function(e) {
                    geojson.resetStyle(e.target);
                    layer.closePopup();
                });

                 // create the popup variable
                 var popupHtml = "<h5>" + (feature.properties.name) + "</h5>" + "<hr>"+
                 "<p><strong>Energy Difference:\xa0 </strong>" + numeral((feature.properties.energy_difference)).format('0,0.0') + "</p>" +
                 "<p><strong>Renewable Energy Production:\xa0  </strong>" + numeral(feature.properties.produced_renewable).format('0,0') + "</p>" + 
                 "<p><strong>Total Consumed Energy:\xa0 </strong>" + numeral((feature.properties.total_consumed)).format('0,0.0') + "</p>" + 
                 "<p><strong>Population:\xa0  </strong>" + numeral((feature.properties.population) * 1000).format('0,0.0') + "</p>" +
                 "<p><strong>Energy Price ($ per Bil. Btus):\xa0\xa0  </strong>" + numeral((feature.properties.energy_price)/1000).format('$0,0.00') + "</p>" +
                 "<p><strong>Year:\xa0  </strong>" + (feature.properties.year) + "</p>";

                 
                 // add the popup to the map and set location
                layer.bindPopup(popupHtml, { className: 'popup', 'offset': L.point(0, -20) });
            }
        
            //  add the style and onEachFeature function to the map
            resolve(geojson = L.geoJson(statesData, {
                style: style,
                onEachFeature: onEachFeature
            }));
            
            // .addTo(map);
        });
    })
};







Promise.all([makeMap(2021), makeMap(2025), makeMap(2030)]).then(layers => {
    var layer_2021 = layers[0]
    var layer_2025 = layers[1]
    var layer_2030 = layers[2]
    // array destructuring for fun and less typing;
    // var [layer_2021, layer_2025, layer_2030] = layers;
    var baseMaps = {
        2021: layer_2021,
        2025: layer_2025,
        2030: layer_2030
    }


    // default is 2021
    layer_2021.addTo(map);
    makeLegend(map);

    L.control.layers(baseMaps).addTo(map)


})