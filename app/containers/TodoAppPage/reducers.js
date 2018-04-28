/**
 * /*
 * TodoReducer
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

import {
  filter,
  get,
  assoc,
  find,
  conforms,
  pluck,
  concat,
} from 'lodash/fp';
import Utils from '../../utils/utils';

import { ADD_TODO, DELETE_TODO, HANDLE_TODO, FILTER_TODO } from './constants';

// The initial state of the App
const initialState = {
  todoList: [
    {
      id: Utils.getRandomId(),
      name: 'React',
      description: 'react app',
      status: 'done',
    },
    {
      id: Utils.getRandomId(),
      name: 'Redux',
      description: 'Using redux',
      status: 'doing',
    },
    {
      id: Utils.getRandomId(),
      name: 'React Native',
      description: 'Using react Native',
      status: 'todo',
    },
  ],
  filter: 'All',
};

const newStatus = status => {
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
  const todoList = get('todoList')(state);
  const updateItem = ({ type, ...payload }) => item =>
    item.id === payload.id ? { ...item, ...payload } : item;

  switch (action.type) {
    case DELETE_TODO:
      return assoc(
        'todoList',
        filter(conforms({ id: item => item !== action.id }))(todoList)
      )(state);
    case ADD_TODO:
      return find(item => item.id === action.id)(todoList)
        ? assoc('todoList', pluck(updateItem(action))(todoList))(state)
        : assoc(
            'todoList',
            concat({
              name: action.name,
              description: action.description,
              id: Utils.getRandomId(),
              status: 'todo',
            })(todoList)
          )(state);
    case HANDLE_TODO:
      return assoc(
        'todoList',
        pluck(updateItem({ ...action, status: newStatus(action.status) }))(
          todoList
        )
      )(state);
    case FILTER_TODO:
      return assoc('filter', action.filter)(state);
    default:
      return state;
  }
}

export default todoReducer;
