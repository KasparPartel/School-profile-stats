import { URL, USERNAME } from "./constants.js";

import { fetchAllDataRecursive } from "./fetch.js";
import { filterResultsRegex } from "./helpers/filter.js";

// GRAPHQL query
const query = `query ($username: String, $type: String) {
  user(where: { login: { _eq: $username }}) {
    progresses(where: {object: {type: {_eq: $type}}}) {
      objectId
      createdAt
      path
      isDone
    }
  }
}`;

// Different variables for queries
const variablesProject = {
  username: USERNAME,
  type: "project",
};
const variablesPiscine = {
  username: USERNAME,
  type: "piscine",
};

const regex = /\bpiscine-go/;

const fetchProgresses = async () => {
  const fetchData = async () => {
    let resultsProjects = await fetchAllDataRecursive(
      URL,
      query,
      variablesProject,
      "progresses"
    );
    let resultsPiscine = await fetchAllDataRecursive(
      URL,
      query,
      variablesPiscine,
      "progresses"
    );

    return resultsProjects.concat(resultsPiscine);
  };

  const results = await fetchData();

  let filteredResults = results.filter((obj) => obj.isDone === true);
  filteredResults = filterResultsRegex(filteredResults, "path", regex);

  return filteredResults;
};

export default fetchProgresses;
