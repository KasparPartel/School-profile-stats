import { fetchGraphql } from "./fetch.js";
import { URL, USERNAME } from "./main.js";

// fetchUser fetches user object from graphql
const fetchUser = async () => {
  const query = `query ($username: String) {
    user(where: { login: { _eq: $username }}) {
      id
      login
    }
  }`;

  const variables = {
    username: USERNAME,
  };

  const data = await fetchGraphql(URL, query, variables);
  return data;
};

export default fetchUser;
