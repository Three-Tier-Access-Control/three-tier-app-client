import { createStore } from 'redux';
import { persistStore } from 'redux-persist';
import reducer from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

// ==============================|| REDUX - MAIN STORE ||============================== //

const store = createStore(reducer, composeWithDevTools());
const persister = persistStore(store);

export { store, persister };
