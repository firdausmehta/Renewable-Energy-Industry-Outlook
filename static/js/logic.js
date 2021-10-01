
// get our url for the data
var url = "/api/us_energy";

//  use d3 to get the data
d3.json(url, function(data){
    
    // grab values
    var year = data.map(item => item.year)
    var renewable_production = data.map(item => item.produced_renewable)
    var total_consumed = data.map(item => item.total_consumed)

    // create traces for renewable and total consumption 
    var trace1 ={
        x: year,
        y: renewable_production,
        type: "bar",
        name: "Renewable Production",
        marker: {color: 'rgb(26, 118, 255)'},
        
    };

    var trace2= {
        x: year,
        y:  total_consumed,
        type: "bar",
        name: "Total Energy Consumption",
        marker: {color: 'rgb(55, 83, 109)'},
    }

     // create the data array
     data =  [trace1, trace2]

     //  set layout features
     var layout = {
         xaxis: {
             title : "Year",
             tickfont: {
             size: 14,
             color: 'rgb(107, 107, 107)'
           }},
         yaxis: {
           title: 'Billion BTU',
           titlefont: {
             size: 16,
             color: 'rgb(107, 107, 107)'
           },
           tickfont: {
             size: 14,
             color: 'rgb(107, 107, 107)'
           }
         },
         legend: {
           x: 0,
           y: 1.5,
           bgcolor: 'rgba(255, 255, 255, 0)',
           bordercolor: 'rgba(255, 255, 255, 0)'
         },
         barmode: 'group',
         bargap: 0.15,
         bargroupgap: 0.1
       };
       