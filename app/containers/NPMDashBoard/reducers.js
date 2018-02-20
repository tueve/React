/*
 * Github Dashboard  Reducer
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
import _ from 'lodash';

import {
  INPUT_PACKAGE,
  GET_PACKAGE,
  GET_AUTO_COMPLETE_PACKAGE,
  REMOVE_AUTOCOMPLETE_PACKAGE,
  ADD_PACKAGE,
  REMOVE_PACKAGE,
} from './constants';

// The initial state of the App
const initialState = {
  packageInput: '',
  autoCompleteData: {},
  compareList: [],
};

function NPMDashBoardReducer(state = initialState, action) {
  switch (action.type) {
    case INPUT_PACKAGE:
      return {
        ...state,
        packageInput: action.input,
      };
    case GET_AUTO_COMPLETE_PACKAGE:
      return {
        ...state,
        autoCompleteData: _.get(action.datas, ['autocomplete_suggest', '0', 'options']),
      };
    case REMOVE_AUTOCOMPLETE_PACKAGE:
      return {
        ...state,
        autoCompleteData: [],
      };
    case ADD_PACKAGE:
      return {
        ...state,
        compareList: state.compareList.some((item) => item === action.packageItem) ? state.compareList : [...state.compareList, action.packageItem],
      };
    case REMOVE_PACKAGE:
      return {
        ...state,
        compareList: state.compareList.filter((item) => item !== action.packageItem),
      };
    default:
      return state;
  }
}

export default NPMDashBoardReducer;
