const sortAlphabeticalByKey = (key) => (a, b) => {
  const valueA = (a[key] || '').toLowerCase();
  const valueB = (b[key] || '').toLowerCase();
  if (valueA < valueB)
    return -1;
  if (valueA > valueB)
    return 1;
  return 0;
};

const sortNumericallyByKey = (key, defaultValue) => (a, b) => {
  const valueA = a[key];
  const valueB = b[key];

  const filledValueA = valueA === undefined ? defaultValue : valueA;
  const filledValueB = valueB === undefined ? defaultValue : valueB;

  if (filledValueA < filledValueB)
    return -1;
  if (filledValueA > filledValueB)
    return 1;
  return 0;
};

const sortBinaryByKey = (key) => (a, b) => {
  const valueA = a[key];
  const valueB = b[key];

  if(valueA && !valueB) {
    return -1;
  }

  if(valueB && !valueA) {
    return 1;
  }

  if(valueA && valueB) {
    return 0;
  }

  if(!valueA && !valueB) {
    return 0;
  }

  return 0;
};

export {
  sortAlphabeticalByKey,
  sortNumericallyByKey,
  sortBinaryByKey,
};