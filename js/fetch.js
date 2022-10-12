// fetchGraphql fetches provided query from graphql using async/await method
export const fetchGraphql = async (url, query, variables) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });
    const data = await res.json();
    console.log("Query was successful");
    return data;
  } catch (error) {
    console.log(error);
  }
};

// fetchAllDataRecursive fetches all data from graphql recursively
// because graphql payload length cannot be over 50
export const fetchAllDataRecursive = async (
  URL,
  query,
  variables,
  table,
  arr = []
) => {
  const data = await fetchGraphql(URL, query, variables);

  // Concat previous results with new ones
  arr = [...arr, ...data.data.user[0][table]];

  // Recursion logic
  if (data.data.user[0][table].length === 50) {
    variables.start += 50;
    return fetchAllDataRecursive(URL, query, variables, table, arr);
  } else {
    return arr;
  }
};
