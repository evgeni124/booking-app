const { Router } = require('express')
const tokenRouter = Router()
const TokenController = require('../controllers/token/TokenController')

tokenRouter.post('/token/refresh', TokenController.refresh)

module.exports = tokenRouter