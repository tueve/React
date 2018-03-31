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

import {
  CHANGE_CATEGORY,
  LOAD_REPOS_SUCCESS,
} from './constants';

// The initial state of the App
const initialState = {
  category        : ['All', 'Javascript', 'Php', 'Python', 'Java', 'C#'],
  selectedCategory: 'All',
  data            : {},
};

function githubDashBoardReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_CATEGORY:
      return {
        ...state,
        selectedCategory: action.category,
      };
    case LOAD_REPOS_SUCCESS:
      return {
        ...state,
        data: { ...action.datas },
      };
    default:
      return state;
  }
}

export default githubDashBoardReducer;
