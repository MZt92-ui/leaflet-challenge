// Perform an API call to the USGS API to get earthquake information
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"

// d3.json(queryUrl).then(createCircle);
d3.json(queryUrl).then(createCircle);

// Create a function to create a circle marker for each feature
function createCircle(response){

  var map = L.map("map", {
    center: [40.09, -110.71],
    zoom: 7
  });

  L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  }).addTo(map);

  var allFeature = response.features;

  var allCoordinate = [];
  for (var i = 0; i < allFeature.length; i++){
      var location = allFeature[i].geometry.coordinates;
      allCoordinate.push([location[1],location[0]]);
  };

  console.log(allCoordinate[0]);

  L.circle(allCoordinate[0],{
    color: "green",
    fillColor: "green",
    fillOpacity: 0.75,
    radius: 50000
  }).addTo(map);


};

