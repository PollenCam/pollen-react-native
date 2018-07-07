import { put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { AsyncStorage } from "react-native"

import * as User from '../reducers/User';
import { constants as status } from '../reducers/Status';

import {getUser} from '../api/FetchUser';

const USER_KEY = 'user';

const getLoading = (state) => state.User.loading;

const fetch = function* ({ payload }) {
  const loading = yield select(getLoading);
  if (loading.includes(payload.uri)) { // check if this uri is already in download queue list
    return;
  }
  yield put(User.actions.download(payload.uri)); // add uri to download queue list
  try {
    const response = yield getUser(); // make api call
    yield AsyncStorage.setItem(USER_KEY, JSON.stringify(response)); // right now it always overwrites previous user. Do we only get to this point on fresh login?
    yield put(User.actions.success({
      uri: payload.uri,
      asyncStorageKey: USER_KEY,
    })); // success, remove payload.uri from download queue and send local asyncstorage key so connected components can retrieve user data
  } catch (e) {
    yield put(User.actions.error(payload.uri)); // fail, remove payload.uri from download queue
    console.log("Error: unable to retrieve user data", e);
  }
};

const fetchSaga = function* () {
  yield takeLatest(User.constants.fetch, fetch);
}

const initSaga = function* () {
  yield takeLatest(status.start, init);
}

export default [
  fetchSaga,
]
