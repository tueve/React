/*
 * TodoReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS, get, set, update, Map,  merge } from 'immutable';
import Utils from '../../utils/utils';

import {
  ADD_TODO,
  DELETE_TODO,
  HANDLE_TODO,
  FILTER_TODO,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  todoList: [{
    id         : Utils.getRandomId(),
    name       : 'React',
    description: 'react app',
    status     : 'done',
  }, {
    id         : Utils.getRandomId(),
    name       : 'Redux',
    description: 'Using redux',
    status     : 'doing',
  }, {
    id         : Utils.getRandomId(),
    name       : 'React Native',
    description: 'Using react Native',
    status     : 'todo',
  }],
  filter: 'All',
});

const newStatus = (status) => {
  switch (status) {
    case 'todo':
      return 'doing';
    case 'doing':
      return 'done';
    default:
      return 'todo';
  }
};

function todoReducer(state = initialState, action) {
  const todoList = state.get('todoList');
  const getIndex = (list, id=0) => list.findIndex((todo) => todo.get('id') === id);
  const hasTodo  = (list, id) => list.some((item) => item.get('id') === action.id);
  switch (action.type) {
    case DELETE_TODO:
      return state
        .set('todoList',
          todoList
            .filter((item) => item.get('id') !== action.id));
    case ADD_TODO:
      return state
        .set('todoList',
          todoList.update(!action.id ? todoList.size : getIndex(todoList, action.id),
            (todo = Map({})) => todo.merge({
              id: action.id || Utils.getRandomId(),
              name: action.name,
              description: action.description,
              status: action.id ? todo.get('status') : 'todo',
            })));
    case HANDLE_TODO:
      return state
        .set('todoList',
          todoList.setIn(
            [
              todoList.findIndex((todo) => todo.get('id') === action.id),
              'status',
            ],
            newStatus(action.status)));
    case FILTER_TODO:
      return state
        .set('filter', action.filter);
    default:
      return state;
  }
}

export default todoReducer;
