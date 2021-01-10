// fetch ("/api/steam_metadata")
//   .then(function(resp){
//     return resp.json();
//   })
//   .then(function(data){
//     console.log(data)
//   });


function unpack(rows, index) {
  return rows.map(function (row) {
    return row[index];
  });
}

function getcategoriesData() {
  var search = d3.select("#myInput").property("value")
  d3.json("/api/steam_metadata/category/"+search).then(function (data){
    var name_x = unpack(data, "Game");
    var short_description = unpack(data, "Description");
    var metascore = unpack(data, "Metascore");
    var genres = unpack(data, "Genres");
    var categories = unpack(data,"Categories");
    var recommendations = unpack(data, "Recommendations");
    var release_date = unpack(data, "Release Date");
    var developer = unpack(data, "Developer");
    var publisher = unpack(data, "Publisher");
    var positive = unpack(data, "Positive");
    var negative = unpack(data, "Negative");
    var owners = unpack(data, "Owners");
    var average_forever = unpack(data, "Average Playtime");
    var median_forever = unpack(data, "Median Playtime");
    var price = unpack(data, "Price");
    buildTable(data);
    return data
  });
}

d3.selectAll("#categoriessearch").on("click", getcategoriesData);

//////////////////////////////

function getgenresData() {
  var search = d3.select("#myInput").property("value")
  d3.json("/api/steam_metadata/genre/"+search).then(function (data){
    var name_x = unpack(data, "Game");
    var short_description = unpack(data, "Description");
    var metascore = unpack(data, "Metascore");
    var genres = unpack(data, "Genres");
    var categories = unpack(data,"Categories");
    var recommendations = unpack(data, "Recommendations");
    var release_date = unpack(data, "Release Date");
    var developer = unpack(data, "Developer");
    var publisher = unpack(data, "Publisher");
    var positive = unpack(data, "Positive");
    var negative = unpack(data, "Negative");
    var owners = unpack(data, "Owners");
    var average_forever = unpack(data, "Average Playtime");
    var median_forever = unpack(data, "Median Playtime");
    var price = unpack(data, "Price");
    buildTable(data);
    return data
  });
}


d3.selectAll("#genressearch").on("click", getgenresData);

function getnameData() {
  var search = d3.select("#myInput").property("value")
  d3.json("/api/steam_metadata/name/"+search).then(function (data){
    var name_x = unpack(data, "Game");
    var short_description = unpack(data, "Description");
    var metascore = unpack(data, "Metascore");
    var genres = unpack(data, "Genres");
    var categories = unpack(data,"Categories");
    var recommendations = unpack(data, "Recommendations");
    var release_date = unpack(data, "Release Date");
    var developer = unpack(data, "Developer");
    var publisher = unpack(data, "Publisher");
    var positive = unpack(data, "Positive");
    var negative = unpack(data, "Negative");
    var owners = unpack(data, "Owners");
    var average_forever = unpack(data, "Average Playtime");
    var median_forever = unpack(data, "Median Playtime");
    var price = unpack(data, "Price");
    buildTable(data);
    return data
  });
}

d3.selectAll("#namesearch").on("click", getnameData);


function buildDropdown(
  name_x,
  short_description,
  metascore,
  genres,
  recommendations,
  categories,
  release_date,
  developer,
  publisher,
  positive,
  negative,
  owners,
  average_forever,
  median_forever,
  price,
  initialprice){
  var data = d3.select("#myDropdown");
  var tbody = data.select("tbody");
  for (var i = 0; i < name_x.length; i++) {
    var trow = tbody.append("tr");
    trow.append("td").text(name_x[i]);
    trow.append("td").text(short_description[i]);
    trow.append("td").text(genres[i]);
    trow.append("td").text(categories[i]);
    trow.append("td").text(metascore[i]);
    trow.append("td").text(recommendations[i]);
    trow.append("td").text(release_date[i]);
    trow.append("td").text(developer[i]);
    trow.append("td").text(publisher[i]);
    trow.append("td").text(positive,[i]);
    trow.append("td").text(negative[i]);
    trow.append("td").text(owners[i]);
    trow.append("td").text(average_forever[i]);
    trow.append("td").text(median_forever[i]);
    trow.append("td").text(price[i]);
    trow.append("td").text(initialprice,[i]);


    // Function called by DOM changes
    function dropdownchange() {
      var dropdownMenu = d3.select("#myDropdown");
      // Assign the value of the dropdown menu option to a variable
      var dataset = dropdownMenu.property("value");
      // Initialize an empty array for the country's data
      var data = getData();
      console.log(data)

      if (dataset == 'us') {
          data = us;
      }
      else if (dataset == 'uk') {
          data = uk;
      }
      else if (dataset == 'canada') {
          data = canada;
      }
      // Call function to update the chart
      updatePlotly(data);
    }

    // Update the restyled plot's values
    function updatePlotly(newdata) {
      Plotly.restyle("pie", "values", [newdata]);
    }
}};

buildDropdown;

var tbody = d3.select("tbody");
// Function table
function buildTable(data){
    //clear out existing data
    tbody.html("");
    var columns = ["Game", "Description", "Genres", "Categories",
      "Metascore", "Release Date", "Developer", "Publisher", "Positive",
      "Negative", "Owners", "Average Playtime", "Median Playtime", "Price"]

    data.forEach(dataRow => {
        // console.table(dataRow);
        let row = tbody.append("tr");

       // console.table(Object.values(dataRow));
       // Object.values(dataRow).forEach((val) => {
       columns.forEach((col) => {
           let cell = row.append("td");
           cell.text(dataRow[col]);
       });
    });
}
