/**
 * Github Dashboard page selectors
 *
 * @format
 */

import { createSelector } from 'reselect';
import {
  assoc,
  path,
  find,
  concat,
  unnest,
  dropWhile,
  flow,
  drop,
  pluck,
} from 'lodash/fp';
import { flatten } from 'lodash';

const selectNPMDashboard = state => state.get('npm-dashboard');
const getFilter = state => selectNPMDashboard(state).timeDuration;
const getPackageSelected = state => selectNPMDashboard(state).packageSelected;
const getcurrentPackageInfo = state => selectNPMDashboard(state).currentPackage;
const getLoadingStatus = state => selectNPMDashboard(state).loading;

const makeSelectPackageInput = () =>
  createSelector(
    selectNPMDashboard,
    npmDashboardState => npmDashboardState.packageInput
  );

const makeSelectAutoCompleteResult = () =>
  createSelector(
    selectNPMDashboard,
    npmDashboardState => npmDashboardState.autoCompleteData
  );

const makeSelectTimeDuration = () =>
  createSelector(
    selectNPMDashboard,
    npmDashboardState => npmDashboardState.timeDuration
  );

const makeSelectLoading = () =>
  createSelector(
    selectNPMDashboard,
    npmDashboardState => npmDashboardState.loading
  );

const makeSelectCompareList = () =>
  createSelector(
    selectNPMDashboard,
    npmDashboardState => npmDashboardState.compareList
  );

const makeSelectCompareListItem = () =>
  createSelector(selectNPMDashboard, npmDashboardState =>
    npmDashboardState.compareList.map(item => item.name)
  );

const packageViewer = () =>
  createSelector(
    [
      makeSelectPackageList(),
      makeSelectTimeDuration(),
      makeSelectCompareList(),
      makeSelectCurrentPackageItem(),
      getcurrentPackageInfo,
      getLoadingStatus,
    ],
    (packageList, duration, compareList, currentPackage) => {
      const getData = datas => items =>
        datas.filter(data => items.some(item => item === data.name));
      const getPackageList = getData(packageList);
      const dropItem = (durationTime, packageItem) =>
        flow(path(['downloadInfo', 'downloads']), drop(365 - durationTime))(
          packageItem
        );
      const dropDownloadInfo = packageData => durationTime => {
        return pluck(item =>
          assoc(['downloadInfo', 'downloads'], dropItem(durationTime, item))(
            item
          )
        )(getPackageList(packageData));
      };
      const dropCurrentPackageInfo = dropDownloadInfo(currentPackage);
      const dropComparePackage = dropDownloadInfo(compareList);
      switch (+duration) {
        case 1:
          return {
            currentPackageInfo: dropCurrentPackageInfo(30),
            compareList: dropComparePackage(30),
          };
        case 3:
          return {
            currentPackageInfo: dropCurrentPackageInfo(90),
            compareList: dropComparePackage(90),
          };
        case 6:
          return {
            currentPackageInfo: dropCurrentPackageInfo(180),
            compareList: dropComparePackage(180),
          };
        default:
          return {
            currentPackageInfo: dropCurrentPackageInfo(365),
            compareList: dropComparePackage(365),
          };
      }
    }
  );

const makeSelectCompareMode = () =>
  createSelector(
    selectNPMDashboard,
    npmDashboardState => npmDashboardState.compareMode
  );

const makeSelectPackageList = () =>
  createSelector(
    selectNPMDashboard,
    npmDashboardState => npmDashboardState.packageList
  );

const makeSelectCurrentPackageItem = () =>
  createSelector(
    selectNPMDashboard,
    npmDashboardState => npmDashboardState.currentPackage
  );

const makeSelectReadme = () =>
  createSelector(
    selectNPMDashboard,
    npmDashboardState => npmDashboardState.readME
  );
export {
  selectNPMDashboard,
  makeSelectPackageInput,
  makeSelectAutoCompleteResult,
  makeSelectPackageList,
  makeSelectTimeDuration,
  makeSelectCompareList,
  makeSelectLoading,
  makeSelectCompareMode,
  packageViewer,
  makeSelectCompareListItem,
  makeSelectCurrentPackageItem,
  makeSelectReadme,
};
