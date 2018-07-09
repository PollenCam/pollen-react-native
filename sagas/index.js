import { all, fork } from 'redux-saga/effects';
import ImageCacheSagas from './ImageCache';
import AuthSagas from './AuthSaga'

const root = function* () {
  yield all(ImageCacheSagas.map((item) => fork(item)));
  yield all(AuthSagas.map((item) => fork(item)));
  // might need to start in parallel
};

export default root;
