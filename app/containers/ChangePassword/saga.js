import { all, call, put, takeLatest } from 'redux-saga/effects';
import { changePassword, getErrorDetail } from './api';
import { changePasswordError } from './actions';
import { CHANGE_PASSWORD } from './constants';

export function* changePasswordSaga({ oldPassword, newPassword, handleSubmitting, handleCloseDrawer }) {
  try {
    yield call(changePassword, oldPassword, newPassword);
    yield call(handleSubmitting);
    yield call(handleCloseDrawer);
  } catch (error) {
    yield call(handleSubmitting);
    yield put(changePasswordError(getErrorDetail(error)));
  }
}

export function* watchChangePasswordSaga() {
  yield takeLatest(CHANGE_PASSWORD, changePasswordSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchChangePasswordSaga(),
  ]);
}
