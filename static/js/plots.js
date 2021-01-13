fetch ("/api/xbox_top50")
  .then(function(resp){
    return resp.json();
  })
  .then(function(data){
    // console.log(data)
  });


function unpack(rows, index) {
  return rows.map(function (row) {
    return row[index];
  });
}

function getcountryData() {
  d3.json("/api/xbox_top50").then(function (data){
    // console.log(data)
    var country = d3.select("#myInput").property("value")
    data = data.filter(row=>row.Country===country);
    var ID = unpack(data, "ID");
    var Date = unpack(data, "Date");
    var Country = unpack(data, "Country");
    var Game = unpack(data, "Game");
    var Rank= unpack(data, "Rank");
        buildDropdown(ID, Date, Country, Game, Rank);
        // console.log(data)
        buildTable(data);
        return data
      });
    // console.log(Game)
}

d3.selectAll("#countrysearch").on("click", getcountryData);

//////////////////////////////

function getgameData() {
  d3.json("/api/xbox_top50").then(function (data){
    var game = d3.select("#myInput").property("value")
    data = data.filter(row=>row.Game===game);
    var ID = unpack(data, "ID");
    var Date = unpack(data, "Date");
    var Country = unpack(data, "Country");
    var Game = unpack(data, "Game");
    var Rank= unpack(data, "Rank");
        buildDropdown(ID, Date, Country, Game, Rank);
        // console.log(data)
        buildTable(data);
        return data
      });
    // console.log(Game)
}

d3.selectAll("#gamesearch").on("click", getgameData);

function getrankData() {
  d3.json("/api/xbox_top50").then(function (data){
    console.log(data)
    var rank = d3.select("#myInput").property("value")
    data = data.filter(row=>row.Rank==rank);
    var ID = unpack(data, "ID");
    var Date = unpack(data, "Date");
    var Country = unpack(data, "Country");
    var Game = unpack(data, "Game");
    var Rank= unpack(data, "Rank");
        buildDropdown(ID, Date, Country, Game, Rank);
        buildTable(data);
        return data
      });
    // console.log(Game)
}

d3.selectAll("#ranksearch").on("click", getrankData);


function buildDropdown(
  ID,
  Date,
  Country,
  Game,
  Rank,
) {
  var data = d3.select("#myDropdown");
  var tbody = data.select("tbody");
  for (var i = 0; i < ID.length; i++) {
    var trow = tbody.append("tr");
    trow.append("td").text(ID[i]);
    trow.append("td").text(Date[i]);
    trow.append("td").text(Country[i]);
    trow.append("td").text(Game[i]);
    trow.append("td").text(Rank[i]);


    // Function called by DOM changes
    function dropdownchange() {
      var dropdownMenu = d3.select("#myDropdown");
      // Assign the value of the dropdown menu option to a variable
      var dataset = dropdownMenu.property("value");
      // Initialize an empty array for the country's data
      var data = getData();
      // console.log(data)

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
        // console.table(dataRow);
        let row = tbody.append("tr");
        var colList = ["Date", "Country", "Game", "Rank"]
        colList.forEach((val) => {
           let cell = row.append("td");
           cell.text(dataRow[val]);
       });
    });
}

// handleClick
// function handleClick(){
//     d3.event.preventDefault() // prevent from refreshing the page

//     let country = d3.select("#countrysearch").property("value");
//     let filterData = tableData;

//     // Check to see if a date was entered and filter the data using date
//     if (country){
//         // Apply filter to the table data to only keep the
//         // rows where the datetime value matches the filter value
//         filterData = filterData.filter((row) => row.country === country);

//     }

    // buildTable(filterData);
// }



// buildTable(tableData);






// // // Promise Pending
// // const dataPromise = d3.json(data);
// // console.log("Data Promise: ", dataPromise);

// function buildtable(
//   // ID,
//   // Date,
//   Country,
//   Game,
//   // Rank,
// ) {
//   var table = d3.select("#summary-table");
//   var tbody = table.select("tbody");
//   for (var i = 0; i < data.length; i++) {
//     var trow = tbody.append("tr");
//     // trow.append("td").text(ID[i]);
//     // trow.append("td").text(Date[i]);
//     trow.append("td").text(Country[i]);
//     trow.append("td").text(Game[i]);
//     // trow.append("td").text(Rank[i]);
// }};

// buildtable;
