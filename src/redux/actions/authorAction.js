import * as types from './actionTypes';
import * as authorApi from '../../../api/authorApi'
import { beginApiCall, apiCallError } from './apiStatusActions';

export function loadAuthorsSuccess(authors) {
    return { type: types.LOAD_AUTHORS_SUCCESS, authors: authors }
}

export function updateAuthorSuccess(author) {
    return { type: types.UPDATE_AUTHOR_SUCCESS, author: author }
}

export function createAuthorSuccess(author) {
    return { type: types.CREATE_AUTHOR_SUCCESS, author: author }
}

export function deleteAuthorOptimistic(author) {
    return { type: types.DELETE_AUTHOR_OPTIMISTIC, author: author }
}

export function loadAuthors() {
    return function (dispatch) {
        dispatch(beginApiCall());
        return authorApi.getAuthors()
            .then(authors => {
                console.log(authors);
                dispatch(loadAuthorsSuccess(authors))
            })
            .catch(error => {
                dispatch(apiCallError(error));
                throw error
            })
    }
}

export function saveAuthor(author) {
    return function (dispatch) {
        dispatch(beginApiCall());
        return authorApi
            .saveAuthor(author)
            .then(savedAuthor => {
                author.id
                    ? dispatch(updateAuthorSuccess(savedAuthor))
                    : dispatch(createAuthorSuccess(savedAuthor))
            })
            .catch(error => {
                dispatch(apiCallError(error))
                throw error
            });
    }
}

export function deleteAuthor(author) {
    return function (dispatch) {
        //Here we are following optimistic approach i.e deleting the course even before getting response 
        //from api thinking it will be resolved only optimistically => thats why not dipsatching beginApiCall 
        //also as we are following the optimistic approach

        dispatch(deleteAuthorOptimistic(author));
        return authorApi.deleteAuthor(author.id)
    }
}