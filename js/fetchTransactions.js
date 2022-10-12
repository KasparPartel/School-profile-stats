import { URL, USERNAME } from "./constants.js";

import { fetchAllDataRecursive } from "./fetch.js";
import { filterResultsRegex, groupBy } from "./helpers/filter.js";

const query = `query ($username: String, $start: Int) {
  user(where: { login: { _eq: $username }}) {
    transactions(offset: $start) {
      amount
      path
      objectId
    }
  }
}`;

const variables = {
  username: USERNAME,
  start: 0,
};

const regex = /\bpiscine-go/;

const fetchTransactions = async () => {
  let results = await fetchAllDataRecursive(
    URL,
    query,
    variables,
    "transactions"
  );

  const filteredResults = filterResultsRegex(results, "path", regex);

  const groupedResults = groupBy(filteredResults, "objectId");

  // filterHighest filters out the highest object
  const filterHighest = (arrOfObjArr, property) => {
    return Object.keys(arrOfObjArr).map((key) => {
      const arr = arrOfObjArr[key];
      return arr.find(
        (o) => o.amount === Math.max(...arr.map((el) => el[property]))
      );
    });
  };

  return filterHighest(groupedResults, "amount");
};

export default fetchTransactions;
