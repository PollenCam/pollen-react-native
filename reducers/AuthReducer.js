import { createAction, handleActions } from 'redux-actions';
import auth from '../auth/Auth'

export const constants = {
  CHANGE_FORM: 'AUTH_CHANGE_FORM',
  SET_AUTH: 'AUTH_SET_AUTH',
  SENDING_REQUEST: 'AUTH_SENDING_REQUEST',
  REQUEST_ERROR: 'AUTH_REQUEST_ERROR',
  CLEAR_ERROR: 'AUTH_CLEAR_ERROR',
  LOG_IN_REQUEST: 'AUTH_LOG_IN_REQUEST',
  REGISTER_REQUEST: 'AUTH_REGISTER_REQUEST',
  LOG_OUT_REQUEST: 'AUTH_LOG_OUT_REQUEST'
};

export const actions = Object
  .keys(constants)
  .reduce((res, key) =>
    Object.assign(res, {[key]: createAction(constants[key])})
  , {});

const defaultState = {
  formState: {
    email: '',
    password: ''
  },
  error: '',
  currentlySending: false,
  loggedIn: auth.loggedIn(),
};

export default handleActions({
  [constants.CHANGE_FORM]: (state, { action }) => {
    return {
      ...state,
      formState: action.newFormState,
    };
  },
  [constants.SET_AUTH]: (state, { action }) => {
    return {
      ...state,
      loggedIn: action.newAuthState,
    };
  },
  [constants.SENDING_REQUEST]: (state, { action }) => {
    return {
      ...state,
       currentlySending: action.sending,
    };
  },
  [constants.REQUEST_ERROR]: (state, { action }) => {
    return {
      ...state,
      error: action.error,
    };
  },
  [constants.CLEAR_ERROR]: (state, { action }) => {
    return {
      ...state,
      error: '',
    };
  },
  [constants.LOG_IN_REQUEST]: (state, { action }) => {
    return {
      ...state,
      credentials: [
        email: action.email,
        password: action.password,
      ],
    };
  },
  [constants.REGISTER_REQUEST]: (state, { action }) => {
    return {
      ...state,
      credentials: [
        email: action.email,
        password: action.password,
      ],
    };
  },
  [constants.LOG_OUT_REQUEST]: (state, { action }) => {
    return {
      ...state,
    };
  },
}, defaultState);
