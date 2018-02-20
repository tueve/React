/**
 * Gets the repositories of the user from Github
 */
import _ from 'lodash';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_REPOS } from 'containers/App/constants';
import { repoLoadingError } from 'containers/App/actions';
import { getAutocompletePackage } from './action';

import request from 'utils/request';
import { makeSelectPackageInput } from './selectors';

/**
 * Github repos request/response handler
 */
export function* getRepos() {
  // Select username from store
  const packageData = yield select(makeSelectPackageInput());

  const data = {
    autocomplete_suggest: {
      text: `${packageData}`,
      completion: {
        field: 'suggest',
      },
    },
  };
  const requestURL = 'http://search-npm-registry-4654ri5rsc4mybfyhytyfu225m.us-east-1.es.amazonaws.com/npm/_suggest';

  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    yield put(getAutocompletePackage(repos));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* npmData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_REPOS, getRepos);
}
