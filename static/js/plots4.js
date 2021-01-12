fetch ("/api/xbox_metadata")
  .then(function(resp){
    return resp.json();
  })
  .then(function(data){
    console.log(data)
  });


function unpack(rows, index) {
  return rows.map(function (row) {
    return row[index];
  });
}

function getidData() {
    d3.json("/api/xbox_metadata").then(function (data){
      var id = d3.select("#myInput").property("value")
      data = data.filter(row=>row.ID===id);
    //   var id = unpack(data, "ID");
      var date = unpack(data, "Date");
      var game = unpack(data, "Game");
      var description = unpack(data, "Description");
      var rating= unpack(data, "Rating");
      var rating = unpack(data, "Rating Notes");
      var screen = unpack(data, "Screen Links");
          buildDropdown(id, date, game, description, rating, rating, screen);
          console.log(data)
          buildTable(data);
          return data
        });
      // console.log(Game)
  }

  d3.selectAll("#idsearch").on("click", getidData);



//////////////////////////////

function getgameData() {
  d3.json("/api/xbox_metadata").then(function (data){
    var game = d3.select("#myInput").property("value")
    data = data.filter(row=>row.Game===game);
    var id = unpack(data, "ID");
    var date = unpack(data, "Date");
    // var Game = unpack(data, "Game");
    var description = unpack(data, "Description");
    var rating= unpack(data, "Rating");
    var rating = unpack(data, "Rating Notes");
    var screen = unpack(data, "Screen Links");
        buildDropdown(id, date, game, description, rating, rating, screen);
        console.log(data)
        buildTable(data);
        return data
      });
    // console.log(Game)
}

d3.selectAll("#msdetailsearch").on("click", getgameData);

function buildDropdown(
  ID,
  Date,
  Game,
  Description,
  Rating,
  Rating,
  Screen,
) {
  var data = d3.select("#myDropdown");
  var tbody = data.select("tbody");
  for (var i = 0; i < ID.length; i++) {
    var trow = tbody.append("tr");
    trow.append("td").text(ID[i]);
    trow.append("td").text(Date[i]);
    trow.append("td").text(Game[i]);
    trow.append("td").text(Description[i]);
    trow.append("td").text(Rating[i]);
    trow.append("td").text(Rating[i]);
    trow.append("td").text(Screen[i]);


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
    data.forEach(dataRow => {
        console.table(dataRow);
        let row = tbody.append("tr");

       // console.table(Object.values(dataRow));
       let colList = ["Date", "Game", "Description","Genre", "Rating", "Rating Notes"]
       colList.forEach((val) => {
           let cell = row.append("td");
           cell.text(dataRow[val]);
       });
    });
}
