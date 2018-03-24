/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  ADD_TODO,
  DELETE_TODO,
  HANDLE_TODO,
  FILTER_TODO,
} from './constants';

/**
 * Delete todo
 *
 * @param  {id} number Number of id of todo
 *
 * @return {object}    An action object with a type of DELETE_TODO
 */

export function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    id,
  };
}

/**
 * Add todo
 *
 * @param  {id} number Number of id of todo
 * @param  {description} string Description of todo
 * @param  {name} string Name of todo
 * @param  {status} string Status of todo
 *
 * @return {object}    An action object with a type of ADD_TODO
 */

export function addTodo({ name, description, id = false, status = 'todo' }) {
  return {
    type: ADD_TODO,
    id,
    name,
    description,
    status,
  };
}

/**
 * Change status of todo
 *
 * @param  {id} number The id of todo
 * @param  {status} string The status of todo
 *
 * @return {object}    An action object with a type of HANDLE_TODO
 */

export function handleTodo(id, status) {
  return {
    type: HANDLE_TODO,
    id,
    status,
  };
}

/**
 * Filter todo
 *
 * @param  {filter} string The id of todo
 *
 * @return {object}    An action object with a type of filterTodo
 */

export function filterTodo(filter) {
  return {
    type: FILTER_TODO,
    filter,
  };
}
