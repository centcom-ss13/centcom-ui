const unique = (input) => ([...new Set(input)]);

const flatMap = (input) => input.reduce((acc, cur) => ([...acc, ...cur]), []);

export {
  unique,
  flatMap,
}