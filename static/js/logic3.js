
var streetMap =

L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "streets-v11",
  accessToken: API_KEY
});

var myMap = L.map("map",{
    center: [40.9, -95.4],
    zoom: 4
});

streetMap.addTo(myMap);
d3.json("/api/steam_no_us_users",function(earthquakeData){
    function styleinfo(feature){
        return {
            radius: getRadius(feature.properties.User),
            fillColor: getColor(feature.properties.User),
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        }
    }
    function getColor(Users){
        switch (true){
            case Users > 40000:
                return "purple";
            case Users > 15000:
                return "blue";
            case Users > 5000:
                return "green";
            case Users > 1000:
                return "yellow";
            case Users > 500:
                return "orange";
            default:
                return "red";
        }
    }

    function rank1(feature){
        if (feature.properties.Rank == 1) {
            return feature.properties.Game;
        }
    }

    function getRadius(Users){
        return Users / 300;
    }

    L.geoJson(earthquakeData, {
        pointToLayer: function(feature, latlng){
            return L.circleMarker(latlng);
        },
        style: styleinfo,
        onEachFeature: function(feature, layer){
            layer.bindPopup("<b>Country:  " + feature.properties.country + "<br> Users:  "  + feature.properties.User)
        }
    }).addTo(myMap)

    var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 500, 1000, 5000, 15000, 40000]

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);
})
