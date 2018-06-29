const Validator = require('validator')
const isEmpty = require('../is-empty')

module.exports = validateLoginInput = (data) => {

    // Error object array
    let errors = {}

    // Check for empty data values
    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''

    // Email validation
    if(!Validator.isEmail(data.email)){
        errors.email = 'Email is invalid'
    }

    if(Validator.isEmpty(data.email)){
        errors.email = 'Email field is required'
    }

    // Password validation
    if(Validator.isEmpty(data.password)){
        errors.password = 'Password field is required'
    }

    // Return the errors
    return {
        errors,
        isValid: isEmpty(errors)
    }

}