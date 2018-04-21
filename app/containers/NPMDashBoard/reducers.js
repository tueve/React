/**
 * /*
 * Github Dashboard  Reducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 *
 * @format
 */

import _ from 'lodash';
import {
  assoc,
  path,
  find,
  concat,
  unnest,
  dropWhile,
  flow,
  pluck,
  indexOf,
} from 'lodash/fp';
import { randomColor } from 'randomcolor';
import { colors } from '../../utils/utils';

import {
  INPUT_PACKAGE,
  GET_AUTOCOMPLETE_PACKAGE,
  REMOVE_AUTOCOMPLETE_PACKAGE,
  ADD_PACKAGE,
  REMOVE_PACKAGE,
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

// The initial state of the App
const initialState = {
  packageInput: '',
  autoCompleteData: {},
  compareList: [],
  timeDuration: 6,
  loading: false,
  currentPackage: [],
  packageSelected: '',
  compareMode: false,
  packageList: [],
  readME: '',
};

function NPMDashBoardReducer(state = initialState, action) {
  const compareList = path('compareList')(state);
  const packageList = path('packageList')(state);
  switch (action.type) {
    case SET_CURRENT_PACKAGE:
      return assoc('currentPackage', [action.packageName])(state);
    case INPUT_PACKAGE:
      return assoc('packageInput', action.input)(state);
    case GET_AUTOCOMPLETE_PACKAGE:
      return assoc(
        'autoCompleteData',
        path(['autocomplete_suggest', '0', 'options'])(action.datas)
      )(state);
    case REMOVE_AUTOCOMPLETE_PACKAGE:
      return assoc('autoCompleteData', initialState.autoCompleteData)(state);
    case ADD_PACKAGE:
      return assoc('compareList', [
        ...compareList.filter(item => item.name !== action.packageName),
        action.packageName,
      ])(state);
    case REMOVE_PACKAGE:
      return assoc(
        'compareList',
        dropWhile(item => item.name !== action.packageName)(compareList)
      )(state);
    case GET_PACKAGE_INFO:
      // debugger;
      const checkColor = flow(
        path('packageList'),
        pluck('color'),
        indexOf(action.packageName)
      )(state);
      return flow(
        assoc('packageList', [
          ...packageList.filter(item => item.name !== action.packageName),
          {
            color:
              checkColor === -1
                ? action.color
                : randomColor({ luminosity: 'dark' }),
            name: action.packageName,
            packageInfo: action.packageData,
            downloadInfo: action.downloadData,
          },
        ]),
        assoc('loading', false)
      )(state);
    case CLEAR_PACKAGE_INFO:
      return initialState;
    case FILTER_PACKAGE_INFO:
      return assoc('timeDuration', action.filter)(state);
    case SELECT_PACKAGE:
      return flow(
        assoc('packageSelected', action.packageName),
        assoc('loading', true)
      )(state);
    case TOGGLE_COMPARE_MODE:
      return assoc('compareMode', true)(state);
    case TOGGLE_DETAIL_MODE:
      return assoc('compareMode', false)(state);
    case GET_README:
      return assoc('readME', action.content)(state);
    default:
      return state;
  }
}

export default NPMDashBoardReducer;
