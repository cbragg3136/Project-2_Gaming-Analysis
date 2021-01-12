var select = d3.select("#game-select")

function fillDropDown(){
  d3.json("api/top100-list/").then((data) => {
    data.forEach((item, i) => {
      var option = select.append("option")
      option.text(item["Name"])
      option.property("value",item["appid"])
    })
  })
}

function drawPlot(appid) {
  var endpoint = "api/players/" + appid
  d3.json(endpoint).then((data) => {
    var trace = {
      x: data.map(row => row["Time"]),
      y: data.map(row => parseInt(row["Current Players"])),
      name: data[0]["Name"],
      showlegend: true
    }
    var layout = {
      xaxis: {title: "Date and Time (UTC)"},
      yaxis: {title: "Number of Players"}
    }
    html = d3.select("#plot").html()
    if (html){
      Plotly.addTraces("plot",[trace])
    } else {
      Plotly.newPlot("plot",[trace],layout)
    }
  });
}

fillDropDown()

function optionChanged(selection){
  var i = selection.selectedIndex
  selection.options[i].disabled = true
  drawPlot(selection.value)
}
