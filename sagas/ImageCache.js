import { FileSystem } from 'expo';
import { put, select, takeEvery, takeLatest } from 'redux-saga/effects';
// import md5 from 'js-md5';

import * as ImageCache from '../reducers/ImageCache';
import { constants as status } from '../reducers/Status';

const folder = `${FileSystem.cacheDirectory}pollen`;

const getLoading = (state) => state.ImageCache.loading;

const fetch = function* ({ payload }) {
  const loading = yield select(getLoading);
  if (loading.includes(payload.uri)) {
    console.log('loading, payload.uri = ' + payload.uri)
    return;
  }
  const output = `${folder}/${payload.filename}`;
  const localFile = yield FileSystem.getInfoAsync(output);
  if (localFile.exists) {
    console.log('localFile.exists, localFile.uri = ' + localFile.uri + ' payload.uri = ' + payload.uri)

    yield put(ImageCache.actions.success({
      uri: payload.uri,
      local: localFile.uri,
    }));
    return;
  }
  yield put(ImageCache.actions.download(payload.uri));
  const downloaded = yield FileSystem.downloadAsync(payload.uri, output);
  yield put(ImageCache.actions.success({
    uri: payload.uri,
    local: downloaded.uri,
  }));
};

const fetchSaga = function* () {
  yield takeEvery(ImageCache.constants.fetch, fetch);
};

const init = function* () {
  const folderInfo = yield FileSystem.getInfoAsync(folder);
  if (folderInfo.exists) return;
  yield FileSystem.makeDirectoryAsync(folder);
};

const initSaga = function* () {
  yield takeLatest(status.start, init);
};

export default [
  fetchSaga,
  initSaga,
];
