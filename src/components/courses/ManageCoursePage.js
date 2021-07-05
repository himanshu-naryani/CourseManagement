import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { loadCourses, saveCourse } from '../../redux/actions/courseAction';
import { loadAuthors } from '../../redux/actions/authorAction';
import PropTypes from 'prop-types';
import CourseForm from './CourseForm';
import { newCourse } from '../../../tools/mockData'
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

function ManageCoursePage({ courses, authors, loadCourses, loadAuthors, saveCourse, history, ...props }) {
    const [course, setCourse] = useState({ ...props.course })
    const [errors, setErrors] = useState({})
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (courses.length === 0) {
            loadCourses()
        }
        else {
            setCourse({ ...props.course })
        }
        if (authors.length === 0) {
            loadAuthors()
        }
    }, [props.course])

    function handleChange(event) {
        const { name, value } = event.target;
        setCourse(prevState => ({
            ...prevState,
            [name]: name === 'authorId' ? parseInt(value, 10) : value
        }))
    }

    function formValid() {
        const { title, authorId, category } = course;
        const errors = {};

        if (!title) errors.title = "Title is required.";
        if (!authorId) errors.author = "Author is required";
        if (!category) errors.category = "Category is required";

        setErrors(errors);
        //Form is valid if errors object is empty => length === 0 
        return Object.keys(errors).length === 0;
    }


    function handleSave(event) {
        event.preventDefault();

        if (!formValid()) return;

        setSaving(true)
        saveCourse(course)
            .then(() => {
                toast.success('Course Saved.')
                history.push('/courses')
            })
            .catch(error => {
                setSaving(false);
                setErrors({ onSave: error.message })
            })
    }


    return (
        (courses.length === 0 || authors.length === 0) ?
            <Spinner /> :
            <CourseForm
                course={course}
                authors={authors}
                onSave={handleSave}
                onChange={handleChange}
                saving={saving}
                errors={errors}
            />
    );
}
ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    loadCourses: PropTypes.func.isRequired,
    saveCourse: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
}

export function getCourseBySlug(courses, slug) {
    return courses.find(course => course.slug === slug)
}

function mapStateToProps(state, ownProps) {
    const slug = ownProps.match.params.slug;
    const course = slug && state.courses.length > 0 ? getCourseBySlug(state.courses, slug) : newCourse;
    return {
        course,
        courses: state.courses,
        authors: state.authors
    }
}

const mapDistpatchToProps = {
    loadCourses,
    loadAuthors,
    saveCourse
}

export default connect(mapStateToProps, mapDistpatchToProps)(ManageCoursePage);
