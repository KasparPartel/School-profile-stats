import fetchGraphql from "./fetch.js";

const URL = "https://01.kood.tech/api/graphql-engine/v1/graphql";
const USERNAME = "kasparp";

let query = `query ($username: String) {
  user(where: { login: { _eq: $username }}) {
    id
    login
  }
}`;

let variables = {
  username: USERNAME,
};

let result = await fetchGraphql(URL, query, variables);
console.log(result);
