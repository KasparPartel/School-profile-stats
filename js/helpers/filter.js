export const filterResultsRegex = (results, key, regex) => {
  return results.filter((el) => {
    let result = regex.exec(el[key]);

    if (result === null) {
      return el;
    }
  });
};

// groupBy groups objects into one array by key
export const groupBy = (objArr, property) => {
  return objArr.reduce((acc, obj) => {
    const key = obj[property];
    acc[key] ??= [];
    acc[key].push(obj);
    return acc;
  }, {});
};
