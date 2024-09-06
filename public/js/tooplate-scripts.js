const width_threshold = 480;

function drawLineChart() {
  if ($("#lineChart").length) {
    const ctxLine = document.getElementById("lineChart").getContext("2d");

    // Define options for the chart
    const optionsLine = {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Hits"
          }
        }
      },
      maintainAspectRatio: $(window).width() < width_threshold ? false : true
    };

    // Define the chart configuration
    const configLine = {
      type: "line",
      data: {
        labels: [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ],
        datasets: [
          {
            label: "maize",
            data: [88, 68, 79, 57, 50, 55, 70, 60, 72, 65, 85, 90], // Update data for all months
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            cubicInterpolationMode: "monotone",
            pointRadius: 0
          },
          {
            label: "beans",
            data: [33, 45, 37, 21, 55, 74, 69, 60, 62, 70, 80, 85], // Update data for all months
            fill: false,
            borderColor: "rgba(255,99,132,1)",
            cubicInterpolationMode: "monotone",
            pointRadius: 0
          },
          {
            label: "cowpeas",
            data: [44, 19, 38, 46, 85, 66, 79, 70, 68, 75, 90, 95], // Update data for all months
            fill: false,
            borderColor: "rgba(153, 102, 255, 1)",
            cubicInterpolationMode: "monotone",
            pointRadius: 0
          }
        ]
      },
      options: optionsLine
    };

    // Create the chart
    new Chart(ctxLine, configLine);
  }
}

function drawBarChart() {
  if ($("#barChart").length) {
    const ctxBar = document.getElementById("barChart").getContext("2d");

    // Define options for the chart
    const optionsBar = {
      responsive: true,
      scales: {
        x: { // Updated from yAxes to x (for Chart.js v3+)
          beginAtZero: true,
          title: {
            display: true,
            text: "Produce"
          }
        },
        y: { // Updated from yAxes to y (for Chart.js v3+)
          beginAtZero: true,
          title: {
            display: true,
            text: "# of Hits"
          }
        }
      },
      maintainAspectRatio: $(window).width() < width_threshold ? false : true
    };

    // Define the chart configuration
    const configBar = {
      type: "bar", // Changed from "horizontalBar" to "bar"
      data: {
        labels: ["Beans", "GrainMaize", "SoyaBeans", "Peas", "Cowpeas", "GroundNuts"],
        datasets: [
          {
            label: "# of Hits",
            data: [1950, 2000, 1900, 1800, 1600, 1700], // Updated data to be >= 1000
            backgroundColor: [
              "#F7604D",
              "#4ED6B8",
              "#A8D582",
              "#D7D768",
              "#9D66CC",
              "#DB9C3F"
              
            ],
            borderWidth: 0
          }
        ]
      },
      options: optionsBar
    };

    // Create the chart
    new Chart(ctxBar, configBar);
  }
}


function drawPieChart() {
  if ($("#pieChart").length) {
    const chartHeight = 300;

    $("#pieChartContainer").css("height", chartHeight + "px");

    const ctxPie = document.getElementById("pieChart").getContext("2d");

    const optionsPie = {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10
        }
      },
      plugins: {
        legend: {
          position: "top"
        }
      }
    };

    const configPie = {
      type: "pie",
      data: {
        datasets: [
          {
            data: [1200, 1500, 1800, 1300, 1100, 1600, 1400], // Example data values for each cereal
            backgroundColor: [
              "#F7604D", // Beans
              "#4ED6B8", // Soybeans
              "#A8D582", // Cowpeas
              "#D7D768", // Rice
              "#9D66CC", // Groundnuts (G.nuts)
              "#DB9C3F", // Peas
              "#3889FC"  // Maize
            ],
            label: "Purchases"
          }
        ],
        labels: [
          "Beans",
          "Soybeans",
          "Cowpeas",
          "Rice",
          "Groundnuts",
          "Peas",
          "Maize"
        ]
      },
      options: optionsPie
    };

    new Chart(ctxPie, configPie);
  }
}
