import { combineReducers } from 'redux';
import courseReducer from './courseReducer';
import authorReducer from './authorReducer';
import apiStatusReducer from './apiStatusReducer';

const rootReducer = combineReducers({
    authors: authorReducer,
    courses: courseReducer,
    apiCallsInProgress: apiStatusReducer
});

export default rootReducer;