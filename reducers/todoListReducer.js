import {
  CREATE_TODO,
  UPDATE_TODO,
  DELETE_TODO,
} from '../constants/Actions';

const initialState = {
  todos: [],
};

function todoListReducer(state = initialState, action) {
  console.log(state.todos);
  switch (action.type) {
    case CREATE_TODO:
      return ({
        todos: [
          ...state.todos,
          action.payload,
        ],
      });

    case UPDATE_TODO:
      return ({
        todos: state.todos.filter((x) => {
          if (x.id === action.payload.id) {
            const xCopy = x;
            xCopy.done = action.payload.done;
            xCopy.name = action.payload.name;
          }
          return x;
        }),
      });

    case DELETE_TODO:
      return ({
        todos: state.todos.filter(x => x.id !== action.payload)
      });
    default:
      return state;
  }
}

export default todoListReducer;
