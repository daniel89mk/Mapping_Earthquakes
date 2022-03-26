// Add console.log to check to see if our code is working.
// console.log("working");

// We are going to read the external json file
// we need to use d3.json() method, but we need to have
// <script src="https://d3js.org/d3.v5.min.js"></script> file in the index.html

// Create the map object with center at the San Francisco airport.
// let map = L.map('mapid').setView([37.5, -122.5], 10);

// Change the geographical center of the map to the geographical center of the Earth and set the zoom level
// let map = L.map('mapid').setView([30, 30], 2);



// Add a tile layer  for our map
// Option 1:
// We create the tile layer that will be the background of our map. (Street-level Map)
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     accessToken: API_KEY
// });

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     accessToken: API_KEY
// });

// street.addTo(map)

// Create a base layer that holds both maps.
let baseMaps = {
    "Street": streets,
    "Satellite Streets": satelliteStreets
  };

let map = L.map('mapid', {
    center: [43.7, -79.3],
    zoom:2,
    layers: [satelliteStreets]
})

// To complete the code for the map layers, use the Leaflet control.layers, which will control the layers we'll see on the map
L.control.layers(baseMaps).addTo(map);  

// Accessing the Toronto airline routes GeoJSON URL.
// let torontoData = "https://raw.githubusercontent.com/daniel89mk/Mapping_Earthquakes/Mapping_GeoJSON_Linestrings/torontoRoutes.json";

// d3.json(torontoData).then(function(data) {
//     console.log(data);
// //   // Creating a GeoJSON layer with the retrieved data.
//   L.geoJSON(data).addTo(map);
// });

let torontoHoods = "https://raw.githubusercontent.com/daniel89mk/Mapping_Earthquakes/Mapping_GeoJSON_Polygons/torontoNeighborhoods.json";

d3.json(torontoHoods).then(function(data){
    console.log(data);
    L.geoJSON(data).addTo(map)
});

// let myStyle = {
//     color:  "#ffffa1",
//     weight: 2,
// }

// d3.json(torontoData).then(function(data) {
//     console.log(data);
// //   // Creating a GeoJSON layer with the retrieved data.
//   L.geoJSON(data, {
//       style: myStyle,
//       onEachFeature: function(feature, layer) {
//           layer.bindPopup("<h3>Airline: " + feature.properties.airline + "</h3> <hr><h3>Destination: "+ feature.properties.dst + "</h3>")
//       }
//   }).addTo(map);
// });


// we will access majorAirports.json file on Github with a variable 
// let airportData = "https://raw.githubusercontent.com/daniel89mk/Mapping_Earthquakes/Mapping_GeoJSON_Points/majorAirports.json";

//Grabbing our GeoJSON data.
// d3.json(airportData).then(function(data) {
//     console.log(data);
// //   // Creating a GeoJSON layer with the retrieved data.
//   L.geoJSON(data).addTo(map);
// });


// d3.json(airportData).then(function(data) {
//     console.log(data);
//     // Creating a GeoJSON layer with the retrieved data.
//     L.geoJSON(data, {
            // onEachFeature: function(feature, layer) {
            //     layer.bindPopup("<h2>Airport Code: " + feature.properties.faa + "</h2>"+"<hr>"+"<p>Airport Name: "+ feature.properties.name)
            // }
//     }).addTo(map)
// });     
           


//Add GeoJSON data.
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};


//Grabbing our GeoJSON data.
// L.geoJSON(sanFranAirport).addTo(map);
// L.geoJSON(sanFranAirport, {
//     //we turn each feature into a marker on the map
//     pointToLayer: function(feature, latlng) {
//         console.log(feature)
//         return L.marker(latlng)
//         .bindPopup("<h2>" + feature.properties.city + "</h2>")
//         // .bindPopup("<h2>" + feature.properties.name + "</h2>"+"<hr>"+"<p>"+ feature.properties.city +", "+ feature.properties.country)
//     }
// }).addTo(map);

// L.geoJSON(sanFranAirport, {
//     onEachFeature: function(feature,layer) {
//         console.log(layer)
//         layer.bindPopup()
//     }
// }).addTo(map)