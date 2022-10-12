import { USERNAME } from "./constants.js";
import { calculateLevel, levelNeededXP } from "./calculate.js";
import fetchTransactions from "./fetchTransactions.js";
import fetchProgresses from "./fetchProgresses.js";
import fetchAuditXP from "./fetchAuditXP.js";

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
  // Wait for graphql database calls
  const transactions = await fetchTransactions();
  const progresses = await fetchProgresses();
  const auditXP = await fetchAuditXP();

  // Generate charts asynchronously
  xpToNextLevelChart();
  progressChart();
  auditsChart();

  // xpToNextLevelChart generates a filler bar chart of level and xp left to next level
  async function xpToNextLevelChart() {
    let xpAmount = progresses.reduce((prev, curr) => {
      const transaction = transactions.find(
        (obj) => obj.objectId === curr.objectId
      );
      return prev + transaction.amount;
    }, 0);

    const level = calculateLevel(xpAmount);

    const expNeeded = levelNeededXP(level + 1);
    const expInLevel = expNeeded - levelNeededXP(level);
    const expInProcent = 100 - Math.round(expInLevel / (expNeeded - xpAmount));

    // Write data to chart
    const usernameDOM = document.querySelector(".username");
    usernameDOM.textContent = USERNAME;

    const levelDOM = document.querySelector(".level");
    levelDOM.textContent = level;

    const expLeftDOM = document.querySelector(".exp-left");
    expLeftDOM.textContent = (expNeeded - xpAmount).toString();

    const expFillerDOM = document.querySelector(".exp-filler");
    expFillerDOM.style.width = `${expInProcent}%`;
  }

  // progressChart generates a chart of bar chart of xp earned over 12 months
  async function progressChart() {
    console.log("------- Generating progress chart -------");

    // Object to keep track of xp for every month
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

    // Calculate xp for every month
    progresses.forEach((el) => {
      const d = new Date(el.createdAt);
      const transaction = transactions.find(
        (obj) => obj.objectId === el.objectId
      );
      monthsXP[months[d.getMonth()]] += transaction.amount;
    });

    let ctx = document.querySelector("#chart-progress").getContext("2d");

    new Chart(ctx, {
      type: "bar",
      data: {
        datasets: [
          {
            label: "XP earned",
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

  // auditsChart generates a doughnut chart of audit ratio
  async function auditsChart() {
    console.log("------- Generating audits chart -------");

    // Calculate xp amount of audits received
    let receivedXP = auditXP.reduce((prev, curr) => {
      if (curr.type === "down") {
        return prev + Math.floor(curr.amount);
      }
      return prev;
    }, 0);

    // Calculate xp amount of audits done
    const doneXP = auditXP.reduce((prev, curr) => {
      if (curr.type === "up") {
        return prev + Math.floor(curr.amount);
      }
      return prev;
    }, 0);

    let ctx = document.querySelector("#chart-audit").getContext("2d");

    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Received", "Done"],
        datasets: [
          {
            label: "Audit ratio",
            data: [receivedXP, doneXP],
            backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
          },
        ],
      },
    });
  }
})();
