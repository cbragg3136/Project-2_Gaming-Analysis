var ctx = document.getElementById("myChart");

var stars = [16795, 4003, 71312, 202041, 225778, 24335, 28990];
var frameworks = ["Africa", "Antarctica", "Asia", "Europe", "North America", "South America", "Australia"];

var myChart = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: frameworks,
    datasets: [
      {
        label: "Number of Users per Contient",
        data: stars,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(40, 150, 200, 0.2)",
          "rgba(80, 50, 125, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(40, 150, 200, 1)",
          "rgba(80, 50, 125, 1)"
        ],
        borderWidth: 1
      }
    ]
  }
});