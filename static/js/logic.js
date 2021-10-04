
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

       var config = {responsive: true}

       // Render the plot to the div tag with id "plot"
       Plotly.newPlot("plot1", data, layout, config);
   
   });

   
   // ///////////////////////////////////////////////////////////////

//  select the data for differrence plot
Plotly.d3.csv("static/csv/us_combined.csv", function(err, rows){
    //  get the rows
    function unpack(rows, key) {
    return rows.map(function(row) { return row[key]; });
  }
    //  unpack year annd difference values
    var frames = []
    var x = unpack(rows, 'Year')
    var y = unpack(rows, 'Difference')

    var n = 100;
    for (var i = 0; i < n; i++) {
      frames[i] = {data: [{x: [], y: []}]}
      frames[i].data[0].x = x.slice(0, i+1);
      frames[i].data[0].y = y.slice(0, i+1);
    }
    //  create the plot  and set features
    Plotly.newPlot('plot', [{
      x: frames[1].data[0].x,
      y: frames[1].data[0].y,
      fill: 'tozeroy',
      type: 'scatter',
      mode: 'lines',
      line: {color: 'red'},
    }], {
      title: "Difference Between Renewable Production and Total Consumed Energy",
      xaxis: {
        title:"Year",
        range: [
          1970, 2030
        ]
      },
      yaxis: {
        title: "Difference(Bil. BTU)",
        range: [
          -110506126.9,
          90
        ]
      },
      updatemenus: [{
        x: 0.1,
        y: 0,
        yanchor: "top",
        xanchor: "right",
        showactive: false,
        direction: "left",
        type: "buttons",
        pad: {"t": 87, "r": 10},
        buttons: [{
          method: "animate",
          args: [null, {
            fromcurrent: true,
            transition: {
              duration: 0,
            },
            frame: {
              duration: 40,
              redraw: false
            }
          }],
          label: "Play"
        }, {
          method: "animate",
          args: [
            [null],
            {
              mode: "immediate",
              transition: {
                duration: 0
              },
              frame: {
                duration: 0,
                redraw: false
              }
            }
          ],
          label: "Pause"
        }]
      }]
    }).then(function() {
      Plotly.addFrames('plot', frames);
    });
  
  })
  