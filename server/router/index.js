const { Router } = require('express')
const router = Router()
const userRouter = require('./user')
const placeRouter = require('./place')
const tokenRouter = require('./token')

router
    .use(userRouter)
    .use(placeRouter)
    .use(tokenRouter)
    
module.exports = router