import { USERNAME } from "./constants.js";
import { calculateLevel, levelNeededXP } from "./calculate.js";
import fetchTransactions from "./fetchTransactions.js";
import fetchProgresses from "./fetchProgresses.js";
import { lorem } from "./data.js";

(async () => {
  const transactions = await fetchTransactions();
  console.log(transactions);
  const progresses = await fetchProgresses();
  console.log(progresses);

  let xpAmount = progresses.reduce((prev, curr) => {
    const transaction = transactions.find(
      (obj) => obj.objectId === curr.objectId
    );
    return prev + transaction.amount;
  }, 0);
  // console.log(xpAmount);

  const level = calculateLevel(xpAmount);
  // console.log(level);

  const expNeeded = levelNeededXP(level + 1);
  // console.log(expNeeded);

  const usernameDOM = document.querySelector(".username");
  usernameDOM.textContent = USERNAME;

  const chartsDOM = document.querySelectorAll(".chart");
  chartsDOM.forEach((el) => (el.textContent = lorem));

  const levelDOM = document.querySelector(".level");
  levelDOM.textContent = level;

  const expLeftDOM = document.querySelector(".exp-left");
  expLeftDOM.textContent = expNeeded - xpAmount;
})();
