import { put, call, take, takeLatest, fork, race } from 'redux-saga/effects';

import * as AuthReducer from '../reducers/AuthReducer';
import auth from '../auth/Auth';
import { constants as status } from '../reducers/Status';

function* authorize(storedToken, authData) {
  if (storedToken) {
    yield put({type: AuthReducer.constants.SET_AUTH, newAuthState: true});
    return storedToken;
  }
  yield put({type: AuthReducer.constants.SENDING_REQUEST, currentlySending: true});
  try {
    let response;
    if (authData.isRegistering) {
      response = yield call(auth.register, authData.email, authData.password);
    } else {
      response = yield call(auth.logIn, authData.email, authData.password);
    }
    if (response.errors) {
      throw Error(response.errors);
    }
    yield put({type: AuthReducer.constants.SET_AUTH, newAuthState: true});
    return response;
  } catch (e) {
    yield put({type: AuthReducer.constants.REQUEST_ERROR, error: e});
    return null;
  } finally {
    yield put({type: AuthReducer.constants.SENDING_REQUEST, currentlySending: false});
  }
}

function* logOut() {
  yield put({type: AuthReducer.constants.SENDING_REQUEST, currentlySending: true});
  try {
    let response = yield call(auth.logOut);
    return response;
  } catch (e) {
    yield put({type: AuthReducer.constants.REQUEST_ERROR, error: e});
    return null;
  } finally {
    yield put({type: AuthReducer.constants.SENDING_REQUEST, currentlySending: false});
  }
}

function* authenticationFlow() {
  const storedToken = yield call(auth.getStoredToken);
  console.log('authenticationFlow')

  while (true) {
    console.log('authenticationFlow loop')

    let authData;

    if (!storedToken) {
      console.log('authenticationFlow no stored token')
      const winner = yield race({
        login: take(AuthReducer.constants.LOG_IN_REQUEST),
        register: take(AuthReducer.constants.REGISTER_REQUEST)
      });
      const {email, password} = winner.credentials;
      authData = {
        email: email,
        password: password,
        isRegistering: winner = register
      }
    }

    const {signOutAction} = yield race({
      logOut: take(AuthReducer.constants.LOG_OUT_REQUEST),
      auth: call(authorize, storedToken, authData)
    });
  }
}

function* logInFlow() {
  console.log('logInFlow')
  while (true) {
    yield
  }
}

function* logOutFlow() {
  console.log('logOutFlow')
  while (true) {
    console.log('logOutFlow loop')
    yield take(AuthReducer.constants.LOG_OUT_REQUEST);
    yield put({type: SET_AUTH, newAuthState: false});
    yield call(logOut);
  }
}

const init = function* () {
  console.log('init')

  yield fork(authenticationFlow);
  yield fork(logOutFlow);
};

const initSaga = function* () {
  console.log('initSaga')

  yield takeLatest(status.start, init);
};

export default [
  initSaga
];
