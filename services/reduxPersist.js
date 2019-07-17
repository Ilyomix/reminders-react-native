import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persist = (persistConfig, reducer) => persistReducer({ ...persistConfig, storage }, reducer);

export default persist;
