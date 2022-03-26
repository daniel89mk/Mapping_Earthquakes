// Add console.log to check to see if our code is working.
console.log("working");

// We are going to read the external json file
// we need to use d3.json() method, but we need to have
// <script src="https://d3js.org/d3.v5.min.js"></script> file in the index.html


// Add a tile layer  for our map
// Option 1:
// We create the tile layer that will be the background of our map. (Street-level Map)
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    "Streets": streets,
    "Satellite": satelliteStreets
  };

let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom:3,
    layers: [streets]
})

// To complete the code for the map layers, use the Leaflet control.layers, which will control the layers we'll see on the map
L.control.layers(baseMaps).addTo(map);  

let earthquakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
d3.json(earthquakeURL).then(function(data){
    function styleInfo(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: "#ffae42",
            color: "#000000",
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        }; 
    }    

    // This function determines the radius of the earthquake marker based on its magnitude.
    // Earthquakes with a magnitude of 0 will be plotted with a radius of 1.            
    function getRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
        }
        return magnitude * 4;
    }

        
    
    L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
            console.log(data)
            return L.circleMarker(latlng)
        },
        style: styleInfo
    }).addTo(map)
});
// let torontoHoods = "https://raw.githubusercontent.com/daniel89mk/Mapping_Earthquakes/Mapping_GeoJSON_Polygons/torontoNeighborhoods.json";

// d3.json(torontoHoods).then(function(data){
//     console.log(data);
//     L.geoJSON(data).addTo(map)
// });

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



           


