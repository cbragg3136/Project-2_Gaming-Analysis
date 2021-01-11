function unpack(rows, index) {
  return rows.map(function (row) {
    return row[index];
  });
}

function getsteamData() {
  d3.json("/api/current_100/").then(function (data){
    var name = d3.select("#myInput").property("value")
    // data = data.filter(row=>row.Name===name);
    var name = unpack(data, "Name");
    var current  = unpack(data, "Current Players");
    var peak  = unpack(data, "Date");
    var time = unpack(data, "Time");
    var link = unpack(data, "Link");
    var appid= unpack(data, "Appid");
    var tags= unpack(data, "Tags");
        buildDropdown(name, current, peak, time, link, appid, tags);
        console.log(data)
        buildTable(data);
        return data
      });
    // console.log(Game)
}

d3.selectAll("#steamsearch").on("click", getsteamData);


function buildDropdown(
  Name,
  Current,
  Peak,
  Time,
  Link,
  Appid,
  Tags,
) {
  var data = d3.select("#myDropdown");
  var tbody = data.select("tbody");
  for (var i = 0; i < Name.length; i++) {
    var trow = tbody.append("tr");
    trow.append("td").text(Name[i]);
    trow.append("td").text(Current[i]);
    trow.append("td").text(Peak[i]);
    trow.append("td").text(Time[i]);
    trow.append("td").text(Link[i]);
    trow.append("td").text(Appid[i]);
    trow.append("td").text(Tags[i]);


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
    data.forEach((dataRow, i) => {
       let row = tbody.append("tr");
       let cell = row.append("td")
       cell.text(i+1);
       colList = ["Name", "Appid", "Current Players", "Peak Players", "Time"]
       colList.forEach((val) => {
           let cell = row.append("td");
           cell.text(dataRow[val]);
       });
    });
}
