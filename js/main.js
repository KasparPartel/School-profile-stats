import { USERNAME } from "./constants.js";
import { calculateLevel, levelNeededXP } from "./calculate.js";
import fetchTransactions from "./fetchTransactions.js";
import fetchProgresses from "./fetchProgresses.js";

(async () => {
  // Graphql database calls
  const transactions = await fetchTransactions();
  const progresses = await fetchProgresses();

  // Charts generation
  xpToNextLevelChart();
  progressChart();

  // expToNextLevelChart generates a filler chart for current level and xp needed
  // to level up
  async function xpToNextLevelChart() {
    let xpAmount = progresses.reduce((prev, curr) => {
      const transaction = transactions.find(
        (obj) => obj.objectId === curr.objectId
      );
      return prev + transaction.amount;
    }, 0);
    console.log(`${xpAmount}xp`);

    const level = calculateLevel(xpAmount);

    const expNeeded = levelNeededXP(level + 1);
    const expInLevel = expNeeded - levelNeededXP(level);
    const expInProcent = 100 - Math.round(expInLevel / (expNeeded - xpAmount));

    const usernameDOM = document.querySelector(".username");
    usernameDOM.textContent = USERNAME;

    const levelDOM = document.querySelector(".level");
    levelDOM.textContent = level;

    const expLeftDOM = document.querySelector(".exp-left");
    expLeftDOM.textContent = expNeeded - xpAmount;

    const expFillerDOM = document.querySelector(".exp-filler");
    expFillerDOM.style.width = `${expInProcent}%`;
  }

  // progressChart generates a chart of bar chart of xp earned over 12 months
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
      type: "bar",
      data: {
        datasets: [
          {
            label: "Xp earned in the last 12 months",
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
