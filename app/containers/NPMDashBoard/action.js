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
} from './constants';

/**
 * Changes the input field of the form
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
 * Changes the input field of the form
 *
 * @param  {input} string The new text of the input field
 *
 * @return {object}    An action object with a type of INPUT_PACKAGE
 */

export function getAutocompletePackage(datas) {
  return {
    type: GET_AUTOCOMPLETE_PACKAGE,
    datas,
  };
}

/**
 * Changes the input field of the form
 *
 * @param  {input} string The new text of the input field
 *
 * @return {object}    An action object with a type of INPUT_PACKAGE
 */

export function removeAutocompletePackage() {
  return {
    type: REMOVE_AUTOCOMPLETE_PACKAGE,
  };
}


/**
 * Choose the package to compare
 *
 * @param  {input} string Name of package that add to compare list
 *
 * @return {object}    An action object with a type of INPUT_PACKAGE
 */

export function addPackage(packageItem) {
  return {
    type: ADD_PACKAGE,
    packageItem,
  };
}

/**
 * Choose the package to compare
 *
 * @param  {input} string Name of package that add to compare list
 *
 * @return {object}    An action object with a type of INPUT_PACKAGE
 */

export function removePackage(packageItem) {
  return {
    type: REMOVE_PACKAGE,
    packageItem,
  };
}

/**
 * Choose the package to compare
 *
 * @param  {packageName} string Name of package that add to compare list
 * @param  {data} object data of package get from API
 *
 * @return {object}    An action object with a type of INPUT_PACKAGE
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
 *
 * @return {object}    An action object with a type of INPUT_PACKAGE
 */

export function clearPackageInfo() {
  return {
    type: CLEAR_PACKAGE_INFO,
  };
}


/**
 * Choose the package to compare
 *
 * @param  {packageName} string Name of package that add to compare list
 * @param  {data} object data of package get from API
 *
 * @return {object}    An action object with a type of INPUT_PACKAGE
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
 * Choose the package to compare
 *
 * @param  {packageName} string Name of package that add to compare list
 * @param  {data} object data of package get from API
 *
 * @return {object}    An action object with a type of INPUT_PACKAGE
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
 * @param  {packageName} string Name of package that add to compare list
 *
 * @return {object}    An action object with a type of INPUT_PACKAGE
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
 * @param  {packageName} string Name of package that add to compare list
 *
 * @return {object}    An action object with a type of INPUT_PACKAGE
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
