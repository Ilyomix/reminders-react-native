import {
  CREATE_TODO,
  UPDATE_TODO,
  DELETE_TODO,
} from '../constants/Actions';

function todoListReducer(state = [], action) {
  switch (action.type) {
    case CREATE_TODO:
      return ([
        ...state,
        action.payload,
      ]);

    case UPDATE_TODO:
      return (state.filter((x) => {
        if (x.id === action.payload.id) {
          const xCopy = x;
          xCopy.done = action.payload.done;
        }
        return x;
      }));

    case DELETE_TODO:
      return (state.filter(x => x.id !== action.payload));

    default:
      return state;
  }
}

export default todoListReducer;
