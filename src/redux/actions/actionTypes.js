export const LOAD_COURSES_SUCCESS = "LOAD_COURSES_SUCCESS";
export const UPDATE_COURSE_SUCCESS = "UPDATE_COURSES_SUCCESS";
export const CREATE_COURSE_SUCCESS = "CREATE_COURSES_SUCCESS";

export const LOAD_AUTHORS_SUCCESS = 'LOAD_AUTHORS_SUCCESS';
export const UPDATE_AUTHOR_SUCCESS = "UPDATE_COURSES_SUCCESS";
export const CREATE_AUTHOR_SUCCESS = "CREATE_COURSES_SUCCESS";

export const BEGIN_API_CALL = "BEGIN_API_CALL"
export const API_CALL_ERROR = "API_CALL_ERROR"

//In optimistic approach we are updating UI when the delete button is clicked, wihtout waiting for API to 
//respond, and hence hiding the loading state.
//Therefore we have deliberetely removed the _SUCCESS from action type, which would decrement the 
// apiCallsInProgress, as we are not incrementing it therefore no need to decrement it 
// by adding _SUCCESS in action type
export const DELETE_COURSE_OPTIMISTIC = "DELETE_COURSE_OPTIMISTIC";
export const DELETE_AUTHOR_OPTIMISTIC = "DELETE_AUTHOR_OPTIMISTIC";