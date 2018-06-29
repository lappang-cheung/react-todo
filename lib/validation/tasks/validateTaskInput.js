const Validator = require('validator')
const isEmpty = require('../is-empty')

module.exports = function validateTaskInput(data){
    let errors = {}

    data.title = !isEmpty(data.title) ? data.title : ''
    data.description = !isEmpty(data.description) ? data.description : ''

    // Check for title
    if(!Validator.isLength(data.title, {min: 4, max: 150})){
        errors.title = 'Title must be between 4 and 150 characters';
    }

    if(Validator.isEmpty(data.title)){
        errors.title = 'Title field is required';
    }

    // Check for description
    if(!Validator.isLength(data.description, {min: 10, max: 500})){
        errors.description = 'Description must be between 10 and 500 characters';
    }
    
    if(Validator.isEmpty(data.description)){
        errors.description = 'Description field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}