/**
 * Github Dashboard page selectors
 */

import { createSelector } from 'reselect';

const selectGitDashboard = (state) => state.get('github-dashboard');

const makeSelectCategory = () => createSelector(
  selectGitDashboard,
  (gitDashboardState) => gitDashboardState.category
);

const makeSelectSelectedCategory = () => createSelector(
  selectGitDashboard,
  (gitDashboardState) => gitDashboardState.selectedCategory
);

const makeSelectGitData = () => createSelector(
  selectGitDashboard,
  (gitDashboardState) => {console.log(gitDashboardState); return gitDashboardState.data;}
);

export {
  selectGitDashboard,
  makeSelectCategory,
  makeSelectSelectedCategory,
  makeSelectGitData,
};
