import DB from '../brokers/serverBroker';

const db = new DB();

function setKey(key, value) {
  return {
    type: 'MERGE',
    data: { [key]: value },
  };
}

function setLoading(key, value) {
  return {
    type: 'MERGE_LOADING',
    data: { [key]: value },
  };
}

function fetch(key) {
  return async (dispatch, getState) => {
    const { app } = getState();
    const { loading } = app;
    if(!loading[key]) {
      dispatch(setLoading(key, true));
      dispatch(setKey(key, undefined));
      try {
        const objects = await db.get(key);
        dispatch(setKey(key, objects));
        dispatch(setLoading(key, false));
      } catch(e) {
        dispatch(setLoading(key, false));
      }
    }
  }
}

export default {
  fetch,
}