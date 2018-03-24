/**
 * Gets the repositories of the user from Github
 */
import _ from 'lodash';
import request from 'utils/request';
import { randomColor } from 'randomcolor';
import { repoLoadingError } from 'containers/App/actions';
import { call, put, select, takeLatest, all, takeEvery } from 'redux-saga/effects';
import { LOAD_REPOS } from 'containers/App/constants';
import { SELECT_PACKAGE, FILTER_PACKAGE_INFO } from './constants';
import { getAutocompletePackage, getPackageInfo, updateComparelistInfo } from './action';

import { makeSelectPackageInput, makeSelectPackageInfo, makeSelectCompareList } from './selectors';

const getDate = (durationTime) => {
  const today = new Date();
  let dateBefore = new Date(today);
  dateBefore = new Date(dateBefore.setMonth(dateBefore.getMonth() - durationTime));
  return { startDate: today, endDate: dateBefore };
};

const formatTime = (dateInput) =>
    _.map(dateInput, (date) =>
      `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`);

const cleanUrl = (packageName) => packageName.replace(/\//ig, '-').replace(/[^a-zA-Z0-9-]+/g, '');

/**
 * Autocomplete NPM package request/response handler
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
 * NPM download data repos request/response handler
 */

function* getNPMDownloadData(action) {
  const { filter: duration, name = '' } = yield select(makeSelectPackageInfo());
  const packageName = action.packageName || name;
  const getTimeDataUrl = (time) =>
    `http://proxy.npmtrends.com/?url=https://api.npmjs.org/downloads/range/${time[1]}:${time[0]}/${cleanUrl(packageName)}`;

  const urlTimeData = _.flowRight(getTimeDataUrl, formatTime, getDate)(duration);
  const urlNPMInfo = `https://api.npms.io/v2/package/${cleanUrl(packageName)}`;
  try {
    // Call our request helper (see 'utils/request')
    // const repos = yield call(request, urlTimeData);
    const [downloadData, packageData] = yield all([
      call(request, urlTimeData),
      call(request, urlNPMInfo),
    ]);
    const color = randomColor({ luminosity: 'dark' });
    yield put(getPackageInfo(packageName, downloadData, packageData, color));
    const compareList = yield select(makeSelectCompareList());
    if (compareList.find((item) => item.name === packageName)) {
      yield put(updateComparelistInfo(packageName, downloadData, packageData, color));
    }
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
  yield takeEvery(SELECT_PACKAGE, getNPMDownloadData);
  yield takeEvery(FILTER_PACKAGE_INFO, getNPMDownloadData);
}

