/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  LOGIN,
  LOGOUT,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  userInfo: null,
  loading: false,
  error: false,
  datas: {
    data: false,
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REPOS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['datas', 'data'], false);
    case LOAD_REPOS_SUCCESS:
      return state
        .setIn(['datas', 'data'], action.datas)
        .set('loading', false);
    case LOAD_REPOS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case LOGIN:
      return state
        .set('userInfo', action.userInfo);
    case LOGOUT:
      return state
        .set('userInfo', null);
    default:
      return state;
  }
}

export default appReducer;
