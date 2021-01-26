const chartConfig = (range, keys, colors) => {
  return {
    type: "line",
    data: {
      labels: new Array(50).fill(""),
      datasets: keys.map((x, i) => {
        return {
          label: x,
          data: new Array(50).fill(0),
          borderColor: colors[i],
          borderWidth: 1,
          backgroundColor: "transparent",
        };
      }),
    },
    yAxisID: Date.now(),
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          Object.assign(
            {},
            {
              display: true,
              stacked: true,
            },
            range
              ? {
                  ticks: {
                    min: range[0], // minimum value
                    max: range[1], // maximum value
                  },
                }
              : {}
          ),
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

export const renderChart = (id, range, keys, colors) => {
  var ctx = document.getElementById(id).getContext("2d");
  charts[id] = new window.Chart(ctx, chartConfig(range, keys, colors));
};

export const updateData = (id, value) => {
  if (id in charts) {
    Object.values(value).forEach((x, i) => {
      charts[id].data.datasets[i].data.shift();
      charts[id].data.datasets[i].data.push(x);
    });
    charts[id].update({ duration: 0 });
  }
};

export const destroyChart = (id) => {
  charts[id].destroy();
  delete charts[id];
};
