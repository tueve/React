/*
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
  TOGGLE_COMPARE_MODE,
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {input} string Input name
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
 * Changes the input field of the form
 *
 * @param  {datas} object The data from API when get auto complete data
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
 * Remove autocomplete data
 *
 * @return {object}    An action object with a type of REMOVE_AUTOCOMPLETE_PACKAGE
 */

export function removeAutocompletePackage() {
  return {
    type: REMOVE_AUTOCOMPLETE_PACKAGE,
  };
}


/**
 * Add package to compare list
 *
 * @param  {packageItem} object Name of package that add to compare list
 *
 * @return {object}    An action object with a type of ADD_PACKAGE
 */

export function addPackage(packageItem) {
  return {
    type: ADD_PACKAGE,
    packageItem,
  };
}

/**
 * Remove package from compare list
 *
 * @param  {packageItem} string Name of package that remove from compare list
 *
 * @return {object}    An action object with a type of REMOVE_PACKAGE
 */

export function removePackage(packageItem) {
  return {
    type: REMOVE_PACKAGE,
    packageItem,
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
 * Get data of package from API
 *
 * @param  {packageName} string Name of package that need to be get data
 * @param  {packageData} object data of package get from API
 * @param  {color} strong color for this package
 * @param  {downloadData} strong downloading data from npm
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
 * Filter data
 *
 * @param  {filter} string Name of filter
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
 * @param  {packageName} string Name of package that need to get data information
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
 * Update comparelist information
 *
 * @param {packageName} string Name of package that add to compare list
 * @param {packageData} object data of package
 * @param {color} string color of package
 * @return {object} An action object with a type of UPDATE_INFO_COMPARELIST
 */

export function updateComparelistInfo(packageName, downloadData, packageData, color) {
  return {
    type: UPDATE_INFO_COMPARELIST,
    packageName,
    downloadData,
    packageData,
    color,
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
