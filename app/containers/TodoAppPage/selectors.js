/**
 * TodoApp selectors
 */

import { createSelector } from 'reselect';
import { toJS } from 'immutable';

const selectTodo = (state) => state.get('todo');

const getVisibilityFilter = () => createSelector(
  selectTodo,
  (todoState) => todoState.get('filter')
);
const makeSelectTodo = () => createSelector(
  selectTodo,
  (todoState) => todoState.get('todoList')
);

const todoViewer = () => createSelector(
  [makeSelectTodo(), getVisibilityFilter()],
  (todoState, visibilityFilter) => {
    switch (visibilityFilter) {
      case 'TODO':
        return todoState
          .filter((todo) => todo.get('status') === 'todo')
          .toJS();
      case 'DOING':
        return todoState
          .filter((todo) => todo.get('status') === 'doing')
          .toJS();
      case 'DONE':
        return todoState
          .filter((todo) => todo.get('status') === 'done')
          .toJS();
      default:
        return todoState.toJS();
    }
  }
);

export {
  selectTodo,
  makeSelectTodo,
  todoViewer,
};
