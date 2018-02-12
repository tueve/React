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
import { fromJS, get, set } from 'immutable';
import Utils from '../../utils/utils';

import {
  ADD_TODO,
  DELETE_TODO,
  HANDLE_TODO,
  FILTER_TODO,
} from './constants';

// The initial state of the App
const initialState = {
  todoList: [{
    id: Utils.getRandomId(),
    name: 'React',
    description: 'react app',
    status: 'done',
  }, {
    id: Utils.getRandomId(),
    name: 'Redux',
    description: 'Using redux',
    status: 'doing',
  }, {
    id: Utils.getRandomId(),
    name: 'React Native',
    description: 'Using react Native',
    status: 'todo',
  }],
  filter: 'All',
};

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
  switch (action.type) {
    case DELETE_TODO:
      return { ...state, todoList: state.todoList.filter((item) => item.id !== action.id) };
    case ADD_TODO:
      return state.todoList.some((item) => item.id === action.id) ?
      {
        ...state,
        todoList: [...state.todoList.filter((item) => item.id !== action.id),
          { ...state.todoList.find((item) => item.id === action.id),
            name: action.name,
            description: action.description,
            status: action.status,
          },
        ],
      } :
      {
        ...state,
        todoList: [...state.todoList, {
          name: action.name,
          description: action.description,
          id: Utils.getRandomId(),
          status: 'todo',
        }],
      };
    case HANDLE_TODO:
      return {
        ...state,
        todoList: [...state.todoList.filter((item) => item.id !== action.id), {
          ...state.todoList.find((item) => item.id === action.id),
          status: newStatus(action.status),
        }],
      };
    case FILTER_TODO:
      return {
        ...state,
        filter: action.filter,
      };
    default:
      return state;
  }
}

export default todoReducer;
