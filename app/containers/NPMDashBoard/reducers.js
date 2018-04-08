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
  reduce,
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
  TOGGLE_COMPARE_MODE,
  TOGGLE_DETAIL_MODE,
} from './constants';

// The initial state of the App
const initialState = {
  packageInput: '',
  autoCompleteData: {},
  compareList: [],
  timeDuration: 6,
  loading: false,
  currentPackageInfo: [],
  packageSelected: '',
  compareMode: false,
};

function NPMDashBoardReducer(state = initialState, action) {
  const compareList = path('compareList')(state);
  switch (action.type) {
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
      const packageInCompareList = state.compareList.find(
        item => item.name === action.packageItem
      );
      return {
        ...state,
        compareList: [
          ...state.compareList.filter(item => item.name !== action.packageItem),
          {
            ...packageInCompareList,
            ...state.currentPackageInfo.find(
              item => item.name === action.packageItem
            ),
            color: packageInCompareList
              ? packageInCompareList.color
              : randomColor({ luminosity: 'dark' }),
            name: action.packageItem,
          },
        ],
      };
    case UPDATE_INFO_COMPARELIST:
      return {
        ...state,
        compareList: [
          ...state.compareList.filter(item => item.name !== action.packageName),
          {
            ...state.compareList.find(item => item.name === action.packageName),
            packageInfo: action.packageData,
            downloadInfo: action.downloadData,
          },
        ],
      };
    case REMOVE_PACKAGE:
      return assoc(
        'compareList',
        dropWhile(item => item.name !== action.packageItem)(compareList)
      )(state);
    case GET_PACKAGE_INFO:
      return reduce((result, item) => item(result), state)([
        assoc('currentPackageInfo', [
          {
            color: !state.currentPackageInfo[0]
              ? action.color
              : state.currentPackageInfo[0].color,
            name: action.packageName,
            packageInfo: action.packageData,
            downloadInfo: action.downloadData,
          },
        ]),
        assoc('loading', false),
      ]);
    case CLEAR_PACKAGE_INFO:
      return initialState;
    case FILTER_PACKAGE_INFO:
      return assoc('timeDuration', action.filter)(state);
    case SELECT_PACKAGE:
      return reduce((result, item) => item(result), state)([
        assoc('packageSelected', action.packageName),
        assoc('loading', true),
      ]);
    case TOGGLE_COMPARE_MODE:
      return assoc('compareMode', true)(state);
    case TOGGLE_DETAIL_MODE:
      return assoc('compareMode', false)(state);
    default:
      return state;
  }
}

export default NPMDashBoardReducer;
