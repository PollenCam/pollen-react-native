import { createAction, handleActions } from 'redux-actions';

export const constants = {
  fetch: 'User.fetch',
  download: 'User.download',
  success: 'User.success',
  error: 'User.error',
};

export const actions = Object
  .keys(constants)
  .reduce((res, key) =>
    Object.assign(res, {[key]: createAction(constants[key])})
  , {});

const defaultState = {
  loaded: {},
  loading: [],
};

export default handleActions({
  [constants.download]: (state, { payload }) => {
    if (state.loading.includes(payload)) return state;
    return {
      ...state,
      loading: [
        ...state.loading,
        payload.uri,
      ],
    };
  },
  [constants.success]: (state, { payload }) => {
    const loading = state.loading.filter((uri) => uri !== payload.uri);
    const loaded = {
      ...state.loaded,
      [payload.uri]: payload.asyncStorageKey,
    };
    return { loaded, loading };
  },
  [constants.error]: (state, { payload }) => {
    const loading = state.loading.filter((uri) => uri !== payload.uri);
    return { loading };
  },
}, defaultState);
