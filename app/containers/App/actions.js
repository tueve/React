/*
 * App Actions
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
  LOAD_REPOS,
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS_ERROR,
  LOGIN,
  LOGOUT,
} from './constants';

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function loadRepos() {
  return {
    type: LOAD_REPOS,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {datas} array The repository data
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the datas
 */
export function reposLoaded(datas) {
  return {
    type: LOAD_REPOS_SUCCESS,
    datas,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {error} object The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error,
  };
}

/**
 * Dispatched when login
 *
 * @param  {userInfo} object Info of user after login
 *
 * @return {object}       An action object with a type of LOGIN
 */
export function login(userInfo) {
  return {
    type: LOGIN,
    userInfo,
  };
}


/**
 * Dispatched when logout
 *
 * @return {object}   An action object with a type of LOGOUT passing the error
 */
export function logout() {
  return {
    type: LOGOUT,
  };
}
