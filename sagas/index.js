import { all, fork } from 'redux-saga/effects';
import ImageCacheSagas from './ImageCache';
import UserSagas from './User'

const root = function* () {
  yield all(ImageCacheSagas.map((item) => fork(item)));
  yield all(UserSagas.map((item) => fork(item)));
  // this is where i start User saga?
};

export default root;
