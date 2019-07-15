import {
  CREATE_TODO,
  UPDATE_TODO,
  DELETE_TODO,
} from '../constants/Actions';

function todoListReducer(state = {}, action) {
  switch (action.type) {
    case CREATE_TODO:
      return ({
        ...state,
        data: action.payload,
      });

    case UPDATE_TODO:
      return ({
        ...state,
        data: action.payload,
      });

    case DELETE_TODO:
      return ({
        ...state,
        err: action.payload,
      });

    default:
      return state;
  }
}

export default todoListReducer;
