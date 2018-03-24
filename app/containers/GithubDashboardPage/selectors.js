/**
 * Github Dashboard page selectors
 */

import { createSelector } from 'reselect';

const selectGitDashboard = (state) => state.get('github-dashboard');

const makeSelectCategory = () => createSelector(
  selectGitDashboard,
  (gitDashboardState) => gitDashboardState.get('category')
);

const makeSelectSelectedCategory = () => createSelector(
  selectGitDashboard,
  (gitDashboardState) => gitDashboardState.get('selectedCategory')
);

const makeSelectGitData = () => createSelector(
  selectGitDashboard,
  (gitDashboardState) => gitDashboardState.get('data')
);

export {
  selectGitDashboard,
  makeSelectCategory,
  makeSelectSelectedCategory,
  makeSelectGitData,
};
