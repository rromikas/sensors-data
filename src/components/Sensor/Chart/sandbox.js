const chartConfig = (range) => {
  return {
    type: "line",
    data: {
      labels: new Array(50).fill(""),
      datasets: [
        {
          label: "x",
          data: new Array(50).fill(0),
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
          backgroundColor: "transparent",
        },
        {
          label: "y",
          data: new Array(50).fill(0),
          borderColor: "deepskyblue",
          borderWidth: 1,
          backgroundColor: "transparent",
        },
        {
          label: "z",
          data: new Array(50).fill(0),
          borderColor: "rebeccapurple",
          borderWidth: 1,
          backgroundColor: "transparent",
        },
      ],
    },
    yAxisID: Date.now(),
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            display: true,
            stacked: true,
            ticks: {
              min: range[0], // minimum value
              max: range[1], // maximum value
            },
          },
        ],
      },
      elements: {
        point: {
          radius: 0,
        },
      },
    },
  };
};

var data = { x: 0, y: 0, z: 0 };
var charts = {};
export const renderChart = (id, range) => {
  var ctx = document.getElementById(id).getContext("2d");
  charts[id] = new window.Chart(ctx, chartConfig(range));
};

export const updateData = (id, value) => {
  charts[id].data.datasets[0].data.shift();
  charts[id].data.datasets[0].data.push(value.x);
  charts[id].data.datasets[1].data.shift();
  charts[id].data.datasets[1].data.push(value.y);
  charts[id].data.datasets[2].data.shift();
  charts[id].data.datasets[2].data.push(value.z);
  charts[id].update({ duration: 0 });
};
