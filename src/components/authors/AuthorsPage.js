import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import AuthorList from './AuthorList';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom'
import * as authorActions from '../../redux/actions/authorAction';
import * as courseActions from '../../redux/actions/courseAction';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

function AuthorsPage({ authors, actions, courses, loading }) {
    const [redirectToAddAuthorPage, setRedirectToAddAuthorPage] = useState(false);
    useEffect(() => {
        if (authors.length === 0) {
            actions.loadAuthors()
                .catch(error => {
                    alert("Loading authors failed " + error)
                })
        }
        if (courses.length === 0) {
            actions.loadCourses()
                .catch(error => {
                    alert("Loading courses failed +" + error)
                })
        }
    }, [])

    function handleDeleteAuthor(author) {
        let flag = courses.some(course => {
            return course.authorId === author.id
        })

        if (flag) {
            //Author with courses assigned to him cannot be deleted
            toast.error("Author cannot be Deleted due to courses he has been alloted!");
            return;
        }
        actions.deleteAuthor(author)
            .catch(error => {
                toast.error("Delete Failed. " + error.message, { autoClose: false })
            });
    }


    return (
        <div>
            {redirectToAddAuthorPage && <Redirect to='/author' />}
            <h2>AuthorsPage</h2>
            {loading ? <Spinner /> :
                <>
                    <button
                        style={{ marginBottom: 20 }}
                        className="btn btn-primary add-course"
                        onClick={() => setRedirectToAddAuthorPage(true)}
                    >
                        Add Author
                    </button>
                    <AuthorList onDeleteClick={handleDeleteAuthor} authors={authors} />
                </>
            }
        </div>
    )
}

AuthorsPage.propTypes = {
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
    return {
        authors: state.authors,
        courses: state.courses,
        loading: state.apiCallsInProgress > 0
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
            loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
            deleteAuthor: bindActionCreators(authorActions.deleteAuthor, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);