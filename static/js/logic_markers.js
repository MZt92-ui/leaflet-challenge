

//*********************************************************************
// Perform an API call to the USGS API and then call the function to draw map
//*********************************************************************
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
d3.json(queryUrl).then(createMap);

//*********************************************************************
// supporting function to format circle markers
//*********************************************************************
function circleSize(mag){
  return mag * 20000
};

function circleColor(mag){
  switch(true){
    case (mag <1):
      return "green";
    case (mag >= 1 && mag < 2):
      return "#ffffd4";
    case (mag >= 2 && mag < 3):
      return "#fed98e";
    case (mag >= 3 && mag < 4):
      return "#fe9929";
    case (mag >= 4 && mag < 5):
      return "#d95f0e";
    default:
      return "#993404";
  }
};
// *********************************************************************
// function to draw the map
// *********************************************************************
function createMap(response){

  // base map with base layer
  var map = L.map("map", {
    center: [40.09, -110.71],
    zoom: 6
  });

  L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 15,
    id: "light-v10",
    accessToken: API_KEY
  }).addTo(map);

  // add on circle markers for each earthquake location
  var allFeature = response.features;

  for (var i = 0; i < allFeature.length; i++){
      var location = allFeature[i].geometry.coordinates;
      var magnitude = allFeature[i].properties.mag;
      var place = allFeature[i].properties.place;

      L.circle([location[1],location[0]],{
        color: circleColor(magnitude),
        fillColor: circleColor(magnitude),
        fillOpacity: 0.75,
        radius: circleSize(magnitude),
      })
      .bindPopup("<h1> "+ magnitude +" </h1><hr><h1> "+ place +" </h1>")
      .addTo(map);

      console.log(magnitude);
  };
      
  // create a legend
  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function () {
    var div = L.DomUtil.create("div", "info legend");
    var limits = [0, 1, 2, 3, 4, 5];
    var colors = ["green", "#ffffd4", "#fed98e", "#fe9929", "#d95f0e", "#993404"];
    var labels = [];

    var legendInfo = "<h1>Earthquake Magnitude</h1>" +
        "<div class = \"labels\">" + 
        "<div class=\"min\">" + limits[0] + "</div>" +
        "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
        "</div>";
    
    div.innerHTML = legendInfo;

    limits.forEach(function (limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML = "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  legend.addTo(map);
};

