



// Create a function to create a circle marker for each feature
function createCircle(response){

    var allFeature = response.features;

    var allCoordinate = [];
    var allMagnitude = [];

    for (var i = 0; i < allFeature.length; i++){
        var location = allFeature[i].geometry.coordinates;
        var magnitude = allFeature[i].properties.mag;
        allCoordinate.push([location[1],location[0]]);
        allMagnitude.push(magnitude);
    };

    console.log(allCoordinate);
    console.log(allMagnitude);
};

// Perform an API call to the USGS API to get earthquake information
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"

// d3.json(queryUrl).then(createCircle);
d3.json(queryUrl).then(createCircle);