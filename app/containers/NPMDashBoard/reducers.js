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
import  _                      from 'lodash'           ;
import {fromJS     , set, get} from 'immutable'        ;
import {randomColor}           from 'randomcolor'      ;
import {colors     }           from '../../utils/utils';

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
} from './constants';

// The initial state of the App
const initialState = fromJS({
  packageInput: '',
  autoCompleteData: {},
  compareList: [],
  timeDuration: 6,
  loading: false,
  currentPackageInfo: [],
  packageSelected: '',
  compareMode: false,
});

function NPMDashBoardReducer(state = initialState, action) {
  const compareList = state.get('compareList');
  switch (action.type) {
    case INPUT_PACKAGE:
      return state
            .set('packageInput', action.input);
    case GET_AUTOCOMPLETE_PACKAGE:
      return state
            .set('autoCompleteData', _.get(action.datas, ['autocomplete_suggest', '0', 'options']))
    case REMOVE_AUTOCOMPLETE_PACKAGE:
      return state
            .set('autoCompleteData', []);
    case ADD_PACKAGE:
      console.log(compareList.findIndex(item => item.name !== action.packageItem));
      console.log(state
                .update('compareList',
                compareList.findIndex(item => item.name !== action.packageItem)
            ));
      return state;
      //       .update('compareList',
      //       compareList.findIndex(item)
      //     )
      // {
      //   ...state,
      //   compareList: [
      //     ...state.compareList.filter((item) => item.name !== action.packageItem),
      //     {
      //       ...state.compareList.find((item) => item.name === action.packageItem),
      //       ...state.currentPackageInfo.find((item) => item.name === action.packageItem),
      //       name: action.packageItem,
      //     },
      //   ],
      // };
    case UPDATE_INFO_COMPARELIST:
      return {
        ...state,
        compareList: [
          ...state.compareList.filter((item) => item.name !== action.packageName),
          {
            ...state.compareList.find((item) => item.name === action.packageName),
            color: action.color,
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
      return state
            .set('currentPackageInfo', [
              {
                color: action.color,
                name: action.packageName,
                packageInfo: action.packageData,
                downloadInfo: action.downloadData,
              },
            ])
            .set('loading', false);
    case CLEAR_PACKAGE_INFO:
      return state
            .set('compareList', [])
            .set('loading', false);
    case FILTER_PACKAGE_INFO:
      return state
            .set('timeDuration', action.filter);
    case SELECT_PACKAGE:
      return  state
            .set('packageSelected', action.packageName)
            .set('loading', true);
    case TOGGLE_COMPARE_MODE:
      return state
            .set('compareMode', true);
    default:
      return state;
  }
}

export default NPMDashBoardReducer;
