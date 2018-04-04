import { all, call, put, takeLatest } from 'redux-saga/effects';
import { GET_PATIENT_TO_DOS, GET_PATIENT_TO_DO_MAIN_TASK, CANCEL_TO_DO } from 'containers/PatientToDos/constants';
import {
  getPatientToDoError,
  getPatientToDoSuccess,
  getPatientToDoMainTaskError,
  getPatientToDoMainTaskSuccess, cancelToDosError, cancelToDoSuccess,
} from 'containers/PatientToDos/actions';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { showNotification } from 'containers/Notification/actions';
import { getPatientToDos, getToDoMainTask, cancelToDo } from './api';
import messages from './messages';

export function* getPatientToDosSaga(action) {
  try {
    const toDos = yield call(getPatientToDos, action.patientId, action.practitionerId, action.definition);
    yield put(getPatientToDoSuccess(toDos));
  } catch (error) {
    yield put(showNotification(<FormattedMessage {...messages.noToDoError} />));
    yield put(getPatientToDoError(error));
  }
}


export function* getToDoMainTaskSaga(action) {
  try {
    const toDoMainTask = yield call(getToDoMainTask, action.patientId, action.organizationId, action.definition, action.practitionerId);
    yield put(getPatientToDoMainTaskSuccess(toDoMainTask));
  } catch (error) {
    yield put(showNotification(<FormattedMessage {...messages.noTaskReferenceError} />));
    yield put(getPatientToDoMainTaskError(error));
  }
}

export function* cancelToDoSaga(action) {
  try {
    if (action.toDoLogicalId) {
      const toDos = yield call(cancelToDo, action.toDoLogicalId);
      yield put(showNotification(<FormattedMessage {...messages.cancelToDoSuccess} />));
      yield put(cancelToDoSuccess(toDos));
    }
  } catch (error) {
    yield put(showNotification(<FormattedMessage {...messages.cancelToDoError} />));
    yield put(cancelToDosError(error));
  }
}

export function* watchGetPatientToDosSaga() {
  yield takeLatest(GET_PATIENT_TO_DOS, getPatientToDosSaga);
}

export function* watchGetToDoMainTaskSaga() {
  yield takeLatest(GET_PATIENT_TO_DO_MAIN_TASK, getToDoMainTaskSaga);
}


export function* watchCancelToDoSaga() {
  yield takeLatest(CANCEL_TO_DO, cancelToDoSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetPatientToDosSaga(),
    watchGetToDoMainTaskSaga(),
    watchCancelToDoSaga(),
  ]);
}
