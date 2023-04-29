import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const initialState = {
    sidebarShow: 'responsive',
};

const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const changeState = (state = initialState, { type, ...rest }: any) => {
    switch (type) {
        case 'set':
            return { ...state, ...rest };
        default:
            return state;
    }
};

const createStoreWithMiddleware = composeEnhancers(applyMiddleware(thunk))(createStore);
const store = createStoreWithMiddleware(changeState);
export default store;
