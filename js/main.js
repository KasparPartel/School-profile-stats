import { USERNAME } from "./constants.js";
import { calculateLevel, levelNeededXP } from "./calculate.js";
import fetchTransactions from "./fetchTransactions.js";
import fetchProgresses from "./fetchProgresses.js";

const months = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

(async () => {
  // Graphql database calls
  const transactions = await fetchTransactions();
  const progresses = await fetchProgresses();

  // Charts generation
  xpToNextLevelChart();
  progressChart();
  levelsChart();

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
    console.log("------- Generating progress chart -------");

    const monthsXP = {
      jan: 0,
      feb: 0,
      mar: 0,
      apr: 0,
      may: 0,
      jun: 0,
      jul: 0,
      aug: 0,
      sep: 0,
      oct: 0,
      nov: 0,
      dec: 0,
    };

    progresses.forEach((el) => {
      const d = new Date(el.createdAt);
      const transaction = transactions.find(
        (obj) => obj.objectId === el.objectId
      );
      monthsXP[months[d.getMonth()]] += transaction.amount;
    });

    let ctx = document.querySelector("#chart-progress").getContext("2d");

    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        datasets: [
          {
            label: "Total xp earned in all months",
            data: Object.entries(monthsXP).map((el) => {
              return { id: el[0], nested: { value: el[1] } };
            }),
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

  // levelsChart generates a chart of line chart of levels earned over 12 months
  async function levelsChart() {
    console.log("------- Generating levels chart -------");

    const monthsXP = {
      jan: 0,
      feb: 0,
      mar: 0,
      apr: 0,
      may: 0,
      jun: 0,
      jul: 0,
      aug: 0,
      sep: 0,
      oct: 0,
      nov: 0,
      dec: 0,
    };

    progresses.forEach((el) => {
      const d = new Date(el.createdAt);
      const transaction = transactions.find(
        (obj) => obj.objectId === el.objectId
      );
      monthsXP[months[d.getMonth()]] += transaction.amount;
    });

    let ctx = document.querySelector("#chart-levels").getContext("2d");

    const myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        datasets: [
          {
            label: "Total levels earned in all months",
            data: Object.entries(monthsXP).map((el) => {
              return { id: el[0], nested: { value: el[1] } };
            }),
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
