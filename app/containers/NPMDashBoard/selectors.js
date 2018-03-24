/**
 * Github Dashboard page selectors
 */

import { createSelector } from 'reselect';
import { flatten } from 'lodash';

const selectNPMDashboard = (state) => state.get('npm-dashboard');

const getFilter = () => createSelector(
  selectNPMDashboard,
  (npmDashboardState) => npmDashboardState.get('timeDuration')
);

const getPackageSelected = () => createSelector(
  selectNPMDashboard,
  (npmDashboardState) => npmDashboardState.get('packageSelected')
);

const getcurrentPackageInfo =  () => createSelector(
  selectNPMDashboard,
  (npmDashboardState) => npmDashboardState.get('currentPackageInfo')
);


const makeSelectPackageInput = () => createSelector(
  selectNPMDashboard,
  (npmDashboardState) => npmDashboardState.get('packageInput')
);

const makeSelectAutoCompleteResult = () => createSelector(
  selectNPMDashboard,
  (npmDashboardState) => npmDashboardState.get('autoCompleteData')
);

const makeSelectPackageList = () => createSelector(
  selectNPMDashboard,
  (npmDashboardState) => npmDashboardState.get('compareList').toJS()
);

const makeSelectTimeDuration = () => createSelector(
  selectNPMDashboard,
  (npmDashboardState) => npmDashboardState.get('timeDuration').toJS()
);

const makeSelectLoading = () => createSelector(
  selectNPMDashboard,
  (npmDashboardState) => npmDashboardState.get('loading')
);

const makeSelectCompareList = () => createSelector(
  selectNPMDashboard,
  (npmDashboardState) => npmDashboardState.get('compareList').toJS()
);

const makeSelectPackageInfo = () => createSelector(
  [getFilter(), getcurrentPackageInfo()],
  (filter, currentPackageInfo) => {
    const [packageInfo] = flatten(currentPackageInfo);
    return {
      filter,
      ...packageInfo,
    };
  },
);

const makeSelectCompareMode = () => createSelector(
  selectNPMDashboard,
  (npmDashboardState) => npmDashboardState.compareMode,
);

export {
  selectNPMDashboard,
  makeSelectPackageInput,
  makeSelectAutoCompleteResult,
  makeSelectPackageList,
  makeSelectTimeDuration,
  makeSelectCompareList,
  makeSelectLoading,
  makeSelectPackageInfo,
  makeSelectCompareMode,
};
