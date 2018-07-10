import * as AuthReducer from '../reducers/AuthReducer';
import { put, call, take, takeLatest, fork } from 'redux-saga/effects';

function* authorize(storedToken, authData) {
  if (storedToken) {
    yield put({type: AuthReducer.constants.SET_AUTH, newAuthState: true});
    return storedToken;
  }
  yield put({type: AuthReducer.constants.SENDING_REQUEST, currentlySending: true});
  try {
    let token;
    if (authData.isRegistering) {
      token = yield call(auth.register, authData.username, authData.password);
    } else {
      token = yield call(auth.logIn, authData.username, authData.password);
    }
    yield call(auth.storeToken, token);
    yield put({type: AuthReducer.constants.SET_AUTH, newAuthState: true});
    return token;
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

  while (true) {
    let authData;

    if (!storedToken) {
      const winner = yield race({
          login: take(AuthReducer.constants.LOG_IN_REQUEST),
          register: take(AuthReducer.constants.REGISTER_REQUEST)
      });
      const {username, password} = winner.credentials;
      authData = {
        username: username,
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

function* logOutFlow() {
  while (true) {
    yield take(AuthReducer.constants.LOG_OUT_REQUEST);
    yield put({type: SET_AUTH, newAuthState: false});
    yield call(logOut);
  }
}

const init = function* () {
  yield fork(authenticationFlow);
  yield fork(logOutFlow);
};

const initSaga = function* () {
};

export default [
  initSaga
];
