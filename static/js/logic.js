
// get our url for the data
var url = "/api/us_energy";

//  use d3 to get the data
d3.json(url, function(data){
    
    // grab values
    var year = data.map(item => item.year)
    var renewable_production = data.map(item => item.produced_renewable)
    var total_consumed = data.map(item => item.total_consumed)
    