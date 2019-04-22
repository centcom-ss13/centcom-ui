import Fuse from 'fuse.js';

const textSearch = (keys, values, searchText, customOptions) => {
  const options = {
    shouldSort: true,
    threshold: 0.5,
    location: 0,
    distance: 100,
    maxPatternLength: 64,
    minMatchCharLength: 1,
    keys,
    ...customOptions,
  };
  const fuse = new Fuse(values, options); // "list" is the item array
  return fuse.search(searchText);
};

export {
  textSearch,
}