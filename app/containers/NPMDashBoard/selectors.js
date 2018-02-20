/**
 * Github Dashboard page selectors
 */

import { createSelector } from 'reselect';

const selectNPMDashboard = (state) => state.get('npm-dashboard');

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
)

export {
  selectNPMDashboard,
  makeSelectPackageInput,
  makeSelectAutoCompleteResult,
  makeSelectPackageList,
};
