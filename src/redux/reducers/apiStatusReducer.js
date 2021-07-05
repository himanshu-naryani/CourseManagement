import * as types from '../actions/actionTypes';
import initialState from './initialState';

function actionTypeEndsInSuccess(type) {
    return type.substring(type.length - 8) === "_SUCCESS";
}

export default function apiStatusReducer(state = initialState.apiCallsInProgress, action) {
    if (action.type === types.BEGIN_API_CALL) {
        return state + 1;
    }
    else if (action.type === "API_CALL_ERROR" || actionTypeEndsInSuccess(action.type)) {
        return state - 1;
    }
    return state;
}


// IF action type is ending with "_SUCCESS" => API call is successful and hence APICalls in progress 
// should be reduced by 1 as current call was successful and also when API call Fails then also it should 
// decrement by 1