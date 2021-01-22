const chartConfig = (range) => {
  return {
    type: "line",
    data: {
      labels: new Array(50).fill(""),
      datasets: [
        {
          label: "x",
          data: new Array(50).fill(0),
          borderColor: "deeppink",
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
      tooltips: false,
      legend: {
        display: false,
      },
      elements: {
        point: {
          radius: 0,
        },
      },
    },
  };
};

var charts = {};
export const renderChart = (id, range) => {
  var ctx = document.getElementById(id).getContext("2d");
  charts[id] = new window.Chart(ctx, chartConfig([range[0], range[1]]));
};

export const updateData = (id, value) => {
  if (id in charts) {
    charts[id].data.datasets[0].data.shift();
    charts[id].data.datasets[0].data.push(value.x);
    charts[id].data.datasets[1].data.shift();
    charts[id].data.datasets[1].data.push(value.y);
    charts[id].data.datasets[2].data.shift();
    charts[id].data.datasets[2].data.push(value.z);
    charts[id].update({ duration: 0 });
  }
};

export const destroyChart = (id) => {
  charts[id].destroy();
  delete charts[id];
};
