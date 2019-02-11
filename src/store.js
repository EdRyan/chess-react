import {applyMiddleware, compose, createStore} from "redux";
import reducers from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const loadState = () => {
    // https://codereviewvideos.com/course/react-redux-and-redux-saga-with-symfony-3/video/saving-redux-state-to-local-storage

    try {
        const serializedState = localStorage.getItem('state');

        if (serializedState === null) {
            return undefined;
        }

        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

const saveState = state => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (err) {

    }
};

const store = createStore(reducers, loadState(), composeEnhancers(applyMiddleware()));

store.subscribe(() => {
    saveState(store.getState())
});

export default store;