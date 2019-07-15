import {
  applyMiddleware, createStore, combineReducers, compose,
} from 'redux';
import thunk from 'redux-thunk';
import todoListReducer from '../reducers/todoListReducer';

const rootReducer = combineReducers({
  todos: todoListReducer,
});

const store = createStore(rootReducer, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
));

export default store;
