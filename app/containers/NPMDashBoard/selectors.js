/**
 * Github Dashboard page selectors
 */

import { createSelector } from 'reselect';
import { flatten } from 'lodash';

const selectNPMDashboard = (state) => state.get('npm-dashboard');
const getFilter = (state) => selectNPMDashboard(state).timeDuration;
const getPackageSelected = (state) => selectNPMDashboard(state).packageSelected;
const getcurrentPackageInfo = (state) => selectNPMDashboard(state).currentPackageInfo;

const makeSelectPackageInput = () => createSelector(
  selectNPMDashboard,
  (npmDashboardState) => npmDashboardState.packageInput
);

const makeSelectAutoCompleteResult = () => createSelector(
  selectNPMDashboard,
  (npmDashboardState) => npmDashboardState.autoCompleteData
);

const makeSelectPackageList = () => createSelector(
  selectNPMDashboard,
  (npmDashboardState) => npmDashboardState.compareList
);

const makeSelectTimeDuration = () => createSelector(
  selectNPMDashboard,
  (npmDashboardState) => npmDashboardState.timeDuration,
);

const makeSelectLoading = () => createSelector(
  selectNPMDashboard,
  (npmDashboardState) => npmDashboardState.loading,
);

const makeSelectCompareList = () => createSelector(
  selectNPMDashboard,
  (npmDashboardState) => npmDashboardState.compareList,
);

const makeSelectPackageInfo = () => createSelector(
  [selectNPMDashboard, getFilter, getPackageSelected, getcurrentPackageInfo],
  (npmDashboardState, filter, packageSelected, currentPackageInfo) => {
    const [packageInfo] = flatten(currentPackageInfo);
    return {
      filter,
      ...packageInfo,
    };
  },
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
};
