const { Router } = require('express')
const { emailPasswordValidation, extendedValidation} = require('../validation/validationFields')
const userRouter = Router()
const UserController = require('../controllers/user/UserController')


userRouter.post('/user/login',  emailPasswordValidation, UserController.login)
userRouter.post('/user/register', extendedValidation, UserController.register)
userRouter.post('/user/logout', UserController.logout)

module.exports = userRouter