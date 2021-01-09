fetch ("/api/steam_metadata")
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

function getcategoriesData() {
  d3.json("/api/steam_metadata").then(function (data){
    var categories = d3.select("#myInput").property("value")
    data = data.filter(row=>row.categories===categories);
    var appid = unpack(data, "appid");
    var type = unpack(data, "type");
    var name_x = unpack(data, "name_x");
    var short_description = unpack(data, "short_description");
    var metascore = unpack(data, "metascore");
    var genres = unpack(data, "genres");
    var recommendations = unpack(data, "recommendations");
    var release_date = unpack(data, "release_date");
    var developer = unpack(data, "developer");
    var publisher = unpack(data, "publisher");
    var positive = unpack(data, "positive");
    var negative = unpack(data, "negative");
    var owners = unpack(data, "owners");
    var average_forever = unpack(data, "average_forever");
    var average_2weeks= unpack(data, "average_2weeks");
    var median_forever = unpack(data, "median_forever");
    var median_2weeks = unpack(data, "median_2weeks");
    var price = unpack(data, "price");
    var initialprice = unpack(data, "initialprice");
    var discount = unpack(data, "discount");
    var ccu = unpack(data, "ccu");
        buildDropdown(appid, type, name_x, short_description, metascore, genres, recommendations,
            release_date, developer, publisher, positive, negative, owners, average_forever,
            average_2weeks, median_forever, median_2weeks, price, initialprice, discount, ccu, categories);
        console.log(data)
        buildTable(data);
        return data
      });
    // console.log(Game)
}

d3.selectAll("#categoriessearch").on("click", getcategoriesData);

//////////////////////////////

function getgenresData() {
    d3.json("/api/steam_metadata").then(function (data){
        var genres = d3.select("#myInput").property("value")
        data = data.filter(row=>row.genres===genres);
        var appid = unpack(data, "appid");
        var type = unpack(data, "type");
        var name_x = unpack(data, "name_x");
        var short_description = unpack(data, "short_description");
        var metascore = unpack(data, "metascore");
        var categories = unpack(data, "categories");
        var recommendations = unpack(data, "recommendations");
        var release_date = unpack(data, "release_date");
        var developer = unpack(data, "developer");
        var publisher = unpack(data, "publisher");
        var positive = unpack(data, "positive");
        var negative = unpack(data, "negative");
        var owners = unpack(data, "owners");
        var average_forever = unpack(data, "average_forever");
        var average_2weeks= unpack(data, "average_2weeks");
        var median_forever = unpack(data, "median_forever");
        var median_2weeks = unpack(data, "median_2weeks");
        var price = unpack(data, "price");
        var initialprice = unpack(data, "initialprice");
        var discount = unpack(data, "discount");
        var ccu = unpack(data, "ccu");
            buildDropdown(appid, type, name_x, short_description, metascore, genres, recommendations,
                release_date, developer, publisher, positive, negative, owners, average_forever,
                average_2weeks, median_forever, median_2weeks, price, initialprice, discount, ccu, categories);
            console.log(data)
            buildTable(data);
            return data
      });
    // console.log(Game)
}

d3.selectAll("#genressearch").on("click", getgenresData);

function getpriceData() {
    d3.json("/api/steam_metadata").then(function (data){
        var price = d3.select("#myInput").property("value")
        data = data.filter(row=>row.price===price);
        var appid = unpack(data, "appid");
        var type = unpack(data, "type");
        var name_x = unpack(data, "name_x");
        var short_description = unpack(data, "short_description");
        var metascore = unpack(data, "metascore");
        var categories = unpack(data, "categories");
        var recommendations = unpack(data, "recommendations");
        var release_date = unpack(data, "release_date");
        var developer = unpack(data, "developer");
        var publisher = unpack(data, "publisher");
        var positive = unpack(data, "positive");
        var negative = unpack(data, "negative");
        var owners = unpack(data, "owners");
        var average_forever = unpack(data, "average_forever");
        var average_2weeks= unpack(data, "average_2weeks");
        var median_forever = unpack(data, "median_forever");
        var median_2weeks = unpack(data, "median_2weeks");
        var genres = unpack(data, "genres");
        var initialprice = unpack(data, "initialprice");
        var discount = unpack(data, "discount");
        var ccu = unpack(data, "ccu");
            buildDropdown(appid, type, name_x, short_description, metascore, genres, recommendations,
                release_date, developer, publisher, positive, negative, owners, average_forever,
                average_2weeks, median_forever, median_2weeks, price, initialprice, discount, ccu, categories);
            console.log(data)
            buildTable(data);
            return data
      });
    // console.log(Game)
}

d3.selectAll("#pricesearch").on("click", getpriceData);

function buildDropdown(
appid,
type,
name_x,
short_description,
metascore,
genres,
recommendations,
release_date,
developer,
publisher,
positive,
negative,
owners,
average_forever,
average_2weeks,
median_forever,
median_2weeks,
price,
initialprice,
discount,
ccu,
) {
  var data = d3.select("#myDropdown");
  var tbody = data.select("tbody");
  for (var i = 0; i < appid.length; i++) {
    var trow = tbody.append("tr");
    trow.append("td").text(appid[i]);
    trow.append("td").text(type[i]);
    trow.append("td").text(name_x[i]);
    trow.append("td").text(short_description[i]);
    trow.append("td").text(metascore[i]);
    trow.append("td").text(genres[i]);
    trow.append("td").text(recommendations[i]);
    trow.append("td").text(release_date[i]);
    trow.append("td").text(developer[i]);
    trow.append("td").text(publisher[i]);
    trow.append("td").text(positive,[i]);
    trow.append("td").text(negative[i]);
    trow.append("td").text(owners[i]);
    trow.append("td").text(average_forever[i]);
    trow.append("td").text(average_2weeks[i]);
    trow.append("td").text(median_forever[i]);
    trow.append("td").text(median_2weeks[i]);
    trow.append("td").text(price[i]);
    trow.append("td").text(initialprice,[i]);
    trow.append("td").text(discount[i]);
    trow.append("td").text(ccu[i]);


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

       console.table(Object.values(dataRow));
       Object.values(dataRow).forEach((val) => {
           let cell = row.append("td");
           cell.text(val);
       });
    });
}
