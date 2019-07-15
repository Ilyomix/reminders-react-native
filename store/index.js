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
  window.devToolsExtension ? window.devToolsExtension() : f => f,
));

export default store;
