//*********************************************************************
// Perform an API call to the USGS API and then call the function to draw map
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
d3.json(queryUrl).then(test);



function test(responce){

  var allFeature = responce.features;

  for (var i = 0; i < allFeature.length; i++){
  
    var magnitude = allFeature[i].properties.mag;
    circleColor(magnitude);
}};


function circleColor(mag){
  switch(true){
    case (mag <1):
      console.log (mag, "less than 1");
      break;
    case (mag < 2):
      console.log (mag,"between 1 and 2");
      break;
    case (mag < 3):
      console.log (mag,"between 2 and 3");
      break;
    case (mag < 4):
      console.log (mag,"between 3 and 4");
      break;
    case (mag < 5):
      console.log (mag,"between 4 and 5");
      break;
    default:
      console.log (mag, "larger than 5");
  }
};