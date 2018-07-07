import { all, fork } from 'redux-saga/effects';
import ImageCacheSagas from './ImageCache';

const root = function* () {
  yield all(ImageCacheSagas.map((item) => fork(item)));
};

export default root;
