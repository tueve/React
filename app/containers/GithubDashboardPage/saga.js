/**
 * Gets the repositories of the user from Github
 *
 * @format
 */

import {
	call,
	put,
	select,
	takeLatest
} from 'redux-saga/effects';
import { LOAD_REPOS } from 'containers/App/constants';
import {
	reposLoaded,
	repoLoadingError
} from 'containers/App/actions';

import { request } from 'utils/request';
import { makeSelectSelectedCategory } from 'containers/GithubDashboardPage/selectors';

/**
 * Github repos request/response handler
 */
export function* getRepos() {
	// Select category from store
	const category = yield select(
		makeSelectSelectedCategory()
	);
	const mock = {
		a: 1,
		b: 2
	};
	const requestURL = `https://api.github.com/search/repositories?q=+language:${category ===
	'All'
		? ''
		: category}&sort=stars&order=desc&page=1&per_page=30`;
	try {
		// Call our request helper (see 'utils/request')
		const repos = yield call(request, requestURL);
		console.log(repos, 'inside github safa');
		yield put(reposLoaded(repos));
	} catch (err) {
		yield put(repoLoadingError(err));
	}
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
	// Watches for LOAD_REPOS actions and calls getRepos when one comes in.
	// By using `takeLatest` only the result of the latest API call is applied.
	// It returns task descriptor (just like fork) so we can continue execution
	// It will be cancelled automatically on component unmount
	yield takeLatest(LOAD_REPOS, getRepos);
}
