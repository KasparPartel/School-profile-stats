import { USERNAME } from "./constants.js";
import { calculateLevel, levelNeededXP } from "./calculate.js";
import fetchTransactions from "./fetchTransactions.js";
import fetchProgresses from "./fetchProgresses.js";
import { lorem } from "./data.js";

(async () => {
  const transactions = await fetchTransactions();
  const progresses = await fetchProgresses();

  let expAmount = progresses.reduce((prev, curr) => {
    const transaction = transactions.find(
      (obj) => obj.objectId === curr.objectId
    );
    return prev + transaction.amount;
  }, 0);

  const level = calculateLevel(expAmount);

  const expNeeded = levelNeededXP(level + 1);
  const expInLevel = expNeeded - levelNeededXP(level);
  const expInProcent = 100 - Math.round(expInLevel / (expNeeded - expAmount));

  const usernameDOM = document.querySelector(".username");
  usernameDOM.textContent = USERNAME;

  const chartsDOM = document.querySelectorAll(".chart");
  chartsDOM.forEach((el) => (el.textContent = lorem));

  const levelDOM = document.querySelector(".level");
  levelDOM.textContent = level;

  const expLeftDOM = document.querySelector(".exp-left");
  expLeftDOM.textContent = expNeeded - expAmount;

  const expFillerDOM = document.querySelector(".exp-filler");
  expFillerDOM.style.width = `${expInProcent}%`;
})();
