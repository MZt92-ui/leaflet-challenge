


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

    // Create the map object with options
    var map = L.map("map", {
      center: [40.09, -110.71],
      zoom: 6,
      layers: [lightmap, overlayMap]
    });
  };

createMap()
