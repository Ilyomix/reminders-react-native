import {
  CREATE_TODO,
  UPDATE_TODO,
  DELETE_TODO,
} from '../constants/Actions';

const todos = {};

export function createTodo(todo) {
  return (dispatch) => {
    dispatch({ type: CREATE_TODO, payload: todos });
  };
}

export function updateTodo(id, name) {
  return (dispatch) => {
    dispatch({ type: UPDATE_TODO, payload: tods });
  };
}

export function deleteTodo(id) {
  return (dispatch) => {
    dispatch({ type: DELETE_TODO, payload: todos });
  };
}

export function getTodos() {
  return todos;
}
