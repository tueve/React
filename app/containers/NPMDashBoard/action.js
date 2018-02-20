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
  GET_PACKAGE,
  INPUT_PACKAGE,
  GET_AUTO_COMPLETE_PACKAGE,
  REMOVE_AUTOCOMPLETE_PACKAGE,
  ADD_PACKAGE,
  REMOVE_PACKAGE,
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
    type: GET_AUTO_COMPLETE_PACKAGE,
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

