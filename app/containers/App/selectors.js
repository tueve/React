/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const selectRoute = (state) => state.get('route');

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const makeSelectDatas = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['datas', 'data'])
);

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);


const makeSelectUserInfo = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('userInfo')
);


export {
  selectGlobal,
  selectAuthorticate,
  makeSelectLoading,
  makeSelectError,
  makeSelectDatas,
  makeSelectLocation,
  makeSelectUserInfo,
};
