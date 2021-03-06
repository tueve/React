/**
 * /*
 * Github Dashboard Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 *
 * @format
 */

import {
  INPUT_PACKAGE,
  GET_AUTOCOMPLETE_PACKAGE,
  REMOVE_AUTOCOMPLETE_PACKAGE,
  ADD_PACKAGE,
  REMOVE_PACKAGE,
  GET_PACKAGE_DOWNLOAD_INFO,
  GET_PACKAGE_INFO,
  CLEAR_PACKAGE_INFO,
  FILTER_PACKAGE_INFO,
  SELECT_PACKAGE,
  UPDATE_INFO_COMPARELIST,
  SET_CURRENT_PACKAGE,
  TOGGLE_COMPARE_MODE,
  TOGGLE_DETAIL_MODE,
  GET_README,
} from './constants';

/**
 * Get input package
 *
 * @param  {input} string The new text of the input field
 *
 * @return {object}    An action object with a type of INPUT_PACKAGE
 */
export function getInputPackage(input) {
  return {
    type: INPUT_PACKAGE,
    input,
  };
}

/**
 * Get autocomplete data from API
 *
 * @param  {datas} object Data autocomplete from API
 *
 * @return {object}    An action object with a type of GET_AUTOCOMPLETE_PACKAGE
 */

export function getAutocompletePackage(datas) {
  return {
    type: GET_AUTOCOMPLETE_PACKAGE,
    datas,
  };
}

/**
 * Clear autocomplete data
 *
 * @return {object}    An action object with a type of REMOVE_AUTOCOMPLETE_PACKAGE
 */

export function removeAutocompletePackage() {
  return {
    type: REMOVE_AUTOCOMPLETE_PACKAGE,
  };
}

/**
 * Add package to comparelist
 *
 * @param  {packageName} string Name of package that add to compare list
 *
 * @return {object}    An action object with a type of ADD_PACKAGE
 */

export function addPackage(packageName) {
  return {
    type: ADD_PACKAGE,
    packageName,
  };
}

/**
 * Remove package from comparelist
 *
 * @param  {packageItem} string Name of package that from from compare list
 *
 * @return {object}    An action object with a type of REMOVE_PACKAGE
 */

export function removePackage(packageName) {
  return {
    type: REMOVE_PACKAGE,
    packageName,
  };
}

/**
 * Get package infor data from API
 *
 * @param  {packageName} string Name of package
 * @param  {data} object data of package return from API
 *
 * @return {object}    An action object with a type of GET_PACKAGE_DOWNLOAD_INFO
 */

export function getPackageDownloadInfo(packageName, data) {
  return {
    type: GET_PACKAGE_DOWNLOAD_INFO,
    data,
    packageName,
  };
}

/**
 * Clear package info
 *
 * @return {object}    An action object with a type of CLEAR_PACKAGE_INFO
 */

export function clearPackageInfo() {
  return {
    type: CLEAR_PACKAGE_INFO,
  };
}

/**
 * Get package info data from API
 *
 * @param  {packageName} string Name of package that add to compare list
 * @param  {packageData} object data of package get from API
 * @param  {downloadData} object downloading data of package get from API
 * @param  {color} string color of package in chart
 *
 * @return {object}    An action object with a type of GET_PACKAGE_INFO
 */

export function getPackageInfo(packageName, downloadData, packageData, color) {
  return {
    type: GET_PACKAGE_INFO,
    downloadData,
    packageName,
    packageData,
    color,
  };
}

/**
 * Change filter package
 *
 * @param  {filter} string filter data of chart
 * @param  {data} object data of package get from API
 *
 * @return {object}    An action object with a type of FILTER_PACKAGE_INFO
 */

export function filterPackageInfo(filter) {
  return {
    type: FILTER_PACKAGE_INFO,
    filter,
  };
}

/**
 * Choose the package to get detail
 *
 * @param  {packageName} string Name of package to select
 *
 * @return {object}    An action object with a type of SELECT_PACKAGE
 */

export function selectPackage(packageName) {
  return {
    type: SELECT_PACKAGE,
    packageName,
  };
}

/**
 * Toggle compare mode
 *
 * @return {object}    An action object with a type of TOGGLE_COMPARE_MODE
 */

export function toggleCompareMode() {
  return {
    type: TOGGLE_COMPARE_MODE,
  };
}

/**
 * Toggle detail mode
 *
 * @return {object}    An action object with a type of TOGGLE_DETAIL_MODE
 */

export function toggleDetailMode() {
  return {
    type: TOGGLE_DETAIL_MODE,
  };
}

/**
 * Set current package to show
 *
 * @param  {packageName} string Name of package to select *
 *
 * @return {object}    An action object with a type of TOGGLE_DETAIL_MODE
 */

export function setCurrentPackage(packageName) {
  return {
    type: SET_CURRENT_PACKAGE,
    packageName,
  };
}

/**
 * Get readme content file
 *
 * @param  {content} string README content *
 *
 * @return {object}    An action object with a type of TOGGLE_DETAIL_MODE
 */

export function getReadme(content) {
  return {
    type: GET_README,
    content,
  };
}
