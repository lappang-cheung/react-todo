const Validator = require('validator')
const isEmpty = require('../is-empty')

module.exports = validateRegisterInput = (data) => {
    
    // Error object array
    let errors = {};

    // Check for empty data values
    data.name = !isEmpty(data.name) ? data.name : ''
    data.email = !isEmpty(data.email) ? data.email: ''
    data.password = !isEmpty(data.password) ? data.password: ''
    data.password2 = !isEmpty(data.password2) ? data.password2: ''

    // Name validation
    if(!Validator.isLength(data.name, { min: 2, max: 30})){
        errors.name = 'Name must be between 2 and 30 characters'
    }

    if(Validator.isEmpty(data.name)){
        errors.name = 'Name field is required'
    }

    // Email validation
    if(!Validator.isEmail(data.email)){
        errors.email = 'Email is not valid'
    }

    if(Validator.isEmpty(data.email)){
        errors.email = 'Email field is required'
    }

    // Check for password
    if(!Validator.isLength(data.password, { min: 6, max: 30})){
        errors.password = 'Password must be between 6 to 30 characters'
    }

    if(Validator.isEmpty(data.password)){
        errors.password = 'Password field is required'
    }

    // Check for confirm password
    if(!Validator.equals(data.password, data.password2)){
        errors.password2 = 'Password does not match'
    }

    if(Validator.isEmpty(data.password2)){
        errors.password2 = 'Confirm password field is required'
    }

    // Return the errors
    return {
        errors,
        isValid: isEmpty(errors)
    }
}