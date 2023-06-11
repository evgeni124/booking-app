const { check } = require('express-validator')

const emailPasswordValidation = [
    check('email').notEmpty().withMessage('Empty email field').isString().isEmail().withMessage('Incorrect email.'),
    check('password').notEmpty().withMessage('Empty password field').isLength({ min: 4, max: 16 }).withMessage('Pasword must contain 4-16 characters long.'),
]

const extendedValidation = [
    check('name').notEmpty().withMessage('Empty name field').isString().withMessage('Incorrect name'),
    check('surname').notEmpty().withMessage('Empty surname field').isString().withMessage('Incorrect surname'),
    ...emailPasswordValidation
]

module.exports = {
    emailPasswordValidation,
    extendedValidation
}