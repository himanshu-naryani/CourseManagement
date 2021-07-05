import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const AuthorForm = ({
    author,
    onSave,
    onChange,
    saving,
    errors = {}
}) => {

    return (
        <form onSubmit={onSave}>
            <h2>{author.id ? "Edit" : "Add"} Author</h2>
            {
                errors.onSave && (
                    <div className="alert alert-danger" role='alert'>
                        {errors.onSave}
                    </div>
                )
            }
            <TextInput
                name='name'
                label='Name'
                value={author.name}
                onChange={onChange}
                error={errors.name}
            />
            <TextInput
                name='specialization'
                label='Specialization'
                value={author.specialization}
                onChange={onChange}
                error={errors.specialization}
            />

            <SelectInput
                name='yearsOfExpeirence'
                label='Years Of Expeirence'
                value={author.yearsOfExpeirence || ""}
                defaultOption='Select'
                options={[{ value: "1", text: "1" }, { value: "2", text: "2" }, { value: "3", text: "3" }, { value: "4", text: "4" }, { Value: "5+", text: "5+" }, { value: "10+", text: "10+" }]}
                onChange={onChange}
                error={errors.yearsOfExpeirence}
            />

            <button type='submit' disabled={saving} className='btn btn-primary' >
                {saving ? "Saving..." : 'Save'}
            </button>

        </form>
    )
}

AuthorForm.propTypes = {
    author: PropTypes.object.isRequired,
    errors: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    saving: PropTypes.bool
}

export default AuthorForm;