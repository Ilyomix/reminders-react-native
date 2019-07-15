import {
  CREATE_TODO,
  UPDATE_TODO,
  DELETE_TODO,
} from '../constants/Actions';

import store from '../store/index.js';

const todos = {};

export function createTodo(todo) {
  return (dispatch) => {
    dispatch({ type: CREATE_TODO, payload: todo });
  };
}

export function updateTodo(todo) {
  return (dispatch) => {
    dispatch({ type: UPDATE_TODO, payload: todo });
  };
}

export function deleteTodo(id) {
  return (dispatch) => {
    dispatch({ type: DELETE_TODO, payload: id });
  };
}

export function getTodos() {
  return store.getState().todos;
}
