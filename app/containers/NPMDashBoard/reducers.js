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
import _ from 'lodash';
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
  TOGGLE_DETAIL_MODE
} from './constants';

// The initial state of the App
const initialState = {
  packageInput      : '',
  autoCompleteData  : {},
  compareList       : [],
  timeDuration      : 6,
  loading           : false,
  currentPackageInfo: [],
  packageSelected   : '',
  compareMode       : false,
};

function NPMDashBoardReducer(state = initialState, action) {
  switch (action.type) {
    case INPUT_PACKAGE:
      return {
        ...state,
        packageInput: action.input,
      };
    case GET_AUTOCOMPLETE_PACKAGE:
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
      const packageInCompareList = state.compareList.find((item) => item.name === action.packageItem);
      return {
        ...state,
        compareList: [
          ...state.compareList.filter((item) => item.name !== action.packageItem),
          {
            ...packageInCompareList,
            ...state.currentPackageInfo.find((item) => item.name === action.packageItem),
            color: packageInCompareList ? packageInCompareList.color : randomColor({ luminosity: 'dark' }),
            name: action.packageItem,
          },
        ],
      };
    case UPDATE_INFO_COMPARELIST:
      return {
        ...state,
        compareList: [
          ...state.compareList.filter((item) => item.name !== action.packageName),
          {
            ...state.compareList.find((item) => item.name === action.packageName),
            packageInfo: action.packageData,
            downloadInfo: action.downloadData,
          },
        ],
      };
    case REMOVE_PACKAGE:
      return {
        ...state,
        compareList: state.compareList.filter((item) => item.name !== action.packageItem),
      };
    case GET_PACKAGE_INFO:
      return {
        ...state,
        currentPackageInfo: [
          {
            color: !state.currentPackageInfo[0] ? action.color : state.currentPackageInfo[0].color,
            name: action.packageName,
            packageInfo: action.packageData,
            downloadInfo: action.downloadData,
          },
        ],
        loading: false,
      };
    case CLEAR_PACKAGE_INFO:
      return initialState;
    case FILTER_PACKAGE_INFO:
      return {
        ...state,
        timeDuration: action.filter,
      };
    case SELECT_PACKAGE:
      return {
        ...state,
        packageSelected: action.packageName,
        loading: true,
      };
    case TOGGLE_COMPARE_MODE:
      return {
        ...state,
        compareMode: true,
      };
    case TOGGLE_DETAIL_MODE:
      return {
        ...state,
        compareMode: false,
      };
    default:
      return state;
  }
}

export default NPMDashBoardReducer;
