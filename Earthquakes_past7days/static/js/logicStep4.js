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
// Create the earthquake layer for our map.
let earthquakes = new L.layerGroup();
// We define an object that contains the overlays.
// This overlay will be visible all the time.
let overlays = {
    Earthquakes: earthquakes
  };

let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom:3,
    layers: [streets]
})

// To complete the code for the map layers, use the Leaflet control.layers, which will control the layers we'll see on the map
L.control.layers(baseMaps, overlays).addTo(map);  

let earthquakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
d3.json(earthquakeURL).then(function(data){
    function styleInfo(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(feature.properties.mag),
            color: "#000000",
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        }; 
    } 
    
    // This function determines the color of the circle based on the magnitude of the earthquake.
    function getColor(magnitude) {
        if (magnitude > 5) {
        return "#ea2c2c";
        }
        if (magnitude > 4) {
        return "#ea822c";
        }
        if (magnitude > 3) {
        return "#ee9c00";
        }
        if (magnitude > 2) {
        return "#eecc00";
        }
        if (magnitude > 1) {
        return "#d4ee00";
        }
        return "#98ee00";
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
        style: styleInfo,
        // We create a popup for each circleMarker to display the magnitude and
        //  location of the earthquake after the marker has been created and styled.
        onEachFeature: function(feature, layer) {
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
        }
    }).addTo(earthquakes);

    earthquakes.addTo(map);
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



           


