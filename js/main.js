import { USERNAME } from "./constants.js";
import { calculateLevel, levelNeededXP } from "./calculate.js";
import fetchTransactions from "./fetchTransactions.js";
import fetchProgresses from "./fetchProgresses.js";
import { lorem } from "./data.js";

(async () => {
  const transactions = await fetchTransactions();
  const progresses = await fetchProgresses();

  // Populates chart with placeholder lorem ipsum
  // const chartsDOM = document.querySelectorAll(".chart");
  // chartsDOM.forEach((el) => (el.textContent = lorem));

  expToNextLevelChart();
  progressChart();

  async function expToNextLevelChart() {
    let expAmount = progresses.reduce((prev, curr) => {
      const transaction = transactions.find(
        (obj) => obj.objectId === curr.objectId
      );
      return prev + transaction.amount;
    }, 0);
    console.log(`${expAmount}xp`);

    const level = calculateLevel(expAmount);

    const expNeeded = levelNeededXP(level + 1);
    const expInLevel = expNeeded - levelNeededXP(level);
    const expInProcent = 100 - Math.round(expInLevel / (expNeeded - expAmount));

    const usernameDOM = document.querySelector(".username");
    usernameDOM.textContent = USERNAME;

    const levelDOM = document.querySelector(".level");
    levelDOM.textContent = level;

    const expLeftDOM = document.querySelector(".exp-left");
    expLeftDOM.textContent = expNeeded - expAmount;

    const expFillerDOM = document.querySelector(".exp-filler");
    expFillerDOM.style.width = `${expInProcent}%`;
  }

  async function progressChart() {
    let monthsProgress = {
      sep: 0,
      oct: 0,
      nov: 0,
      dec: 0,
      jan: 0,
      feb: 0,
      mar: 0,
      apr: 0,
      may: 0,
      jun: 0,
      jul: 0,
      aug: 0,
    };

    let ctx = document.querySelector("#chart-progress").getContext("2d");
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            label: "Xp earned in a time period",
            data: [
              { id: "sep", nested: { value: 1500 } },
              { id: "oct", nested: { value: 500 } },
              { id: "nov", nested: { value: 500 } },
              { id: "dec", nested: { value: 500 } },
              { id: "jan", nested: { value: 500 } },
              { id: "feb", nested: { value: 500 } },
              { id: "mar", nested: { value: 500 } },
              { id: "apr", nested: { value: 500 } },
              { id: "may", nested: { value: 500 } },
              { id: "jun", nested: { value: 500 } },
              { id: "jul", nested: { value: 500 } },
              { id: "aug", nested: { value: 500 } },
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        parsing: {
          xAxisKey: "id",
          yAxisKey: "nested.value",
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
})();

/*  // Generator for generating chart labels
    function* arrGenerator(start = 0, inc = 50000, limit = 578575) {
      let i = start;
      yield start;
      while (i < limit) {
        i += inc;
        if (i > limit) {
          yield limit;
          return;
        }
        yield i;
      }
    }

    const labels = [...arrGenerator()];

    const data = {
      labels,
      datasets: [
        {
          label: "my first dataset",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: [0, 10, 5, 2, 20, 30, 45],
        },
      ],
    };

    const config = {
      type: "line",
      data,
      options: {},
    };
    const myChart = new chartsDOM(
      document.querySelector(".progress-chart"),
      config
    );
    console.log(labels); */
