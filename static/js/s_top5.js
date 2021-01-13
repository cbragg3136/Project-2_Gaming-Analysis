var ctx = document.getElementById("myChart");

var stars = [1020972, 542142, 174295, 122766, 122556];
var frameworks = ["Counter-Strike: Global Offensive", "Dota 2", "PLAYERUNKNOWN'S BATTLEGROUNDS", "Cyberpunk 2077", "Grand Theft Auto V"];

var myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: frameworks,
    datasets: [
      {
        label: "# of Current Players at 1/6/2021 at 1:37pm",
        data: stars,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)"
        ],
        borderWidth: 1
      }
    ]
  }
});