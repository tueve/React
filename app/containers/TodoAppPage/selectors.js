/**
 * TodoApp selectors
 */

import { createSelector } from 'reselect';

const selectTodo = (state) => state.get('todo');

const getVisibilityFilter = (state) => state.get('todo').filter;

const makeSelectTodo = () => createSelector(
  selectTodo,
  (todoState) => todoState.todoList
);

const todoViewer = () => createSelector(
  [selectTodo, getVisibilityFilter],
  (todoState, visibilityFilter) => {
    switch (visibilityFilter) {
      case 'TODO':
        return {
          ...todoState,
          todoList: todoState.todoList.filter((todo) => todo.status === 'todo'),
        };
      case 'DOING':
        return {
          ...todoState,
          todoList: todoState.todoList.filter((todo) => todo.status === 'doing'),
        };
      case 'DONE':
        return {
          ...todoState,
          todoList: todoState.todoList.filter((todo) => todo.status === 'done'),
        };
      default:
        return todoState;
    }
  }
);

export {
  selectTodo,
  makeSelectTodo,
  todoViewer,
};
