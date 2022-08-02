// fetchGraphql using async/await method
const fetchGraphql = async (url, query, variables) => {
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

// const handleError = (response) => {
//   if (!response.ok) {
//     throw Error(response.statusText);
//   }
//   console.log("Query was successful");
//   return response.json();
// };

// Using .then chaining
// const fetchGraphql = async (url, query, variables) => {
//   fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       query,
//       variables,
//     }),
//   })
//     .then((res) => {
//       return handleError(res);
//     })
//     .then((data) => {
//       console.log(data);
//       return data;
//     })
//     .catch((err) => {
//       console.log(err);
//       return {};
//     });
// };

export default fetchGraphql;
