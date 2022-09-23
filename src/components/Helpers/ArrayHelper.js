const ReorganizateArray = (array) => {
  if (!array || array.length === 0) return array;
  let arrayAux = [...array];
  let firstElement = arrayAux.shift();
  arrayAux.push(firstElement);

  return ReindexKeyArray(arrayAux);
};

const ReorganizateArrayAddNewValue = (array, newValue) => {
  if (!array || array.length === 0) return array;
  let arrayAux = [...array];
  arrayAux.shift();
  arrayAux.push(newValue);
  return ReindexKeyArray(arrayAux);
};

const ReindexKeyArray = (array) => {
  if (!array || array.length === 0) return array;
  return array.map((val, index) => {
    return {
      id: index + 1,
      title: val.title,
    };
  });
};

export { ReorganizateArray, ReorganizateArrayAddNewValue };
