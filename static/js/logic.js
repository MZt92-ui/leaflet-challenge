


//**************************************************************
// Create a function to create a map for each feature
// Create a legend
function createMap(overlayMap) {

    // Create the tile layer that will be the background of our map
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "light-v10",
      accessToken: API_KEY
    });
    
    var baseMaps = {
        "Light Map": lightmap
    };

    var overlayMaps = {
        "earthquake locations": overlayMap
    };

    // Create the map object with options
    var map = L.map("map", {
      center: [40.09, -110.71],
      zoom: 6,
      layers: [lightmap, overlayMap]
    });

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);
  };


// Create a function to create a circle marker for each feature
function createCircle(response){

    var allFeature = response.features;

    var circleGroup = [];

    for (var i = 0; i < allFeature.length; i++){

        var location = response.features[i].geometry.coordinates
        if(typeof location === 'undefined'){
            console.log(location)
        } 
        else {
            if(typeof location[0] === 'undefined'){
                console.log(location[0])
            }
            if(typeof location[1] === 'undefined'){
                console.log(location[1])
            }
            if(location[0] != null && location[1] != null & location.length == 3){
               circleGroup.push(
                L.circle(location[1], location[0]),{
                    stroke: false,
                    fillOpacity: 0.75,
                    color: "purple",
                    fillColor: "purple",
                    radius: 1000
                }
               ) 
            }
        }
    };

    var circleLayer = L.layerGroup(circleGroup);
    
    createMap(circleLayer);

};

// Perform an API call to the USGS API to get earthquake information
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"

// d3.json(queryUrl).then(createCircle);
d3.json(queryUrl).then(createCircle);