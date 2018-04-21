/**
 * Gets the repositories of the user from Github
 *
 * @format
 */

import _ from 'lodash';
import { path, find, flow, replace } from 'lodash/fp';
import { request, requestXML } from 'utils/request';
import { randomColor } from 'randomcolor';
import { repoLoadingError } from 'containers/App/actions';
import {
  call,
  put,
  select,
  takeLatest,
  all,
  takeEvery,
} from 'redux-saga/effects';
import { LOAD_REPOS } from 'containers/App/constants';
import { SELECT_PACKAGE, FILTER_PACKAGE_INFO } from './constants';
import {
  getAutocompletePackage,
  getPackageInfo,
  addPackage,
  getReadme,
} from './action';

import {
  makeSelectPackageInput,
  makeSelectCompareList,
  makeSelectCompareMode,
  getcurrentPackageInfo,
  packageViewer,
  makeSelectPackageList,
} from './selectors';

const getDate = (durationTime = 12) => {
  const today = new Date();
  let dateBefore = new Date(today);
  dateBefore = new Date(
    dateBefore.setMonth(dateBefore.getMonth() - durationTime)
  );
  return {
    startDate: new Date(today.setDate(today.getDate() - 1)),
    endDate: dateBefore,
  };
};

const formatTime = dateInput =>
  _.map(
    dateInput,
    date =>
      `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`
  );

const cleanUrl = packageName => {
  const isRootPackage =
    packageName.indexOf('/') !== -1 ? packageName.indexOf('/') : false;
  const rootPackage = isRootPackage
    ? packageName.substr(0, isRootPackage)
    : packageName;
  return rootPackage.replace(/\//gi, '-').replace(/[^a-zA-Z0-9-]+/g, '');
};

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
  const requestURL =
    'http://search-npm-registry-4654ri5rsc4mybfyhytyfu225m.us-east-1.es.amazonaws.com/npm/_suggest';

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
  const packageName = action.packageName;
  const getTimeDataUrl = time =>
    `http://proxy.npmtrends.com/?url=https://api.npmjs.org/downloads/range/${
      time[1]
    }:${time[0]}/${packageName}`;

  const urlTimeData = _.flowRight(getTimeDataUrl, formatTime, getDate)();
  const urlNPMInfo = `https://api.npms.io/v2/package/${cleanUrl(packageName)}`;

  const compareMode = yield select(makeSelectCompareMode());
  const packageList = yield select(makeSelectPackageList());

  if (!packageList.find(item => item.name === packageName)) {
    const color = randomColor({ luminosity: 'dark' });
    try {
      // Call our request helper (see 'utils/request')
      // const repos = yield call(request, urlTimeData);
      const [downloadData, packageData] = yield all([
        call(request, urlTimeData),
        call(request, urlNPMInfo),
      ]);
      yield put(getPackageInfo(packageName, downloadData, packageData, color));
      const readmeURL = flow(
        path(['collected', 'metadata', 'links', 'repository']),
        replace('https://github.com', 'https://get-github-readme-v2.now.sh')
      )(packageData);

      const readMeContent = yield call(requestXML, readmeURL);
      yield put(getReadme(readMeContent));
    } catch (err) {
      yield put(repoLoadingError(err));
    }
  } else {
    const { name, color, downloadInfo, packageInfo } = packageList.find(
      item => item.name === packageName
    );
    yield put(getPackageInfo(name, downloadInfo, packageInfo, color));
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
}
