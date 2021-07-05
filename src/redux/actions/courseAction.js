import * as types from './actionTypes';
import * as courseApi from '../../../api/courseApi'
import { beginApiCall, apiCallError } from './apiStatusActions';

export function loadCoursesSuccess(courses) {
    return { type: types.LOAD_COURSES_SUCCESS, courses: courses }
}

export function updateCourseSuccess(course) {
    return { type: types.UPDATE_COURSE_SUCCESS, course: course }
}

export function createCourseSuccess(course) {
    return { type: types.CREATE_COURSE_SUCCESS, course: course }
}

export function deleteCourseOptimistic(course) {
    return { type: types.DELETE_COURSE_OPTIMISTIC, course: course }
}

export function loadCourses() {
    return function (dispatch) {
        dispatch(beginApiCall());
        return courseApi.getCourses()
            .then(courses => {
                console.log(courses)
                dispatch(loadCoursesSuccess(courses));
            })
            .catch(error => {
                dispatch(apiCallError(error))
                throw error
            });
    }
}

export function saveCourse(course) {
    return function (dispatch) {
        dispatch(beginApiCall());
        return courseApi
            .saveCourse(course)
            .then(savedCourse => {
                course.id
                    ? dispatch(updateCourseSuccess(savedCourse))
                    : dispatch(createCourseSuccess(savedCourse))
            })
            .catch(error => {
                dispatch(apiCallError(error))
                throw error
            });
    }
}

export function deleteCourse(course) {
    return function (dispatch) {
        //Here we are following optimistic approach i.e deleting the course even before getting response 
        //from api thinking it will be resolved only optimistically => thats why not dipsatching beginApiCall 
        //also as we are following the optimistic approach

        dispatch(deleteCourseOptimistic(course));
        return courseApi.deleteCourse(course.id)
    }
}