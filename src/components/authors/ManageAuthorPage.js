import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { loadAuthors, saveAuthor } from '../../redux/actions/authorAction';
import { newAuthor } from '../../../tools/mockData';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import AuthorForm from './AuthorForm';
import { toast } from 'react-toastify'

function ManageAuthorPage({ authors, loadAuthors, saveAuthor, history, ...props }) {
    const [author, setAuthor] = useState({ ...props.author })
    const [errors, setErrors] = useState({})
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (authors.length === 0) {
            loadAuthors();
        }
        else {
            setAuthor({ ...props.author });
        }
    }, [props.author])

    function handleChange(event) {
        const { name, value } = event.target;
        setAuthor(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    function formValid() {
        const { name, specialization, yearsOfExpeirence } = author;
        const errors = {};

        if (!name) errors.name = "Name is required.";
        if (!specialization) errors.specialization = "Specialization is required";
        if (!yearsOfExpeirence) errors.yearsOfExpeirence = "Years of Expeirence is required";

        setErrors(errors);
        //Form is valid if errors object is empty => length === 0 
        return Object.keys(errors).length === 0;
    }

    function handleSave(event) {
        console.log('handle save...')
        event.preventDefault();

        if (!formValid()) return;

        setSaving(true)
        saveAuthor(author)
            .then(() => {
                toast.success('Author Saved.')
                history.push('/authors')
            })
            .catch(error => {
                setSaving(false);
                setErrors({ onSave: error.message })
            })
    }

    console.log(`AUTHOR : ${author}`)

    return (
        authors.length === 0 ?
            <Spinner /> :
            <AuthorForm
                author={author}
                onSave={handleSave}
                onChange={handleChange}
                saving={saving}
                errors={errors}
            />
    )
}
ManageAuthorPage.propTypes = {
    author: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    saveAuthor: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
}

function getAuthorById(authors, id) {
    return authors.filter(author => author.id === id)
}

function mapStateToProps(state, ownProps) {
    const id = ownProps.match.params.id
    const author = id && state.authors.length > 0 ? getAuthorById(state.authors, id) : newAuthor;
    return {
        author: author,
        authors: state.authors,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadAuthors: () => dispatch(loadAuthors()),
        saveAuthor: (author) => dispatch(saveAuthor(author))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage);