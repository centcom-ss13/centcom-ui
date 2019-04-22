const initialState = {
  loading: {},
};

const merge = (...args) => {
  const output = args.reduce((acc, cur) => ({ ...acc, ...cur }), {});
  return output;
};


export default function defaultState(state = initialState, action) {
  switch (action.type) {
    case 'MERGE':
      return merge(state, action.data);
    case 'MERGE_LOADING':
      return merge(state, { loading: merge(state.loading, action.data) });
    case 'PARSE_AND_MERGE_BOOKS':
      return parseAndMergeBooks(state, action.data);
    default:
      return state
  }
}