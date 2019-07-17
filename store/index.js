import {
  applyMiddleware, createStore, combineReducers, compose,
} from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import todoListReducer from '../reducers/todoListReducer';
import persist from '../services/reduxPersist';

const keyPersistConfig = {
  key: 'app',
};

const rootReducer = combineReducers({
  app: persist(keyPersistConfig, todoListReducer),
});

const store = createStore(rootReducer, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
));

export const persistor = persistStore(store);

export default store;
