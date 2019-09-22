const Validator = require('validator');
const isEmpty = require('./is-empty');


const validateRegisterInput = data => {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.name = !isEmpty(data.email) ? data.email : '';
    data.name = !isEmpty(data.password) ? data.password : '';
    data.name = !isEmpty(data.password2) ? data.password2 : '';

    if (!Validator.isLength(data.name, { min:2, max: 30 })) {
        errors.name = 'Name must be between 2 and 50 characters';
    }

    if(Validator.isEmpty(data.name)){
        errors.name = 'Name cannot be empty';
    }

    if(Validator.isEmpty(data.email)){
        errors.email = 'Email cannot be empty';
    }

    if(Validator.isEmail(data.email)){
        errors.email = 'Enter valid email Id';
    }

    if(Validator.isEmpty(data.password)){
        errors.password = 'Password cannot be empty';
    }

    if(Validator.isEmpty(data.passwprd2)){
        errors.password = 'Please re enter Password';
    }

    if(!Validator.equals(data.password, data.password2)){
        errors.password = 'Passwords do not Match'; 
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateRegisterInput;